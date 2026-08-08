import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus, Loader2, Trash2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Field";
import { CATEGORY_ORDER } from "@/data/projects";
import { useI18n } from "@/i18n";
import { projectSchema, type ProjectValues } from "@/schemas/project";
import { createProject, updateProject } from "@/services/projects";
import type { Project } from "@/types";
import { listToTags, tagsToList, fileToDataUrl } from "@/utils/file";

interface ProjectFormProps {
  project: Project | null;
  onDone: (project: Project, action: "created" | "updated") => void;
  onCancel: () => void;
}

export function ProjectForm({ project, onDone, onCancel }: ProjectFormProps) {
  const { t } = useI18n();
  const [images, setImages] = useState<string[]>(project?.images ?? []);
  const [thumbnail, setThumbnail] = useState<string | null>(project?.thumbnail ?? null);
  const [uploading, setUploading] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const thumbInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProjectValues>({
    resolver: zodResolver(projectSchema),
    mode: "onBlur",
    defaultValues: project
      ? {
          title: project.title,
          description: project.description,
          longDescription: project.longDescription,
          category: project.category,
          technologies: listToTags(project.technologies),
          year: project.year,
          video: project.video ?? "",
          repo: project.repo ?? "",
          demo: project.demo ?? "",
          code: project.code ?? "",
          featured: project.featured,
        }
      : {
          category: "web",
          year: new Date().getFullYear(),
          featured: false,
        },
  });

  const handleImages = async (files: FileList | null) => {
    if (!files?.length) return;
    setUploading(true);
    const urls = await Promise.all(Array.from(files).map((f) => fileToDataUrl(f)));
    setImages((prev) => [...prev, ...urls]);
    setUploading(false);
  };

  const handleThumbnail = async (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    setUploading(true);
    const url = await fileToDataUrl(file);
    setThumbnail(url);
    setUploading(false);
  };

  const onSubmit = handleSubmit(async (values) => {
    const finalThumbnail = thumbnail ?? images[0] ?? "";
    const input = {
      title: values.title.trim(),
      description: values.description.trim(),
      longDescription: values.longDescription?.trim() ?? "",
      thumbnail: finalThumbnail,
      images: images.length ? images : finalThumbnail ? [finalThumbnail] : [],
      video: values.video?.trim() || undefined,
      repo: values.repo?.trim() || undefined,
      demo: values.demo?.trim() || undefined,
      code: values.code?.trim() || undefined,
      technologies: tagsToList(values.technologies),
      category: values.category,
      year: values.year,
      featured: !!values.featured,
    };

    const saved = project
      ? await updateProject(project.id, input)
      : await createProject(input);
    onDone(saved, project ? "updated" : "created");
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      {/* Imágenes */}
      <div className="rounded-2xl border border-dashed border-line bg-surface-2/50 p-4">
        <p className="text-sm font-medium text-content">{t("form.images")}</p>
        <p className="mt-0.5 text-xs text-muted">{t("form.images.hint")}</p>

        <div className="mt-3 flex flex-wrap gap-3">
          {images.map((img) => (
            <div key={img} className="group relative size-24 overflow-hidden rounded-xl border border-line">
              <img src={img} alt="" className="size-full object-cover" />
              <button
                type="button"
                onClick={() => setImages((prev) => prev.filter((i) => i !== img))}
                aria-label={t("form.removeImg")}
                className="absolute inset-0 grid place-items-center bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Trash2 className="size-4" aria-hidden />
              </button>
            </div>
          ))}

          {thumbnail && !images.includes(thumbnail) && (
            <div className="relative size-24 overflow-hidden rounded-xl border-2 border-accent">
              <img src={thumbnail} alt="" className="size-full object-cover" />
              <span className="absolute bottom-0 w-full bg-black/60 py-0.5 text-center text-[10px] font-medium text-white">
                {t("form.cover")}
              </span>
            </div>
          )}

          <button
            type="button"
            onClick={() => imageInputRef.current?.click()}
            disabled={uploading}
            className="grid size-24 place-items-center rounded-lg border border-dashed border-line text-muted transition-colors duration-fast hover:border-accent/60 hover:text-accent disabled:opacity-50"
            aria-label={t("form.addImages")}
          >
            {uploading ? <Loader2 className="size-5 animate-spin" aria-hidden /> : <ImagePlus className="size-5" aria-hidden />}
          </button>
        </div>
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            handleImages(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input label={t("form.title")} placeholder={t("form.title.ph")} error={errors.title?.message} {...register("title")} />
        <Select
          label={t("form.category")}
          options={CATEGORY_ORDER.map((c) => ({ value: c, label: t(`cat.${c}`) }))}
          {...register("category")}
        />
      </div>

      <Textarea
        label={t("form.shortDesc")}
        placeholder={t("form.shortDesc.ph")}
        error={errors.description?.message}
        {...register("description")}
      />

      <Textarea
        label={t("form.longDesc")}
        placeholder={t("form.longDesc.ph")}
        className="min-h-32"
        {...register("longDescription")}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label={t("form.techs")}
          placeholder={t("form.techs.ph")}
          error={errors.technologies?.message}
          {...register("technologies")}
        />
        <Input label={t("form.year")} type="number" error={errors.year?.message} {...register("year")} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input label={t("form.video")} placeholder={t("form.video.ph")} error={errors.video?.message} {...register("video")} />
        <Input label={t("form.demo")} placeholder={t("form.demo.ph")} error={errors.demo?.message} {...register("demo")} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input label={t("form.repo")} placeholder={t("form.repo.ph")} error={errors.repo?.message} {...register("repo")} />
        <button
          type="button"
          onClick={() => thumbInputRef.current?.click()}
          disabled={uploading}
          className="mt-6 inline-flex h-11 items-center justify-center gap-2 self-end rounded-lg border border-dashed border-line font-mono text-xs tracking-[0.1em] text-muted uppercase transition-colors duration-fast hover:border-accent/60 hover:text-accent disabled:opacity-50"
        >
          <Upload className="size-4" aria-hidden />
          {t("form.uploadCover")}
        </button>
        <input
          ref={thumbInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            handleThumbnail(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      <Textarea
        label={t("form.code")}
        placeholder={t("form.code.ph")}
        className="min-h-36 font-mono text-xs"
        hint={t("form.code.hint")}
        {...register("code")}
      />

      <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-line bg-surface-2/50 px-4 py-3">
        <input type="checkbox" className="size-4 accent-accent" {...register("featured")} />
        <span className="text-sm font-medium text-content">{t("form.featured")}</span>
      </label>

      <div className="flex justify-end gap-3 border-t border-line pt-5">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
          {t("form.cancel")}
        </Button>
        <Button type="submit" loading={isSubmitting}>
          {project ? t("form.save") : t("form.create")}
        </Button>
      </div>
    </form>
  );
}
