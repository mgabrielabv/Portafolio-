import { zodResolver } from "@hookform/resolvers/zod";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, UserPlus } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoadingOverlay } from "@/components/auth/LoadingOverlay";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { useI18n } from "@/i18n";
import { registerSchema, type RegisterValues } from "@/schemas/auth";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fields: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.25 } },
};

const field: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

const AUTH_ERRORS: Record<string, string> = {
  EMAIL_IN_USE: "register.error.inuse",
  default: "register.error.default",
};

const STRENGTH_COLORS = ["bg-red-500", "bg-red-500", "bg-amber-500", "bg-emerald-400", "bg-accent"];

/** Medidor de fortaleza de contraseña basado en longitud, mayúsculas y números. */
function StrengthMeter({ password }: { password: string }) {
  const { t } = useI18n();
  const score = useMemo(() => {
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-ZÁÉÍÓÚÑ]/.test(password)) s++;
    if (/\d/.test(password)) s++;
    if (password.length >= 12) s++;
    return s;
  }, [password]);

  if (!password) return null;

  return (
    <div aria-live="polite">
      <div className="flex gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors duration-base ${
              i < score ? STRENGTH_COLORS[score] : "bg-line/60"
            }`}
          />
        ))}
      </div>
      <p className={`mt-1.5 text-xs font-medium ${score >= 3 ? "text-accent" : "text-muted"}`}>
        {t(`register.strength.${score}`)}
      </p>
    </div>
  );
}

export default function Register() {
  const { user, register: registerUser } = useAuth();
  const toast = useToast();
  const { t } = useI18n();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [leaving, setLeaving] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const password = watch("password") ?? "";

  if (user && leaving) {
    return <LoadingOverlay message={t("register.loading")} />;
  }

  if (user) return <Navigate to="/home" replace />;

  const onSubmit = handleSubmit(async (values) => {
    setServerError("");
    setLeaving(true);
    try {
      await registerUser({
        name: values.name,
        username: values.username,
        email: values.email,
        password: values.password,
      });
      toast.success(t("register.toast"));
      await new Promise((r) => setTimeout(r, 1500));
      navigate("/home", { replace: true });
    } catch (err) {
      setLeaving(false);
      const code = err instanceof Error ? err.message : "";
      setServerError(t(AUTH_ERRORS[code] ?? AUTH_ERRORS.default));
    }
  });

  return (
    <AuthLayout title={t("register.title")} subtitle={t("register.subtitle")}>
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
              label={t("register.name")}
              type="text"
              autoComplete="name"
              autoFocus
              maxLength={30}
              placeholder={t("register.name.ph")}
              error={errors.name?.message}
              {...register("name")}
            />
          </motion.div>

          <motion.div variants={field}>
            <Input
              label={t("register.username")}
              type="text"
              autoComplete="username"
              maxLength={20}
              placeholder={t("register.username.ph")}
              error={errors.username?.message}
              {...register("username")}
            />
          </motion.div>

          <motion.div variants={field}>
            <Input
              label={t("register.email")}
              type="email"
              autoComplete="email"
              maxLength={30}
              placeholder={t("register.email.ph")}
              error={errors.email?.message}
              {...register("email")}
            />
          </motion.div>

          <motion.div variants={field} className="flex flex-col gap-1.5">
            <PasswordInput
              label={t("register.password")}
              autoComplete="new-password"
              maxLength={12}
              placeholder={t("register.password.ph")}
              error={errors.password?.message}
              hint={t("register.password.hint")}
              {...register("password")}
            />
            <StrengthMeter password={password} />
          </motion.div>

          <motion.div variants={field}>
            <PasswordInput
              label={t("register.confirm")}
              autoComplete="new-password"
              maxLength={12}
              placeholder={t("register.confirm.ph")}
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />
          </motion.div>

          <motion.div variants={field} className="mt-2">
            <Button type="submit" size="lg" loading={isSubmitting} className="w-full">
              <UserPlus className="size-4" aria-hidden />
              {t("register.submit")}
            </Button>
          </motion.div>

          <motion.p variants={field} className="mt-2 text-center text-sm text-muted">
            {t("register.haveAccount")}{" "}
            <Link
              to="/login"
              className="group inline-flex items-center gap-1 font-semibold text-accent transition-colors duration-fast hover:text-accent-faint"
            >
              {t("register.login")}
              <ArrowRight className="size-3.5 transition-transform duration-fast group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </motion.p>
        </motion.div>
      </form>
    </AuthLayout>
  );
}
