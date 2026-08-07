import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { registerSchema, type RegisterValues } from "@/schemas/auth";

const AUTH_ERRORS: Record<string, string> = {
  EMAIL_IN_USE: "Ya existe una cuenta con ese email. Prueba a iniciar sesión.",
  default: "No pudimos crear tu cuenta. Inténtalo de nuevo.",
};

export default function Register() {
  const { user, register: registerUser } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  if (user) return <Navigate to="/admin" replace />;

  const onSubmit = handleSubmit(async (values) => {
    setServerError("");
    try {
      const newUser = await registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      toast.success(`¡Cuenta creada! Bienvenido, ${newUser.name.split(" ")[0]}.`);
      navigate("/admin");
    } catch (err) {
      const code = err instanceof Error ? err.message : "";
      setServerError(AUTH_ERRORS[code] ?? AUTH_ERRORS.default);
    }
  });

  const passwordProps = register("password");
  const confirmProps = register("confirmPassword");

  return (
    <AuthLayout
      title="Crea tu cuenta"
      subtitle="Regístrate para gestionar los proyectos de tu portafolio."
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
        {serverError && (
          <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-500">
            {serverError}
          </p>
        )}

        <Input
          label="Nombre"
          type="text"
          autoComplete="name"
          placeholder="Ana García"
          error={errors.name?.message}
          {...register("name")}
        />

        <Input
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="tu@email.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label="Contraseña"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          placeholder="Mínimo 8 caracteres, 1 mayúscula y 1 número"
          error={errors.password?.message}
          hint="Usa al menos 8 caracteres, una mayúscula y un número."
          rightSlot={
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              className="rounded-md p-1 text-muted transition-colors hover:text-content"
            >
              {showPassword ? <EyeOff className="size-4.5" aria-hidden /> : <Eye className="size-4.5" aria-hidden />}
            </button>
          }
          {...passwordProps}
        />

        <Input
          label="Confirmar contraseña"
          type={showConfirm ? "text" : "password"}
          autoComplete="new-password"
          placeholder="Repite tu contraseña"
          error={errors.confirmPassword?.message}
          rightSlot={
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              aria-label={showConfirm ? "Ocultar contraseña" : "Mostrar contraseña"}
              className="rounded-md p-1 text-muted transition-colors hover:text-content"
            >
              {showConfirm ? <EyeOff className="size-4.5" aria-hidden /> : <Eye className="size-4.5" aria-hidden />}
            </button>
          }
          {...confirmProps}
        />

        <Button type="submit" size="lg" loading={isSubmitting} className="mt-2 w-full">
          Crear cuenta
        </Button>

        <p className="mt-2 flex items-center justify-center gap-1.5 text-center text-xs text-muted">
          <ShieldCheck className="size-3.5 text-accent" aria-hidden />
          Tus datos se guardan localmente en este navegador (demo).
        </p>

        <p className="mt-2 text-center text-sm text-muted">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="font-medium text-accent transition-colors duration-fast hover:text-accent/80">
            Inicia sesión
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
