import { z } from "zod";
import { translate } from "@/i18n";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const loginSchema = z
  .object({
    email: z.string(),
    password: z.string(),
  })
  .superRefine((data, ctx) => {
    if (!data.email) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["email"], message: translate("validate.email.required") });
    } else if (!EMAIL_RE.test(data.email)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["email"], message: translate("validate.email.invalid") });
    }
    if (data.password.length < 6) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["password"], message: translate("validate.password.min6") });
    }
  });

export type LoginValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z.string(),
    username: z.string(),
    email: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.name.length < 2) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["name"], message: translate("validate.name.min") });
    } else if (data.name.length > 60) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["name"], message: translate("validate.name.max") });
    }
    if (data.username.length < 3) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["username"], message: translate("validate.username.min") });
    } else if (data.username.length > 24) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["username"], message: translate("validate.username.max") });
    } else if (!/^[a-zA-Z0-9._-]+$/.test(data.username)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["username"], message: translate("validate.username.regex") });
    }
    if (!data.email) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["email"], message: translate("validate.email.required") });
    } else if (!EMAIL_RE.test(data.email)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["email"], message: translate("validate.email.invalid") });
    }
    if (data.password.length < 8) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["password"], message: translate("validate.password.min8") });
    } else if (!/[A-ZÁÉÍÓÚÑ]/.test(data.password)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["password"], message: translate("validate.password.upper") });
    } else if (!/\d/.test(data.password)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["password"], message: translate("validate.password.number") });
    }
    if (!data.confirmPassword) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["confirmPassword"], message: translate("validate.confirm.required") });
    } else if (data.password !== data.confirmPassword) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["confirmPassword"], message: translate("validate.confirm.match") });
    }
  });

export type RegisterValues = z.infer<typeof registerSchema>;
