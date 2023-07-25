import { getJwtTokenFromServer } from "@/old/services/auth.service";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { User } from "next-auth";

type CustomUser = User & {
  access_token: string;
};

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        const token = await getJwtTokenFromServer(
          credentials.email,
          credentials.password
        );
        const user = {
          id: credentials.email,
          email: credentials.email,
          access_token: token,
        };
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.access_token = (user as CustomUser).access_token;
      }
      return token;
    },
    async session({ session, token }) {
      return { ...session, access_token: token.access_token };
    },
  },
};
