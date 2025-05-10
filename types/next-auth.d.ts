import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      accessToken: string;
      id: string;
      email: string;
      phone?: string;
    };
    accessToken: string;
  }

  interface User {
    id: string;
    email: string;
    phone?: string;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    phone?: string;
    accessToken: string;
  }
} 