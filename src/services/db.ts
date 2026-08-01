/**
 * Capa de "base de datos" simulada sobre localStorage.
 * Simula latencia de red para que la UI muestre estados de carga reales.
 */

export const STORAGE_KEYS = {
  users: "pf_users",
  token: "pf_token",
  sessionUser: "pf_session_user",
  projects: "pf_projects",
  theme: "pf_theme",
} as const;

export function delay(ms = 450): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function write<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function uid(prefix = "id"): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
