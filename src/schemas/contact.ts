import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(60, "Nombre demasiado largo"),
  email: z.string().min(1, "El email es obligatorio").email("Introduce un email válido"),
  subject: z.string().min(3, "El asunto debe tener al menos 3 caracteres").max(120, "Asunto demasiado largo"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres").max(2000, "Mensaje demasiado largo"),
});

export type ContactValues = z.infer<typeof contactSchema>;
