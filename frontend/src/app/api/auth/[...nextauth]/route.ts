import NextAuth from "next-auth/next"
import authOptions from "@/app/lib/authOptions";



const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }

// import NextAuth from 'next-auth';
// import Providers from 'next-auth/providers';
// import axios from 'axios';

// export default NextAuth({
//   providers: [
//     Providers.Credentials({
//       async authorize(credentials) {
//         try {
//           const res = await axios.post('http://localhost:5000/api/auth/login', {
//             email: credentials.email,
//             password: credentials.password,
//           });

//           if (res.data && res.data.token) {
//             return { token: res.data.token, user: res.data.user };
//           }
//           return null;
//         } catch (error) {
//           throw new Error('Invalid email or password' + error);
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt(token, user) {
//       if (user) {
//         token.accessToken = user.token;
//         token.user = user.user;
//       }
//       return token;
//     },
//     async session(session, token) {
//       session.accessToken = token.accessToken;
//       session.user = token.user;
//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: '/login',
//   },
// });

// import NextAuth from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials";
// import axios from "axios";

// export const authOptions = {
//   // Configure one or more authentication providers
//   providers: [
//     CredentialsProvider({
//       credentials: {
//         email: {},
//         password: {}
//       },
//       async authorize(credentials) {
//         if (!credentials) {
//           console.log("Where the fuck are your credentials?")
//           return;
//         }
//         try {
//           const res = await axios.post('http://localhost:5000/api/auth/login', {
//             email: credentials.email,
//             password: credentials.password,
//           });

//           if (res.data && res.data.token) {
//             return { id: res.data.user.id, token: res.data.token, ...res.data.user };
//           }
//           return null;
//         } catch (error) {
//           throw new Error('Invalid email or password' + error);
//         }
//       }
//     })
//   ],
//   callbacks: {
//     async jwt({token, user}) {
//       if (user) {
//         token.accessToken = user.token;
//         token.user = user.user;
//       }
//       return token;
//     },
//     async session(session, token) {
//       session.accessToken = token.accessToken;
//       session.user = token.user;
//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET
//   pages: {
//     signIn: '/login',
//   },

// }

// export default NextAuth(authOptions)