'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { verifyCodeSchema } from '@/schemas/verifyCodeSchema'
import { ApiResponse } from '@/types/ApiResponse'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'
import '../../../App.css'

const VerifyAccount = () => {
    const router = useRouter()
    const params = useParams()
    const form = useForm<z.infer<typeof verifyCodeSchema>>({
        resolver: zodResolver(verifyCodeSchema),
    })

    const onSubmit = async (data: z.infer<typeof verifyCodeSchema>) => {
        try {
            const response = await axios.post(`/api/verify-code`, {
                username: params.username, code: data.code
            })
            toast(response.data.message)
            router.replace('/sign-in')
        } catch (error) {
            console.error("Error Signing Up User : ", error)
            const axiosErr = error as AxiosError<ApiResponse>
            const errorMsg = axiosErr.response?.data.message
            toast(errorMsg)
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
                        Enter the verification code sent to your email
                    </p>
                </div>
                
                {/* Form Section */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            name="code"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="dark-form-label">Verification Code</FormLabel>
                                    <FormControl>
                                        <Input 
                                            className="bg-gray-800/50 border-gray-700 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 text-white placeholder-gray-400 transition-all duration-200"
                                            placeholder="Enter 6-digit code..." 
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
                            Verify Account
                            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}
export default VerifyAccount
