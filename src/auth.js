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
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@email.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter a Password",
        },
      },
      async authorize(credentials) {
        try {
          return loginUser(credentials);
        } catch (error) {
          throw new Error("Error in Auth.js Authorize()!", error);
        }
      },
    }),
  ],
  sesssion: {
    stratgey: "jwt",
  },
  secret: process.env.JWT_SECRET,
  debug: process.env.NODE_ENV === "development",
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
