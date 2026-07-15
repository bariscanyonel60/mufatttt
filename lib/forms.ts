import { z } from "zod";

const consentField = z
  .union([
    z.boolean(),
    z.literal("true"),
    z.literal("on"),
    z.literal("false"),
  ])
  .transform((v) => v === true || v === "true" || v === "on")
  .refine((v) => v === true, { message: "Gizlilik politikasını kabul etmelisiniz" });

export const contactSchema = z.object({
  name: z.string().min(2, "Adınızı yazın"),
  phone: z.string().min(10, "Geçerli bir telefon numarası girin"),
  email: z.string().email("Geçerli bir e-posta girin"),
  subject: z.string().min(1, "Bir konu seçin"),
  message: z.string().min(10, "Projenizden kısaca bahsedin"),
  consent: consentField,
  website: z.string().optional(),
  turnstileToken: z.string().optional(),
});

export type ContactPayload = z.infer<typeof contactSchema>;

export const careerSchema = z.object({
  name: z.string().min(2, "Adınızı yazın"),
  phone: z.string().min(10, "Geçerli bir telefon numarası girin"),
  email: z.string().email("Geçerli bir e-posta girin"),
  jobId: z.string().min(1, "Pozisyon seçin"),
  message: z.string().min(10, "Kısaca kendinizden bahsedin"),
  consent: consentField,
  cvUrl: z.string().url().optional().or(z.literal("")),
  website: z.string().optional(),
  turnstileToken: z.string().optional(),
});

export type CareerPayload = z.infer<typeof careerSchema>;
