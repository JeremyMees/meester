import { z } from 'zod'

export const contactFormSchema = z.object({
  type: z.enum([
    'new project',
    'maintenance / seo',
    'collaboration',
    'just say hi',
  ]),
  name: z.string().min(2).max(50),
  company: z.string().min(2).max(50).optional(),
  email: z.email(),
  category: z
    .array(
      z.enum([
        'web development',
        'web design',
        'seo & performance',
        'maintenance',
      ]),
    )
    .min(1),
  timeline: z.enum(['asap', '1-3 months', '3-6 months', 'just exploring']),
  description: z.string().min(10).max(1000),
  referral: z.string().max(100).optional(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
