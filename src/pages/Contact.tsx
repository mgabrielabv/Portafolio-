import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Github, Linkedin, Send, Twitter } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Field";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useToast } from "@/context/ToastContext";
import { useI18n, interpolate } from "@/i18n";
import { contactSchema, type ContactValues } from "@/schemas/contact";

const INFO = [
  { labelKey: "contact.info.email", value: "maria.bermudez@uru.edu", href: "mailto:maria.bermudez@uru.edu" },
  { labelKey: "contact.info.location", value: "Maracaibo, Zulia, Venezuela", href: undefined },
  { labelKey: "contact.info.response", valueKey: "contact.info.responseValue", href: undefined },
];

const SOCIALS = [
  { href: "https://github.com/mgabrielabv", label: "GitHub", Icon: Github },
  { href: "https://linkedin.com/", label: "LinkedIn", Icon: Linkedin },
  { href: "https://x.com/", label: "Twitter / X", Icon: Twitter },
];

export default function Contact() {
  const toast = useToast();
  const { t } = useI18n();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
  });

  const onSubmit = handleSubmit(async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 900));
    toast.success(interpolate(t("contact.toast"), { name: values.name.split(" ")[0] }));
    reset();
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading
        as="h1"
        eyebrow={t("contact.eyebrow")}
        title={t("contact.title")}
        description={t("contact.desc")}
        align="center"
        className="mx-auto max-w-2xl"
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Info */}
        <Reveal>
          <div className="space-y-6">
            <div className="border-t border-line">
              {INFO.map(({ labelKey, value, valueKey, href }, i) => (
                <li
                  key={labelKey}
                  className="flex items-center justify-between gap-4 border-b border-line py-4"
                >
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
                      {t(labelKey)}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="mt-1 block text-sm font-medium text-content transition-colors duration-fast hover:text-accent"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm font-medium text-content">
                        {valueKey ? t(valueKey) : value}
                      </p>
                    )}
                  </div>
                  <span aria-hidden className="font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </li>
              ))}
            </div>

            <div className="glass rounded-2xl p-5">
              <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">{t("contact.social")}</p>
              <div className="mt-3 flex gap-2">
                {SOCIALS.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="glass grid size-11 place-items-center rounded-full text-muted transition-[transform,color,border-color] duration-fast hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
                  >
                    <Icon className="size-5" aria-hidden />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Formulario */}
        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} className="glass relative overflow-hidden rounded-[2rem] p-6 sm:p-8" noValidate>
            {isSubmitSuccessful && (
              <div className="mb-5 flex items-center gap-2.5 rounded-lg border border-accent/40 bg-accent/10 px-4 py-3 text-sm font-medium text-content">
                <CheckCircle2 className="size-4 text-accent" aria-hidden />
                {t("contact.success")}
              </div>
            )}
            <div className="grid gap-5 sm:grid-cols-2">
              <Input label={t("contact.name")} placeholder={t("contact.name.ph")} error={errors.name?.message} autoComplete="name" {...register("name")} />
              <Input label={t("contact.email")} type="email" placeholder={t("contact.email.ph")} error={errors.email?.message} autoComplete="email" {...register("email")} />
            </div>
            <div className="mt-5">
              <Input label={t("contact.subject")} placeholder={t("contact.subject.ph")} error={errors.subject?.message} {...register("subject")} />
            </div>
            <div className="mt-5">
              <Textarea
                label={t("contact.message")}
                placeholder={t("contact.message.ph")}
                className="min-h-36"
                error={errors.message?.message}
                {...register("message")}
              />
            </div>
            <Button type="submit" size="lg" loading={isSubmitting} className="mt-6 w-full sm:w-auto">
              <Send className="size-4" aria-hidden />
              {t("contact.submit")}
            </Button>
          </form>
        </Reveal>
      </div>
    </div>
  );
}
