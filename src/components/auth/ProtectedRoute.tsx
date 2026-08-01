import { Navigate, Outlet, useLocation } from "react-router-dom";
import { PageSpinner } from "@/components/ui/Spinner";
import { useAuth } from "@/context/AuthContext";

/** Ruta protegida: solo accesible con sesión activa. */
export function ProtectedRoute() {
  const { user, initializing } = useAuth();
  const location = useLocation();

  if (initializing) return <PageSpinner label="Comprobando sesión…" />;
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return <Outlet />;
}
