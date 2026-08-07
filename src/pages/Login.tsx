import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { loginSchema, type LoginValues } from "@/schemas/auth";

const AUTH_ERRORS: Record<string, string> = {
  INVALID_CREDENTIALS: "Email o contraseña incorrectos. Revisa tus datos.",
  default: "No pudimos iniciar sesión. Inténtalo de nuevo.",
};

export default function Login() {
  const { user, login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  if (user) return <Navigate to="/admin" replace />;

  const onSubmit = handleSubmit(async (values) => {
    setServerError("");
    try {
      await login(values);
      toast.success("¡Bienvenido de nuevo!");
      navigate("/admin");
    } catch (err) {
      const code = err instanceof Error ? err.message : "";
      setServerError(AUTH_ERRORS[code] ?? AUTH_ERRORS.default);
    }
  });

  return (
    <AuthLayout
      title="Bienvenido de nuevo"
      subtitle="Inicia sesión para gestionar tus proyectos del portafolio."
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
        {serverError && (
          <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-500">
            {serverError}
          </p>
        )}

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
          autoComplete="current-password"
          placeholder="••••••••"
          error={errors.password?.message}
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
          {...register("password")}
        />

        <Button type="submit" size="lg" loading={isSubmitting} className="mt-2 w-full">
          Iniciar sesión
        </Button>

        <p className="mt-2 text-center text-sm text-muted">
          ¿No tienes cuenta?{" "}
          <Link to="/registro" className="font-medium text-accent transition-colors duration-fast hover:text-accent/80">
            Regístrate gratis
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
