import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

import User from "@/database/models/User";
import dbConnect from "@/lib/dbConnect";

export default NextAuth({
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                dbConnect()

                const user = await User.findOne({ email: credentials!.email }).select('+password')

                if (!user) { throw new Error('No user with a matching email was found.') }

                const pwValid = await user.comparePassword(credentials!.password)

                if (!pwValid) { throw new Error("Your password is invalid") }

                return user
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: user.image,
                }
            }
            return token
        },
        session: async ({ session, token }: { session: any; token: any }) => {
            if (token) {
                session.user = token.user;
            }
            return session
        }
    },
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
    },
})