import { signIn, signInWithGoogle } from "@/lib/firebase/service";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string; full_name: string };

        const user: any = await signIn({ email });

        if (user) {
          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (!isPasswordValid) {
            return null;
          }
          return user;
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials") {
        token.user = user;
        token.full_name = user.full_name;
        token.role = user.role;
      }

      if (account?.provider === "google") {
        const data = {
          full_name: user.name,
          email: user.email,
          image: user.image,
          type: "google",
        };

        const result: { status: boolean; data?: any; message: string } = await signInWithGoogle(data);

        if (result.status === true) {
          token.email = result.data.email;
          token.full_name = result.data.full_name;
          token.type = result.data.type;
          token.image = result.data.image;
          token.role = result.data.role;
        }
      }
      return token;
    },

    async session({ session, token }: any) {
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("full_name" in token) {
        session.user.full_name = token.full_name;
      }

      if ("image" in token) {
        session.user.image = token.image;
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
