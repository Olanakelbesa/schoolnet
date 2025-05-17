import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

// Extend the built-in session types
declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    role: string;
    accessToken: string;
    token: string; // Make token required to match JWT
  }
  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    role: string;
    accessToken: string;
    token: string; // Make token required to match User
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials): Promise<User | null> {
        try {
          console.log("Attempting login with:", credentials?.email);
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/login`,
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );

          console.log("Login response:", response.data);

          if (response.data) {
            // Store token in localStorage
            if (typeof window !== 'undefined') {
              localStorage.setItem('token', response.data.token);
            }
            
            return {
              id: response.data.user.id,
              email: response.data.user.email,
              role: response.data.user.role || 'user',
              accessToken: response.data.token,
              token: response.data.token,
            };
          }
          return null;
        } catch (error: any) {
          console.error("Login error:", error.response?.data || error.message);
          throw new Error(error.response?.data?.message || "Authentication failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Initial sign in
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          role: token.role,
          accessToken: token.accessToken,
          token: token.token,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login", // Redirect to login page on error
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
});

export { handler as GET, handler as POST }; 