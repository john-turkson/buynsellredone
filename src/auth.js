import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginUser } from "@/utils/auth-functions";

export const authConfig = {
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        // let user = null;

        const user = await loginUser(credentials);
        // console.log(user);

        if (user) {
          return user;
        } else {
          throw new Error("Invalid Credentials");
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Attach the user information to the session
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      // Ensure redirects stay within the current base URL
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  secret: process.env.JWT_SECRET,
  debug: process.env.NODE_ENV === "development",
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
