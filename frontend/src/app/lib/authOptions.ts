// import { env } from "@/lib/db/env"
// import prisma from "@/lib/db/prisma"
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import { NextAuthOptions } from "next-auth"
// import NextAuth from "next-auth/next"
// import { Adapter } from "next-auth/adapters"
// import Google from "next-auth/providers/google"

// export const authOptions: NextAuthOptions = {
//     adapter: PrismaAdapter(prisma) as Adapter,
//     providers: [
//         Google({
//             clientId: env.GOOGLE_CLIENT_ID,
//             clientSecret: env.GOOGLE_CLIENT_SECRET,
//         }),
//     ],
//     callbacks: {
//         session({ session, user }) {
//             session.user.id = user.id
//             return session;
//         }
//     }
// }

import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { NextAuthOptions } from "next-auth/";


type LoginResponse = {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
};

type CredentialsDetails = {
    credentials: {
        email: string;
        password: string;
    }
}


export const authOptions = {
    // Configure one or more authentication providers
    providers: [

        CredentialsProvider({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            //this is such a bad workaround for this stupid ass fucking type error...
            //TODO: look into this type error... 
            //https://github.com/nextauthjs/next-auth/issues/2701 from michael-lloyd-morris commented on Aug 17, 2023 is used here
            async authorize({ credentials: { email, password } }: CredentialsDetails) {

                const res = await axios.post<LoginResponse>('http://localhost:5000/api/auth/login', {
                    email: email,
                    password: password,
                });

                if (res.status === 200) {
                    const { id, name, email } = res.data.user;
                    const user = {
                        id,
                        token: res.data.token,
                        name,
                        email,

                    }
                    return user;
                }
                else return null;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return Promise.resolve(token); // JWT interface we declared in next-auth.d.ts
        },
        async session({ session, token }) {
            session.user = token.user as typeof session.user;
            return session; // Session interface we declared in next-auth.d.ts
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },
} satisfies NextAuthOptions;

export default authOptions;