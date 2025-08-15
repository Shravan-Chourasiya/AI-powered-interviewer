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
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md space-y-8 p-8 shadow-md rounded-lg">
        <div>
          <h1>SyntheView - AI Interviewer </h1>
          <p>{`Sign In To Take a Free Mock Interview`}</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Email/Username ..." {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder="Password ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" >
              Sign In
            </Button>
          </form>
        </Form>
        <div>
          <h1>New User ? <Link href="/sign-up" className="text-blue-500 hover:text-blue-900">Click here</Link> To Sign Up</h1>

        </div>
      </div >
    </div>
  )
}

export default SignIn
