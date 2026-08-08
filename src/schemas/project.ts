import { z } from "zod";
import { translate } from "@/i18n";

const URL_RE = /^https?:\/\/[^\s]+$/i;

export const projectSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    longDescription: z.string().optional(),
    category: z.enum(["web", "fundamentos"]),
    technologies: z.string(),
    year: z.coerce.number(),
    video: z.string().optional(),
    repo: z.string().optional(),
    demo: z.string().optional(),
    code: z.string().optional(),
    featured: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.title.length < 3) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["title"], message: translate("validate.title.min") });
    } else if (data.title.length > 80) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["title"], message: translate("validate.title.max") });
    }
    if (data.description.length < 10) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["description"], message: translate("validate.desc.short.min") });
    } else if (data.description.length > 280) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["description"], message: translate("validate.desc.short.max") });
    }
    if (data.technologies.length < 2) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["technologies"], message: translate("validate.techs.min") });
    }
    if (!Number.isInteger(data.year) || data.year < 2000 || data.year > 2100) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["year"], message: translate("validate.year.invalid") });
    }
    if (data.video && !URL_RE.test(data.video)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["video"], message: translate("validate.video.url") });
    }
    if (data.repo && !URL_RE.test(data.repo)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["repo"], message: translate("validate.repo.url") });
    }
    if (data.demo && !URL_RE.test(data.demo)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["demo"], message: translate("validate.demo.url") });
    }
  });

export type ProjectValues = z.infer<typeof projectSchema>;
