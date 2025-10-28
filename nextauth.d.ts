import NextAuth, {DefaultSession} from "next-auth";

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            emailverified?: boolean | null;
            image?: string | null;
            role: string;
        } & DefaultSession['user']
    }
}