// lib/authOptions.ts
import { NextAuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

const namespace = "https://my-app.com/roles";

export const authOptions: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER_BASE_URL!,
      authorization: {
        params: {
          prompt: "login", 
        },
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account }) {
      if (account?.id_token) {
        const payload = JSON.parse(
          Buffer.from(account.id_token.split(".")[1], "base64").toString()
        );
        token.roles = payload[namespace] || [];
      }
      return token;
    },
    async session({ session, token }) {
      session.user.roles = (token as unknown as { roles: string[] }).roles || [];
      return session;
    },
  },
};
