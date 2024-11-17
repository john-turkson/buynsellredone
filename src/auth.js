import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";

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
        try {
          // Ensure the credentials are provided
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required.");
          }

          // Attempt to login the user
          const loginUser = axios.post('/api/login-user', credentials)

          if (loginUser.data && loginUser.data.user) {
            return loginUser.data.user;
          } else {
            throw new Error("No user data received. Please try again.");
          }

          // Check if the user was successfully authenticated
          // if (user) {
          //   return user;
          // } else {
          //   throw new Error(
          //     "Invalid credentials. Please check your email and password."
          //   );
          // }
        } catch (error) {
          // Log the error for debugging purposes (optional, but recommended)
          console.error("Authorization error:", error);

          // Throw a user-friendly error message
          throw new Error(
            error.message ||
              "An error occurred during login. Please try again later."
          );
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
  secret: process.env.AUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
