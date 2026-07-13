import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Adınızı yazın"),
  phone: z.string().min(10, "Geçerli bir telefon numarası girin"),
  email: z.string().email("Geçerli bir e-posta girin"),
  subject: z.string().min(1, "Bir konu seçin"),
  message: z.string().min(10, "Projenizden kısaca bahsedin"),
  website: z.string().optional(), // honeypot
});

export type ContactPayload = z.infer<typeof contactSchema>;

export const careerSchema = z.object({
  name: z.string().min(2, "Adınızı yazın"),
  phone: z.string().min(10, "Geçerli bir telefon numarası girin"),
  email: z.string().email("Geçerli bir e-posta girin"),
  jobId: z.string().min(1, "Pozisyon seçin"),
  message: z.string().min(10, "Kısaca kendinizden bahsedin"),
  website: z.string().optional(),
});

export type CareerPayload = z.infer<typeof careerSchema>;
