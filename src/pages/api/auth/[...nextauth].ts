import { signIn } from "@/lib/firebase/service";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

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
  ],
  callbacks: {
    jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials") {
        token.user = user;
        token.full_name = user.full_name;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: any) {
      if ("email" in token.user) {
        session.user.email = token.user.email;
      }
      if ("full_name" in token.user) {
        session.user.full_name = token.user.full_name;
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
