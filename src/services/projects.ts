import type { Project } from "@/types";
import { MOCK_PROJECTS } from "@/data/projects";
import { delay, read, STORAGE_KEYS, uid, write } from "./db";

type ProjectInput = Omit<Project, "id" | "createdAt">;

/**
 * CRUD simulado de proyectos sobre localStorage.
 * La primera vez se siembran los proyectos de ejemplo.
 */
function getDb(): Project[] {
  const existing = read<Project[] | null>(STORAGE_KEYS.projects, null);
  if (!existing) {
    write(STORAGE_KEYS.projects, MOCK_PROJECTS);
    return MOCK_PROJECTS;
  }
  return existing;
}

function saveDb(projects: Project[]): void {
  write(STORAGE_KEYS.projects, projects);
}

export async function listProjects(): Promise<Project[]> {
  await delay(300);
  return [...getDb()].sort((a, b) => b.createdAt - a.createdAt);
}

export async function getProject(id: string): Promise<Project | null> {
  await delay(250);
  return getDb().find((p) => p.id === id) ?? null;
}

export async function createProject(input: ProjectInput): Promise<Project> {
  await delay(500);
  const project: Project = { ...input, id: uid("p"), createdAt: Date.now() };
  saveDb([project, ...getDb()]);
  return project;
}

export async function updateProject(id: string, input: ProjectInput): Promise<Project> {
  await delay(500);
  const db = getDb();
  const existing = db.find((p) => p.id === id);
  if (!existing) throw new Error("Proyecto no encontrado");
  const updated: Project = { ...existing, ...input };
  saveDb(db.map((p) => (p.id === id ? updated : p)));
  return updated;
}

export async function deleteProject(id: string): Promise<void> {
  await delay(350);
  saveDb(getDb().filter((p) => p.id !== id));
}

export async function resetProjects(): Promise<Project[]> {
  await delay(400);
  saveDb(MOCK_PROJECTS);
  return MOCK_PROJECTS;
}
