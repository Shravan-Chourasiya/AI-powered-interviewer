/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConn from "@/lib/db";
import UserModel from "@/models/User.model";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from 'bcryptjs'

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Enter Your Username..." },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {
                await dbConn()
                try {
                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials.identifier },
                            { username: credentials.identifier }
                        ]
                    })
                    if (!user) throw new Error('User Not Found!!')

                    if (!user.isVerified) throw new Error('User Not Verified ! Please Verify Your Account')

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user?.password)

                    if (isPasswordCorrect) {
                        return user
                    } else {
                        throw new Error('Invalid Password | Please Try Again !')
                    }

                } catch (err: unknown) {
                    if (err instanceof Error) {
                        throw new Error(err.message)
                    }
                    throw new Error('An unknown error occurred')
                }
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id
                session.user.username = token.username
                session.user.isActive = token.isActive
                session.user.isVerified = token.isVerified
                session.user.isAdmin = token.isAdmin
                session.user.email=token.email
            }
            return session
        },
        async jwt({ token, user }) {
            if (user) {
                token.email=user.email
                token._id = user._id
                token.username = user.username
                token.isActive = user.isActive
                token.isVerified = user.isVerified
                token.isAdmin = user.isAdmin
            }
            return token
        }
    },
    pages: {
        signIn: '/sign-in',
        signOut: '/sign-out',
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET

}
export default authOptions