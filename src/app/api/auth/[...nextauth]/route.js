import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import crypto from "crypto";
import { cookies } from "next/headers";

const handler = NextAuth({

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          name: "email",
          type: "email",
          label: "Email"
        },
        password: {
          name: "password",
          type: "password",
          label: "Password"
        }
      },
      async authorize(credentials, req) {
        const { email, password } = credentials
        try {
          const response = await axios({
            method: "get",
            url: `${process.env.NEXT_PUBLIC_ENDPOINT}/api/user?email=${email}&password=${password}`
          })
          const token = response.data.data.user.token;
          cookies().set({
            name: "authToken",
            value: token,
            httpOnly: true,
            maxAge: 86400

          })
          return response.data.data.user

        } catch (error) {
          return null
        }
      }
    }),

    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
    }),
    FacebookProvider({
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET
    }),
    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET
    })

  ],
  secret: process.env.NEXT_PUBLIC_NEXT_AUTH_SECRET,
  callbacks: {
    async signIn({ account, profile }) {
      if (account.type === "oauth") {
        const data = {
          name: profile.name,
          email: profile.email,
          password: crypto.randomBytes(4).toString("hex"),
          image: profile.picture
        }
        try {
          await axios({
            method: "post",
            url: process.env.NEXT_PUBLIC_ENDPOINT + "/api/user",
            data: data
          })
          return true;
        } catch (error) {
          return true;
        }
      }
      return true;
    },
    jwt: ({ token, user }) => {
      if (user) {
        token['role'] = user.role;
      }
      return token
    },
    session: ({ token, session }) => {
      if (token) {
        session.user.role = token.role
      }
      return session
    }
  },

  pages: {
    signIn: "/login"
  },
  session: {
    jwt: true
  }
})

export { handler as GET, handler as POST }
