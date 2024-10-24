import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { NextAuthOptions } from "next-auth";


type LoginResponse = {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
};


export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [

        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            id: 'credentials',
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials) {
                const res = await axios.post<LoginResponse>('http://localhost:5000/api/auth/login', {
                    email: credentials?.email,
                    password: credentials?.password,
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
            session.user = token.user;
            return session; // Session interface we declared in next-auth.d.ts
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },
};

export default authOptions;