import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(3, "El título debe tener al menos 3 caracteres").max(80, "Título demasiado largo"),
  description: z
    .string()
    .min(10, "La descripción breve debe tener al menos 10 caracteres")
    .max(280, "Máximo 280 caracteres"),
  longDescription: z.string().optional(),
  category: z.enum(["web", "fundamentos"]),
  technologies: z.string().min(2, "Escribe al menos una tecnología"),
  year: z.coerce.number().int().min(2000, "Año inválido").max(2100, "Año inválido"),
  video: z.union([z.literal(""), z.string().url("URL de video inválida")]).optional(),
  repo: z.union([z.literal(""), z.string().url("URL de repositorio inválida")]).optional(),
  demo: z.union([z.literal(""), z.string().url("URL de demo inválida")]).optional(),
  code: z.string().optional(),
  featured: z.boolean().optional(),
});

export type ProjectValues = z.infer<typeof projectSchema>;
