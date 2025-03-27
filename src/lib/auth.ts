import NextAuth, { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import prisma from './db';
import bcrypt from 'bcryptjs';

const config = {
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        // runs on login
        const { email, password } = credentials;
        const user = await prisma.user.findUnique({
          where: {
            email,
          }
        });
        if (!user) {
          console.log('User not found');
          return null;
        }

        const passwordsMatch = await bcrypt.compare(password, user.hashedPassword)
        if (!passwordsMatch) {
          console.log('Passwords do not match');
          return null;
        }

        return user;
      }
    })
  ],
  callbacks: {
    authorized: ({ auth, request }) => {
      const isLoggedIn = !!auth?.user;
      const isTryingToAccess = request.nextUrl.pathname.includes('/app');
      console.log(isTryingToAccess);
      if (!isLoggedIn && isTryingToAccess) {
        return false;
      }
      if (isLoggedIn && isTryingToAccess) {
        return true;
      }
      if (isLoggedIn && !isTryingToAccess) {
        return Response.redirect(new URL('/app/dashboard', request.nextUrl));
      }
      if (!isLoggedIn && !isTryingToAccess) {
        return true;
      }
      return false;
    },
    jwt: ({ token, user }) => {
      if(user) {
        token.userId = user.id;
      }
      return token;
    },
    session: ({ session, token}) => {
      session.user.id = token.userId;
      return session;
    }
  },
  secret: process.env.SECRET,
} satisfies NextAuthConfig;

export const { auth, signIn, signOut } = NextAuth(config);