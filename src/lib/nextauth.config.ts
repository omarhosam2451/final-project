import { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const nextAuthConfig: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_key_for_vercel_deployments",
  trustHost: true,

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  providers: [
    Credentials({
      name: "frash cart",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })

        const finalRes = await res.json()
        console.log("Auth API Response:", finalRes)

        if (res.ok && finalRes.token && finalRes.user) {
          return {
            id: finalRes.user._id?.toString() || finalRes.user.email,
            name: finalRes.user.name,       
            email: finalRes.user.email,
            realTokenFromBackEnd: finalRes.token,  
          }
        }

        return null
      },
    }),
  ],

  callbacks: {
    jwt(params) {
      if(params.user){
        params.token.realTokenFromBackEnd = (params.user as any).realTokenFromBackEnd
      }
      return params.token   
    },

    session({ session, token }) {
      (session as any).realTokenFromBackEnd = token.realTokenFromBackEnd
      session.user = {
        name: token.name,
        email: token.email,
      }
      return session
    },
  },
}

export default nextAuthConfig