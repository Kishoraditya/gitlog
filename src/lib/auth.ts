import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            authorization: {
                params: {
                    scope: "read:user user:email repo",
                },
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account, profile }) {
            if (account) {
                token.accessToken = account.access_token;
                token.githubId = profile?.id?.toString();
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token) {
                session.user.id = token.sub || "";
                session.accessToken = (token.accessToken as string) || "";
            }
            return session;
        },
        async signIn({ user, account, profile }) {
            if (account?.provider === "github" && profile) {
                // Update githubId if not set
                await prisma.user.update({
                    where: { id: user.id },
                    data: {
                        githubId: profile.id?.toString(),
                    },
                }).catch(() => {
                    // User might not exist yet, that's ok
                });
            }
            return true;
        },
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

// Extend NextAuth types
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
        accessToken: string;
    }

    interface Profile {
        id?: number;
        login?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string;
        githubId?: string;
    }
}
