import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";

import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      user.access_token = account.access_token;
      user.phoneNumber = "";
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },

    async session({ session, user, token }) {
      if (session?.user) {
        session.user = user;
      }
      return session;
    },

    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
        token.access_token = account.access_token;
      }
      return token;
    },
  },
};
export default NextAuth(authOptions);
