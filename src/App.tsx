import { lazy, Suspense, type LazyExoticComponent, type ComponentType } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Layout } from "@/components/layout/Layout";
import { PageSpinner } from "@/components/ui/Spinner";
import { useI18n } from "@/i18n";

/**
 * Carga diferida (lazy) de rutas + Suspense:
 * cada página se descarga solo cuando se navega a ella.
 */
function LazyPage({ Component }: { Component: LazyExoticComponent<ComponentType> }) {
  const { t } = useI18n();
  return (
    <Suspense fallback={<PageSpinner label={t("common.loading.page")} />}>
      <Component />
    </Suspense>
  );
}

const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const Home = lazy(() => import("@/pages/Home"));
const Projects = lazy(() => import("@/pages/Projects"));
const ProjectDetail = lazy(() => import("@/pages/ProjectDetail"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const NotFound = lazy(() => import("@/pages/NotFound"));

/**
 * Flujo obligatorio: Login/Register → Portfolio → Dashboard.
 * Las rutas públicas son solo /login y /registro; el resto está
 * protegido (ProtectedRoute). "/" redirige a /home, que a su vez
 * redirige a /login si no hay sesión.
 */
export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </MotionConfig>
  );
}

/**
 * Envuelve las rutas en AnimatePresence: las páginas públicas (/login y
 * /registro) transicionan entre sí (fade/slide), mientras que las rutas
 * protegidas mantienen la clave estable para que Layout gestione sus
 * propias transiciones de página.
 */
function AnimatedRoutes() {
  const location = useLocation();
  const isAuth = location.pathname === "/login" || location.pathname === "/registro";

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={isAuth ? location.pathname : "app"}>
        <Route path="/login" element={<LazyPage Component={Login} />} />
        <Route path="/registro" element={<LazyPage Component={Register} />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="home" element={<LazyPage Component={Home} />} />
            <Route path="proyectos" element={<LazyPage Component={Projects} />} />
            <Route path="proyectos/:id" element={<LazyPage Component={ProjectDetail} />} />
            <Route path="sobre-mi" element={<LazyPage Component={About} />} />
            <Route path="contacto" element={<LazyPage Component={Contact} />} />
            <Route path="dashboard" element={<LazyPage Component={Dashboard} />} />
            <Route path="estadisticas" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<LazyPage Component={NotFound} />} />
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
