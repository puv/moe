import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

import User from "@/database/models/User";
import dbConnect from "@/lib/dbConnect";
import bcrypt from 'bcrypt'

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

                const user = await User.findOne({ 'private.email': credentials!.email }).select("+private.password")
                if (!user) { throw new Error('No user with a matching email was found.') }

                const pwValid = await bcrypt.compare(credentials!.password, user.private.password)
                if (!pwValid) { throw new Error("Your password is invalid") }

                return user
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }: { token: any, user: any }) {
            if (user) {
                token.user = {
                    id: user.id,
                    email: user.private.email,
                    name: user.public.username,
                    image: user.public.image,
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
        error: '/'
    },
})