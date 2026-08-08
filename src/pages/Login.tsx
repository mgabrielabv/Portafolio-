import { zodResolver } from "@hookform/resolvers/zod";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, LogIn } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoadingOverlay } from "@/components/auth/LoadingOverlay";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { useI18n } from "@/i18n";
import { loginSchema, type LoginValues } from "@/schemas/auth";

const AUTH_ERRORS: Record<string, string> = {
  INVALID_CREDENTIALS: "login.error.invalid",
  default: "login.error.default",
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fields: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } },
};

const field: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

export default function Login() {
  const { user, login } = useAuth();
  const toast = useToast();
  const { t } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  const [serverError, setServerError] = useState("");
  const [leaving, setLeaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  if (user && leaving) {
    return <LoadingOverlay message={t("login.loading")} />;
  }

  if (user) {
    const from = (location.state as { from?: string } | null)?.from;
    return <Navigate to={from ?? "/home"} replace />;
  }

  const onSubmit = handleSubmit(async (values) => {
    setServerError("");
    setLeaving(true);
    try {
      await login(values);
      toast.success(t("login.toast"));
      const from = (location.state as { from?: string } | null)?.from;
      await new Promise((r) => setTimeout(r, 1500));
      navigate(from ?? "/home", { replace: true });
    } catch (err) {
      setLeaving(false);
      const code = err instanceof Error ? err.message : "";
      setServerError(t(AUTH_ERRORS[code] ?? AUTH_ERRORS.default));
    }
  });

  return (
    <AuthLayout title={t("login.title")} subtitle={t("login.subtitle")}>
      <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
        {serverError && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            role="alert"
            className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-500"
          >
            {serverError}
          </motion.p>
        )}

        <motion.div variants={fields} initial="hidden" animate="show" className="flex flex-col gap-4">
          <motion.div variants={field}>
            <Input
              label={t("login.email")}
              type="email"
              autoComplete="email"
              autoFocus
              placeholder={t("login.email.ph")}
              error={errors.email?.message}
              {...register("email")}
            />
          </motion.div>

          <motion.div variants={field}>
            <PasswordInput
              label={t("login.password")}
              autoComplete="current-password"
              placeholder={t("login.password.ph")}
              error={errors.password?.message}
              {...register("password")}
            />
          </motion.div>

          <motion.div variants={field} className="mt-1">
            <Button type="submit" size="lg" loading={isSubmitting} className="w-full">
              <LogIn className="size-4" aria-hidden />
              {t("login.submit")}
            </Button>
          </motion.div>

          <motion.p variants={field} className="mt-2 text-center text-sm text-muted">
            {t("login.noAccount")}{" "}
            <Link
              to="/registro"
              className="group inline-flex items-center gap-1 font-semibold text-accent transition-colors duration-fast hover:text-accent-faint"
            >
              {t("login.createAccount")}
              <ArrowRight className="size-3.5 transition-transform duration-fast group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </motion.p>
        </motion.div>
      </form>
    </AuthLayout>
  );
}
