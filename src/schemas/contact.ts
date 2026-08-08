import { z } from "zod";
import { translate } from "@/i18n";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const contactSchema = z
  .object({
    name: z.string(),
    email: z.string(),
    subject: z.string(),
    message: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.name.length < 2) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["name"], message: translate("validate.name.min") });
    } else if (data.name.length > 60) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["name"], message: translate("validate.name.max") });
    }
    if (!data.email) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["email"], message: translate("validate.email.required") });
    } else if (!EMAIL_RE.test(data.email)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["email"], message: translate("validate.email.invalid") });
    }
    if (data.subject.length < 3) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["subject"], message: translate("validate.subject.min") });
    } else if (data.subject.length > 120) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["subject"], message: translate("validate.subject.max") });
    }
    if (data.message.length < 10) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["message"], message: translate("validate.message.min") });
    } else if (data.message.length > 2000) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["message"], message: translate("validate.message.max") });
    }
  });

export type ContactValues = z.infer<typeof contactSchema>;
