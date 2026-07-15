import { Resend } from "resend";
import { getContent } from "@/lib/admin/store";

export async function getMailConfig() {
  const to =
    process.env.CONTACT_TO_EMAIL?.trim() ||
    (await getContent()).site.email;
  const from =
    process.env.RESEND_FROM_EMAIL?.trim() || "MUFAT Web <onboarding@resend.dev>";
  return { to, from };
}

export async function sendMail(opts: {
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const key = process.env.RESEND_API_KEY?.trim();
  const { to, from } = await getMailConfig();

  if (!key) {
    if (process.env.NODE_ENV === "development") {
      console.info("[mail:dev]", { to, ...opts });
      return { ok: true };
    }
    return { ok: false, error: "E-posta servisi yapılandırılmamış." };
  }

  try {
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      subject: opts.subject,
      html: opts.html,
      replyTo: opts.replyTo,
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Gönderim başarısız";
    return { ok: false, error: msg };
  }
}
