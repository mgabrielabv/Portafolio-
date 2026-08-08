export type Category = "web" | "fundamentos";

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  thumbnail: string;
  images: string[];
  video?: string;
  code?: string;
  repo?: string;
  demo?: string;
  technologies: string[];
  category: Category;
  year: number;
  featured: boolean;
  createdAt: number;
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  createdAt: number;
}

export interface RegisterPayload {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export type AuthErrorCode = "INVALID_CREDENTIALS" | "EMAIL_IN_USE" | "INVALID_EMAIL";

export interface CategoryMeta {
  label: string;
  description: string;
}
