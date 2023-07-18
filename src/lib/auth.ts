import { getJwtTokenFromServer } from "@/old/services/auth.service";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
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
      if (account) {
        token.account = {
          ...account,
          access_token: (user as typeof user & { access_token: string })
            .access_token, // <-- add token to JWT (Next's) object
        };
      }
      return token;
    },
    async session({ session, token }) {
      return { ...session };
    },
  },
};
