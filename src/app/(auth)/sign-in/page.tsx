'use client'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { signInSchema } from "@/schemas/signInSchema"
import { signIn, useSession } from "next-auth/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Loader2Icon } from 'lucide-react'


const SignIn = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  useEffect(() => {
    if (session) {
      router.replace('/homepage')
    }
  }, [session, router])
  
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: ""
    },
  })

  const onSubmit = async (data: z.infer<(typeof signInSchema)>) => {
    setIsSubmitting(true)
    try {
      const result = await signIn('credentials', {
        redirect: false,
        identifier: data.identifier,
        password: data.password
      })
      
      if (result?.error) {
        toast("Failed Signing In user ")
      } else {
        toast("User Signed In Successfully")
      }
      
      if (result?.url) {
        router.replace('/homepage')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-background px-8 py-8">
      <div className="w-full max-w-md space-y-8 p-8 rounded-2xl shadow-2xl border border-border backdrop-blur-sm relative overflow-hidden bg-card">
        
        {/* Animated Background Elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-500/20 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-teal-500/20 rounded-full opacity-10 animate-pulse"></div>
        
        {/* Header Section */}
        <div className="text-center space-y-4 pt-4">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
              SyntheView - AI Interviewer
            </h1>
          </div>
          <p className="text-sm opacity-80 text-muted-foreground">
            Sign In To Take a Free Mock Interview
          </p>
        </div>
        
        {/* Form Section */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Email/Username</FormLabel>
                  <FormControl>
                    <Input 
                      className="bg-input border-border focus:border-primary focus:ring-2 focus:ring-ring text-foreground placeholder-muted-foreground transition-all duration-200 shadow-sm h-12" 
                      placeholder="Email/Username ..." 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Password</FormLabel>
                  <FormControl>
                    <Input 
                      className="bg-input border-border focus:border-primary focus:ring-2 focus:ring-ring text-foreground placeholder-muted-foreground transition-all duration-200 shadow-sm h-12" 
                      type='password' 
                      placeholder="Password ..." 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-4 h-14 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg transform bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2Icon className="animate-spin mr-2 w-5 h-5" />
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                </>
              )}
            </Button>
          </form>
        </Form>
        
        {/* Footer Section */}
        <div className="text-center pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            New User? {' '}
            <Link href="/sign-up" className="font-medium transition-colors duration-200 hover:underline text-purple-400 hover:text-purple-300">
              Click here
            </Link>
            {' '} to Sign Up
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn