import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import GoogleProvider from "next-auth/providers/google";
import { Role } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.role = token.role as Role;
        
        // Fetch additional user data from database
        const user = await prisma.user.findUnique({
          where: { id: token.sub! },
          select: {
            bio: true,
            emailNotifications: true,
            projectUpdates: true,
            supportMessages: true,
          },
        });

        if (user) {
          session.user = {
            ...session.user,
            ...user,
          };
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role as Role;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
}; 