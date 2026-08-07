import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "El email es obligatorio").email("Introduce un email válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .max(60, "El nombre es demasiado largo"),
    username: z
      .string()
      .min(3, "El usuario debe tener al menos 3 caracteres")
      .max(24, "El usuario es demasiado largo")
      .regex(/^[a-zA-Z0-9._-]+$/, "Solo letras, números, puntos, guiones y guiones bajos"),
    email: z.string().min(1, "El email es obligatorio").email("Introduce un email válido"),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .regex(/[A-ZÁÉÍÓÚÑ]/, "Incluye al menos una letra mayúscula")
      .regex(/\d/, "Incluye al menos un número"),
    confirmPassword: z.string().min(1, "Confirma tu contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type RegisterValues = z.infer<typeof registerSchema>;
