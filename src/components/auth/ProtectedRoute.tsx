import { Navigate, Outlet, useLocation } from "react-router-dom";
import { PageSpinner } from "@/components/ui/Spinner";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/i18n";

export function ProtectedRoute() {
  const { user, initializing } = useAuth();
  const { t } = useI18n();
  const location = useLocation();

  if (initializing) return <PageSpinner label={t("common.loading.session")} />;
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return <Outlet />;
}
