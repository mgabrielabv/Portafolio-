import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Github, Linkedin, Send, Twitter } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Field";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useToast } from "@/context/ToastContext";
import { contactSchema, type ContactValues } from "@/schemas/contact";

const INFO = [
  { label: "Email", value: "maria.bermudez@uru.edu", href: "mailto:maria.bermudez@uru.edu" },
  { label: "Ubicación", value: "Maracaibo, Zulia, Venezuela", href: undefined },
  { label: "Respuesta", value: "En menos de 24 horas", href: undefined },
];

const SOCIALS = [
  { href: "https://github.com/mgabrielabv", label: "GitHub", Icon: Github },
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
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading
        as="h1"
        index="01"
        eyebrow="Contacto"
        title="Hablemos de tu próximo proyecto"
        description="Completa el formulario y te responderé en menos de 24 horas. Sin compromiso."
        align="center"
        className="mx-auto max-w-2xl"
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Info */}
        <Reveal>
          <div className="space-y-6">
            <ul className="border-t border-line">
              {INFO.map(({ label, value, href }, i) => (
                <li
                  key={label}
                  className="flex items-center justify-between gap-4 border-b border-line py-4"
                >
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="mt-1 block text-sm font-medium text-content transition-colors duration-fast hover:text-accent"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm font-medium text-content">{value}</p>
                    )}
                  </div>
                  <span aria-hidden className="font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </li>
              ))}
            </ul>

            <div className="border border-line bg-surface p-5">
              <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Redes</p>
              <div className="mt-3 flex gap-2">
                {SOCIALS.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="grid size-11 place-items-center rounded-lg border border-line text-muted transition-[transform,color,border-color] duration-fast hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
                  >
                    <Icon className="size-5" aria-hidden />
                  </a>
                ))}
              </div>
            </div>

            <div className="border border-line border-l-2 border-l-accent bg-surface-2 p-5">
              <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
                {"// llamada"}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                ¿Prefieres una llamada? Podemos agendar 30 minutos para conocer tu idea y proponerte
                un enfoque.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Formulario */}
        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} className="border border-line bg-surface p-6 sm:p-8" noValidate>
            {isSubmitSuccessful && (
              <div className="mb-5 flex items-center gap-2.5 rounded-lg border border-accent/40 bg-accent/10 px-4 py-3 text-sm font-medium text-content">
                <CheckCircle2 className="size-4 text-accent" aria-hidden />
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
