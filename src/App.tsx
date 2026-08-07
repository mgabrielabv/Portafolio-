import { lazy, Suspense, type LazyExoticComponent, type ComponentType } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Layout } from "@/components/layout/Layout";
import { PageSpinner } from "@/components/ui/Spinner";

/**
 * Carga diferida (lazy) de rutas + Suspense:
 * cada página se descarga solo cuando se navega a ella.
 */
function lazyPage(Component: LazyExoticComponent<ComponentType>) {
  return (
    <Suspense fallback={<PageSpinner label="Cargando página…" />}>
      <Component />
    </Suspense>
  );
}

const Home = lazy(() => import("@/pages/Home"));
const Projects = lazy(() => import("@/pages/Projects"));
const ProjectDetail = lazy(() => import("@/pages/ProjectDetail"));
const Stats = lazy(() => import("@/pages/Stats"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const Admin = lazy(() => import("@/pages/Admin"));
const NotFound = lazy(() => import("@/pages/NotFound"));

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={lazyPage(Home)} />
          <Route path="proyectos" element={lazyPage(Projects)} />
          <Route path="proyectos/:id" element={lazyPage(ProjectDetail)} />
          <Route path="estadisticas" element={lazyPage(Stats)} />
          <Route path="sobre-mi" element={lazyPage(About)} />
          <Route path="contacto" element={lazyPage(Contact)} />
          <Route path="login" element={lazyPage(Login)} />
          <Route path="registro" element={lazyPage(Register)} />

          <Route element={<ProtectedRoute />}>
            <Route path="admin" element={lazyPage(Admin)} />
          </Route>

          <Route path="*" element={lazyPage(NotFound)} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
