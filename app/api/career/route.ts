import { NextResponse } from "next/server";
import { careerSchema } from "@/lib/forms";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { getMailConfig, sendMail } from "@/lib/mail";
import { addSubmission, getContent, newId } from "@/lib/admin/store";
import { verifyTurnstile } from "@/lib/turnstile";
import { uploadCloudinaryCv } from "@/lib/cloudinary";

const CV_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const CV_MAX = 5 * 1024 * 1024;

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (!rateLimit(`career:${ip}`)) {
    return NextResponse.json({ error: "Çok fazla istek. Bir süre sonra tekrar deneyin." }, { status: 429 });
  }

  let fields: Record<string, string> = {};
  let cvFile: File | null = null;

  const contentType = req.headers.get("content-type") || "";
  try {
    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      for (const [k, v] of form.entries()) {
        if (k === "cv" && v instanceof File && v.size > 0) cvFile = v;
        else if (typeof v === "string") fields[k] = v;
      }
    } else {
      fields = (await req.json()) as Record<string, string>;
    }
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const parsed = careerSchema.safeParse(fields);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Doğrulama hatası." },
      { status: 400 },
    );
  }

  const data = parsed.data;
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  if (!(await verifyTurnstile(data.turnstileToken, ip))) {
    return NextResponse.json({ error: "Güvenlik doğrulaması başarısız." }, { status: 400 });
  }

  const OTHER_JOB = { id: "other", title: "Diğer" };
  const job =
    data.jobId === OTHER_JOB.id
      ? OTHER_JOB
      : (await getContent()).jobs.find((j) => j.id === data.jobId);
  if (!job) {
    return NextResponse.json({ error: "Geçersiz pozisyon." }, { status: 400 });
  }

  let cvUrl: string | undefined;
  if (cvFile) {
    if (!CV_TYPES.has(cvFile.type)) {
      return NextResponse.json({ error: "CV yalnızca PDF veya Word olabilir." }, { status: 400 });
    }
    if (cvFile.size > CV_MAX) {
      return NextResponse.json({ error: "CV en fazla 5 MB olabilir." }, { status: 400 });
    }
    try {
      const buf = Buffer.from(await cvFile.arrayBuffer());
      const uploaded = await uploadCloudinaryCv(buf, cvFile.name);
      cvUrl = uploaded.url;
    } catch (e) {
      const msg = e instanceof Error ? e.message : "CV yüklenemedi";
      const status = msg.includes("yapılandırılmamış") ? 503 : 500;
      return NextResponse.json({ error: msg }, { status });
    }
  }

  await addSubmission({
    id: newId("career"),
    type: "career",
    name: data.name,
    phone: data.phone,
    email: data.email,
    jobId: data.jobId,
    jobTitle: job.title,
    message: data.message,
    ...(cvUrl ? { cvUrl } : {}),
    status: "new",
    createdAt: new Date().toISOString(),
  });

  const { careerTo } = await getMailConfig();
  const result = await sendMail({
    to: careerTo,
    subject: `[Kariyer] ${job.title} — ${data.name}`,
    replyTo: data.email,
    html: `
      <h2>Yeni kariyer başvurusu</h2>
      <p><strong>Pozisyon:</strong> ${escapeHtml(job.title)}</p>
      <p><strong>Ad:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Telefon:</strong> ${escapeHtml(data.phone)}</p>
      <p><strong>E-posta:</strong> ${escapeHtml(data.email)}</p>
      ${cvUrl ? `<p><strong>CV:</strong> <a href="${escapeHtml(cvUrl)}">${escapeHtml(cvUrl)}</a></p>` : ""}
      <p><strong>Mesaj:</strong></p>
      <p>${escapeHtml(data.message).replace(/\n/g, "<br/>")}</p>
    `,
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 503 });
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
