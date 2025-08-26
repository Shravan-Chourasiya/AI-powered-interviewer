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
import { signIn } from "next-auth/react"
import Link from "next/link"
import '../../App.css'

const SignIn = () => {
  const router = useRouter()
  
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: ""
    },
  })

  const onSubmit = async (data: z.infer<(typeof signInSchema)>) => {
    const result = await signIn('credentials', {
      redirect: false,
      identifier: data.identifier,
      password: data.password
    })
    
    if (result?.error) {
      toast("Failed Signing In user ")
    } else (
      toast("User Signed In Successfully")
    )
    
    if (result?.url) {
      router.replace('/dashboard')
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen dark-main-container">
      <div className="w-full max-w-md space-y-8 p-8 rounded-2xl shadow-2xl border border-gray-800 backdrop-blur-sm relative overflow-hidden dark-card-container">
        
        {/* Animated Background Elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-20 animate-pulse dark-top-circle"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-10 animate-pulse dark-bottom-circle"></div>
        
        {/* Header Section */}
        <div className="text-center space-y-3 pt-4">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
              SyntheView - AI Interviewer
            </h1>
          </div>
          <p className="text-sm opacity-80 dark-description">
            {`Sign In To Take a Free Mock Interview`}
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
                  <FormLabel className="dark-form-label">Email/Username</FormLabel>
                  <FormControl>
                    <Input 
                      className="bg-gray-800/50 border-gray-700 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 text-white placeholder-gray-400 transition-all duration-200" 
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
                  <FormLabel className="dark-form-label">Password</FormLabel>
                  <FormControl>
                    <Input 
                      className="bg-gray-800/50 border-gray-700 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 text-white placeholder-gray-400 transition-all duration-200" 
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
              className="w-full py-3 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg transform dark-submit-button"
            >
              Sign In
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Button>
          </form>
        </Form>
        
        {/* Footer Section */}
        <div className="text-center pt-4 border-t border-gray-800">
          <h1 className="text-sm dark-footer-text">
            New User ? {' '}
            <Link href="/sign-up" className="font-medium transition-colors duration-200 hover:underline dark-signup-link">
              Click here
            </Link>
            {' '} To Sign Up
          </h1>
        </div>
      </div>
    </div>
  )
}

export default SignIn