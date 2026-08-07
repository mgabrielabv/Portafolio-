import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, KeyRound, MailCheck } from "lucide-react";
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
  const [recovering, setRecovering] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [recoverySent, setRecoverySent] = useState(false);

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

  const handleRecover = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recoveryEmail)) return;
    setRecoverySent(true);
  };

  return (
    <AuthLayout
      title="Bienvenido de nuevo"
      subtitle="Inicia sesión para gestionar tus proyectos del portafolio."
    >
      {recovering ? (
        <div className="flex flex-col gap-4">
          {recoverySent ? (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-accent/40 bg-accent/10 px-6 py-8 text-center">
              <span className="grid size-12 place-items-center rounded-full bg-accent/20 text-accent">
                <MailCheck className="size-6" aria-hidden />
              </span>
              <p className="text-sm text-content">
                Si existe una cuenta con <strong>{recoveryEmail}</strong>, te enviamos las
                instrucciones para restablecer tu contraseña.
              </p>
              <p className="font-mono text-[11px] text-muted">
                (demo · los datos viven en este navegador)
              </p>
            </div>
          ) : (
            <form onSubmit={handleRecover} className="flex flex-col gap-4" noValidate>
              <div className="flex items-center gap-2 font-mono text-xs text-accent">
                <KeyRound className="size-4" aria-hidden />
                Recuperar contraseña
              </div>
              <Input
                label="Email de tu cuenta"
                type="email"
                autoComplete="email"
                placeholder="tu@email.com"
                value={recoveryEmail}
                onChange={(e) => setRecoveryEmail(e.target.value)}
              />
              <Button type="submit" size="lg" className="mt-1 w-full">
                Enviar instrucciones
              </Button>
              <button
                type="button"
                onClick={() => setRecovering(false)}
                className="font-mono text-xs text-muted transition-colors hover:text-accent"
              >
                ← volver al inicio de sesión
              </button>
            </form>
          )}
        </div>
      ) : (
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

          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={() => setRecovering(true)}
              className="font-mono text-xs text-muted transition-colors duration-fast hover:text-accent"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <Button type="submit" size="lg" loading={isSubmitting} className="mt-1 w-full">
            Iniciar sesión
          </Button>

          <p className="mt-2 text-center text-sm text-muted">
            ¿No tienes cuenta?{" "}
            <Link to="/registro" className="font-medium text-accent transition-colors duration-fast hover:text-accent/80">
              Regístrate gratis
            </Link>
          </p>
        </form>
      )}
    </AuthLayout>
  );
}
