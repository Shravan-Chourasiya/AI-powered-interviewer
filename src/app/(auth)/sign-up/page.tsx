'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signUpSchema } from "@/schemas/signUpSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { useEffect, useState, useMemo } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useDebounceCallback } from 'usehooks-ts'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from "@/types/ApiResponse"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Loader2Icon } from 'lucide-react'
import { useSession } from "next-auth/react"
import Link from "next/link"


const SignUp = () => {
    const [username, setUsername] = useState('')
    const [userMsg, setUserMsg] = useState('')
    const [isCheckingUsername, setIsCheckingUsername] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const debounced = useDebounceCallback(setUsername, 900)
    const router = useRouter()
    const { data: session } = useSession()
    
    useEffect(() => {
        if (session) {
            router.replace('/homepage')
        }
    }, [session, router])

    const techstack: string[] = [
        "Data Scientist",
        "Machine Learning Engineer",
        "Backend Developer (Python)",
        "Automation Engineer",
        "AI Researcher",
        "Frontend Developer",
        "Full-Stack Developer",
        "React Developer",
        "Angular Developer",
        "Node.js Developer",
        "Android Developer",
        "Backend Developer (Java)",
        "Enterprise Software Engineer",
        "Spring Boot Developer",
        "Game Developer",
        "Embedded Systems Engineer",
        "Software Engineer (C++)",
        "Quant Developer",
        "Systems Programmer",
        "Blockchain Developer (Rust)",
        "Security Engineer",
        "Cloud Infrastructure Engineer",
        "DevOps Engineer (Go)",
        "Backend Developer (Go)",
        "Frontend Developer (TypeScript)",
        "Full-Stack Developer (TypeScript)",
        "React/Angular Developer",
        "Database Administrator",
        "Data Analyst",
        "BI Developer",
        "Web Developer (PHP)",
        "WordPress Developer",
        "Backend Developer (PHP)",
        "Android Developer (Kotlin)",
        "Mobile App Developer (Kotlin)",
        "iOS Developer",
        "Mobile App Developer (Swift)",
        "Blockchain Developer (Solidity)",
        "Smart Contract Engineer",
        "Web Developer (Ruby)",
        "Ruby on Rails Developer",
        "Flutter Developer",
        "Mobile App Developer (Dart)",
        "Simulation Engineer",
        "Control Systems Engineer",
        "Data Scientist (MATLAB)",
        "Backend Developer (Elixir)",
        "Real-time Systems Engineer",
        "Big Data Engineer",
        "Backend Developer (Scala)",
        "Data Engineer",
        "Functional Programmer",
        "Backend Developer (Clojure)",
        "Telecom Systems Engineer",
        "Distributed Systems Developer",
        "Full-Stack Developer (MEAN)",
        "Full-Stack Developer (MERN)",
        "Web Application Developer",
        "Cloud Solutions Architect",
        "Site Reliability Engineer (SRE)",
        "AI Prompt Engineer",
        "DevSecOps Engineer",
        "Cybersecurity Analyst",
        "Penetration Tester",
        "Ethical Hacker",
        "IoT Developer",
        "AR/VR Developer",
        "Unity Developer",
        "Unreal Engine Developer",
        "Data Governance Specialist",
        "ML Ops Engineer",
        "Data Warehouse Engineer",
        "ETL Developer",
        "CRM Developer (Salesforce)",
        "ERP Consultant (SAP)",
        "Technical Product Manager",
        "Software QA Engineer",
        "Test Automation Engineer",
        "Performance Engineer",
        "Accessibility Engineer",
        "UX Engineer",
        "Technical Writer",
        "Open Source Contributor"
    ];

    const selectedTechStack = useMemo(() => {
        const randomIndex = Math.floor(Math.random() * techstack.length);
        return techstack[randomIndex];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        const checkUsernameUnique = async () => {
            if (username) {
                setIsCheckingUsername(true)
                setUserMsg('')
                try {
                    const response = await axios.get(`/api/username-unique?username=${username}`)
                    setUserMsg(response.data.message)
                } catch (error) {
                    const axiosErr = error as AxiosError<ApiResponse>
                    console.error(axiosErr)
                    setUserMsg(axiosErr.response?.data.message ?? "Error Checking Username Availability!")
                } finally {
                    setIsCheckingUsername(false)
                }
            }
        }
        checkUsernameUnique()
    }, [username])

    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: "",
            email: "",
            password: ""
        },
    })

    const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
        setIsSubmitting(true)
        setUserMsg('')
        try {
            const response = await axios.post(`/api/sign-up`, data)
            toast(response.data.message)
            router.replace(`/verify/${username}`)
        } catch (error) {
            console.error("Error Signing Up User : ", error)
            const axiosErr = error as AxiosError<ApiResponse>
            const errorMsg = axiosErr.response?.data.message
            toast(errorMsg)
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
                        Register To Take a Free {selectedTechStack} Mock Interview
                    </p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-foreground">Username</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type="text" 
                                            className="bg-input border-border focus:border-primary focus:ring-2 focus:ring-ring text-foreground placeholder-muted-foreground transition-all duration-200 shadow-sm h-12"
                                            placeholder="Username ..." 
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e)
                                                debounced(e.target.value)
                                            }}
                                        />
                                    </FormControl>
                                    {isCheckingUsername && <Loader2Icon className="animate-spin text-purple-400 w-4 h-4" />}
                                    <p className={`text-sm ${userMsg === "Username Is Available" ? "text-green-400" : "text-red-400"}`}>{userMsg}</p>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-foreground">Email</FormLabel>
                                    <FormControl>
                                        <Input 
                                            className="bg-input border-border focus:border-primary focus:ring-2 focus:ring-ring text-foreground placeholder-muted-foreground transition-all duration-200 shadow-sm h-12"
                                            placeholder="Email ..." 
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
                                            type='password' 
                                            className="bg-input border-border focus:border-primary focus:ring-2 focus:ring-ring text-foreground placeholder-muted-foreground transition-all duration-200 shadow-sm h-12"
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
                            {isSubmitting ? (<>
                                <Loader2Icon className="animate-spin mr-2 w-5 h-5" />
                                Signing Up...
                            </>) : (
                                <>
                                    Sign Up
                                    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                                </>
                            )}
                        </Button>
                    </form>
                </Form>
                
                {/* Footer Section */}
                <div className="text-center pt-6 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                        Already have an account? {' '}
                        <Link href="/sign-in" className="font-medium transition-colors duration-200 hover:underline text-purple-400 hover:text-purple-300">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUp