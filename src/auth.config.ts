import bcrypt from 'bcryptjs';
import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import prisma from '~/lib/prisma';

export const authConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account'
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z.object({ email: z.string(), password: z.string().min(5) }).safeParse(credentials);
        if(!parsedCredentials.success) return null; 

        const { data } = parsedCredentials;
        const user = await prisma.user.findUnique({where: {email:data.email}});
        if(!user) return null;

        const comparePasswords = bcrypt.compareSync(data.password, user.password);
        if(!comparePasswords) return null;
        const { password, ...rest } = user;
        
        return rest;
      },
    }),
  ],
} satisfies NextAuthConfig;


export const { signIn, signOut, auth } = NextAuth(authConfig);