import type { LoginPayload, RegisterPayload, User } from "@/types";
import { delay, read, STORAGE_KEYS, uid, write } from "./db";

interface StoredUser extends User {
  password: string;
}

function hashPassword(password: string): string {
  let hash = 5381;
  const salted = `pf::${password}::salt`;
  for (let i = 0; i < salted.length; i++) {
    hash = (hash * 33) ^ salted.charCodeAt(i);
  }
  return (hash >>> 0).toString(16);
}

function getUsers(): StoredUser[] {
  return read<StoredUser[]>(STORAGE_KEYS.users, []);
}

function saveUsers(users: StoredUser[]): void {
  write(STORAGE_KEYS.users, users);
}

function toPublicUser(u: StoredUser): User {
  return { id: u.id, name: u.name, username: u.username, email: u.email, createdAt: u.createdAt };
}

export function getSession(): { user: User; token: string } | null {
  const token = localStorage.getItem(STORAGE_KEYS.token);
  const user = read<User | null>(STORAGE_KEYS.sessionUser, null);
  return token && user ? { user, token } : null;
}

export async function register({ name, username, email, password }: RegisterPayload): Promise<User> {
  await delay(600);
  const normalized = email.trim().toLowerCase();
  const users = getUsers();
  if (users.some((u) => u.email.toLowerCase() === normalized)) {
    throw new Error("EMAIL_IN_USE");
  }
  const user: StoredUser = {
    id: uid("u"),
    name: name.trim(),
    username: username.trim(),
    email: normalized,
    password: hashPassword(password),
    createdAt: Date.now(),
  };
  saveUsers([...users, user]);
  const token = uid("tok");
  localStorage.setItem(STORAGE_KEYS.token, token);
  write(STORAGE_KEYS.sessionUser, toPublicUser(user));
  return toPublicUser(user);
}

export async function login({ email, password }: LoginPayload): Promise<User> {
  await delay(600);
  const normalized = email.trim().toLowerCase();
  const user = getUsers().find((u) => u.email.toLowerCase() === normalized);
  if (!user || user.password !== hashPassword(password)) {
    throw new Error("INVALID_CREDENTIALS");
  }
  const token = uid("tok");
  localStorage.setItem(STORAGE_KEYS.token, token);
  write(STORAGE_KEYS.sessionUser, toPublicUser(user));
  return toPublicUser(user);
}

export async function logout(): Promise<void> {
  await delay(250);
  localStorage.removeItem(STORAGE_KEYS.token);
  localStorage.removeItem(STORAGE_KEYS.sessionUser);
}
