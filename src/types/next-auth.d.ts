import { Role } from "@prisma/client";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role: Role;
    bio?: string;
    emailNotifications?: boolean;
    projectUpdates?: boolean;
    supportMessages?: boolean;
  }

  interface Session {
    user: User & {
      id: string;
      role: Role;
      bio?: string;
      emailNotifications?: boolean;
      projectUpdates?: boolean;
      supportMessages?: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
  }
} 