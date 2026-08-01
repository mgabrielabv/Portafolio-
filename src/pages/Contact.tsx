import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Clock, Github, Linkedin, Mail, MapPin, Send, Twitter } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Field";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useToast } from "@/context/ToastContext";
import { contactSchema, type ContactValues } from "@/schemas/contact";

const INFO = [
  { icon: Mail, label: "Email", value: "maria.bermudez@uru.edu", href: "mailto:maria.bermudez@uru.edu" },
  { icon: MapPin, label: "Ubicación", value: "Maracaibo, Zulia, Venezuela", href: undefined },
  { icon: Clock, label: "Respuesta", value: "En menos de 24 horas", href: undefined },
];

const SOCIALS = [
  { href: "https://github.com/", label: "GitHub", Icon: Github },
  { href: "https://linkedin.com/", label: "LinkedIn", Icon: Linkedin },
  { href: "https://x.com/", label: "Twitter / X", Icon: Twitter },
];

export default function Contact() {
  const toast = useToast();

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
    toast.success(`¡Gracias, ${values.name.split(" ")[0]}! Tu mensaje está en camino.`);
    reset();
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeading
        as="h1"
        eyebrow="Contacto"
        title="Hablemos de tu próximo proyecto"
        description="Completa el formulario y te responderé en menos de 24 horas. Sin compromiso."
        align="center"
        className="mx-auto max-w-2xl"
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Info */}
        <Reveal>
          <div className="space-y-4">
            {INFO.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 shadow-card">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs text-muted">{label}</p>
                  {href ? (
                    <a href={href} className="text-sm font-medium text-content transition-colors hover:text-primary">
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-content">{value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="rounded-2xl border border-line bg-surface p-5 shadow-card">
              <p className="text-xs text-muted">Redes</p>
              <div className="mt-3 flex gap-2">
                {SOCIALS.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="grid size-11 place-items-center rounded-xl border border-line text-muted transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
                  >
                    <Icon className="size-5" aria-hidden />
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-primary p-5 text-white">
              <p className="text-sm leading-relaxed text-white/90">
                ¿Prefieres una llamada? Podemos agendar 30 minutos para conocer tu idea y proponerte
                un enfoque.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Formulario */}
        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} className="rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-8" noValidate>
            {isSubmitSuccessful && (
              <div className="mb-5 flex items-center gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-600">
                <CheckCircle2 className="size-4" aria-hidden />
                Mensaje enviado. Formulario listo para otro mensaje.
              </div>
            )}
            <div className="grid gap-5 sm:grid-cols-2">
              <Input label="Nombre" placeholder="Tu nombre" error={errors.name?.message} autoComplete="name" {...register("name")} />
              <Input label="Email" type="email" placeholder="tu@email.com" error={errors.email?.message} autoComplete="email" {...register("email")} />
            </div>
            <div className="mt-5">
              <Input label="Asunto" placeholder="Presupuesto, colaboración, consulta…" error={errors.subject?.message} {...register("subject")} />
            </div>
            <div className="mt-5">
              <Textarea
                label="Mensaje"
                placeholder="Cuéntame en qué estás trabajando…"
                className="min-h-36"
                error={errors.message?.message}
                {...register("message")}
              />
            </div>
            <Button type="submit" size="lg" loading={isSubmitting} className="mt-6 w-full sm:w-auto">
              <Send className="size-4" aria-hidden />
              Enviar mensaje
            </Button>
          </form>
        </Reveal>
      </div>
    </div>
  );
}
