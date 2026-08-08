import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { ProjectCard } from "@/components/ProjectCard";
import { useI18n } from "@/i18n";
import type { Project } from "@/types";

interface FeaturedCarouselProps {
  projects: Project[];
}

/**
 * Carrusel de proyectos destacados con efecto coverflow (Swiper).
 * Autoplay suave, cursor de agarre y bullets personalizados.
 */
export function FeaturedCarousel({ projects }: FeaturedCarouselProps) {
  const { t } = useI18n();
  if (projects.length === 0) return null;

  return (
    <Swiper
      modules={[EffectCoverflow, Autoplay, Pagination]}
      effect="coverflow"
      grabCursor
      centeredSlides
      loop={projects.length > 2}
      slidesPerView={1.05}
      spaceBetween={16}
      coverflowEffect={{ rotate: 0, stretch: 0, depth: 120, modifier: 1.4, slideShadows: false }}
      autoplay={{ delay: 4200, disableOnInteraction: false, pauseOnMouseEnter: true }}
      pagination={{
        clickable: true,
        bulletClass: "swiper-rose-bullet",
        bulletActiveClass: "swiper-rose-bullet-active",
      }}
      breakpoints={{
        640: { slidesPerView: 1.35, spaceBetween: 20 },
        1024: { slidesPerView: 2, spaceBetween: 24 },
      }}
      className="pb-12"
      aria-label={t("carousel.featured")}
    >
      {projects.map((project) => (
        <SwiperSlide key={project.id} className="!h-auto">
          <ProjectCard project={project} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
