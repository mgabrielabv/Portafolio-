import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useI18n } from "@/i18n";
import { Input, type InputProps } from "./Field";

/** Campo de contraseña con botón para mostrar/ocultar el texto. */
export const PasswordInput = forwardRef<HTMLInputElement, InputProps>(function PasswordInput(
  { type, ...props },
  ref,
) {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);
  return (
    <Input
      {...props}
      ref={ref}
      type={visible ? "text" : type ?? "password"}
      rightSlot={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? t("password.hide") : t("password.show")}
          className="rounded-lg p-1.5 text-muted transition-colors duration-fast hover:text-accent"
        >
          {visible ? <EyeOff className="size-4" aria-hidden /> : <Eye className="size-4" aria-hidden />}
        </button>
      }
    />
  );
});
