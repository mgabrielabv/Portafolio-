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
    const name = data.name.trim();
    const email = data.email.trim();
    const subject = data.subject.trim();
    const message = data.message.trim();

    if (name.length < 2) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["name"], message: translate("validate.name.min") });
    } else if (name.length > 40) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["name"], message: translate("validate.name.max") });
    }
    if (!email) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["email"], message: translate("validate.email.required") });
    } else if (!EMAIL_RE.test(email)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["email"], message: translate("validate.email.invalid") });
    }
    if (subject.length < 3) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["subject"], message: translate("validate.subject.min") });
    } else if (subject.length > 80) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["subject"], message: translate("validate.subject.max") });
    }
    if (message.length < 10) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["message"], message: translate("validate.message.min") });
    } else if (message.length > 500) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["message"], message: translate("validate.message.max") });
    }
  });

export type ContactValues = z.infer<typeof contactSchema>;
