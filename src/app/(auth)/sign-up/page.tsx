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
import { signUpSchema } from "@/schemas/signUpSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useDebounceCallback } from 'usehooks-ts'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from "@/types/ApiResponse"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Loader2Icon } from 'lucide-react'
import Link from "next/link"
const SignUp = () => {
    const [username, setUsername] = useState('')
    const [userMsg, setUserMsg] = useState('')
    const [isCheckingUsername, setIsCheckingUsername] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const debounced = useDebounceCallback(setUsername, 900)
    const router = useRouter()
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
    const randomIndex: number = Math.floor(Math.random() * 100);
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
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md space-y-8 p-8 shadow-md rounded-lg">
                <div>
                    <h1>SyntheView - AI Interviewer </h1>
                    <p>{`Register To Take a Free ${techstack[randomIndex]} Mock Interview`}</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Username ..." {...field}
                                            onChange={(e) => {
                                                field.onChange(e)
                                                debounced(e.target.value)
                                            }}
                                        />
                                    </FormControl>
                                    {isCheckingUsername && <Loader2Icon className="animate-spin" />}
                                    <p className={`text-sm ${userMsg === "Username Is Available" ? "text-green-500" : "text-red-700"}`}>{userMsg}</p>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email ..." {...field} />
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
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? (<>
                                <Loader2Icon className="mr-4 h-4 w-4 animate-spin" />Please Wait!
                            </>) : "Sign Up"}
                        </Button>
                    </form>
                </Form>
                <div>
                    <h1>Already Registered ? <Link href="/sign-in" className="text-blue-500 hover:text-blue-900">Click here</Link> To Login</h1>

                </div>
            </div >
        </div>
    )
}

export default SignUp
