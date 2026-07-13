import { NextResponse } from "next/server";
import { careerSchema } from "@/lib/forms";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { sendMail } from "@/lib/mail";
import { addSubmission, getContent, newId } from "@/lib/admin/store";

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (!rateLimit(`career:${ip}`)) {
    return NextResponse.json({ error: "Çok fazla istek. Bir süre sonra tekrar deneyin." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const parsed = careerSchema.safeParse(body);
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

  const job = getContent().jobs.find((j) => j.id === data.jobId);
  if (!job) {
    return NextResponse.json({ error: "Geçersiz pozisyon." }, { status: 400 });
  }

  addSubmission({
    id: newId("career"),
    type: "career",
    name: data.name,
    phone: data.phone,
    email: data.email,
    jobId: data.jobId,
    jobTitle: job.title,
    message: data.message,
    status: "new",
    createdAt: new Date().toISOString(),
  });

  const result = await sendMail({
    subject: `[Kariyer] ${job.title} — ${data.name}`,
    replyTo: data.email,
    html: `
      <h2>Yeni kariyer başvurusu</h2>
      <p><strong>Pozisyon:</strong> ${escapeHtml(job.title)}</p>
      <p><strong>Ad:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Telefon:</strong> ${escapeHtml(data.phone)}</p>
      <p><strong>E-posta:</strong> ${escapeHtml(data.email)}</p>
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
