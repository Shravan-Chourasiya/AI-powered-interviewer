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
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:bg-gray-950 px-4 py-8">
            <div className="w-full max-w-md space-y-6 sm:space-y-8 p-6 sm:p-8 rounded-2xl shadow-2xl border border-slate-200 dark:border-gray-800 backdrop-blur-sm relative overflow-hidden bg-white dark:bg-gray-900">
                
                {/* Animated Background Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 sm:w-24 sm:h-24 bg-purple-500/20 dark:bg-purple-500/10 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 w-24 h-24 sm:w-32 sm:h-32 bg-teal-500/20 dark:bg-teal-500/10 rounded-full opacity-10 animate-pulse"></div>
                
                {/* Header Section */}
                <div className="text-center space-y-3 pt-2 sm:pt-4">
                    <div className="flex items-center justify-center space-x-2 mb-3 sm:mb-4">
                        <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
                            SyntheView - AI Interviewer
                        </h1>
                    </div>
                    <p className="text-sm opacity-80 text-slate-600 dark:text-gray-400 px-2">
                        Enter the verification code sent to your email
                    </p>
                </div>
                
                {/* Form Section */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
                        <FormField
                            name="code"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-700 dark:text-gray-300 text-sm sm:text-base">Verification Code</FormLabel>
                                    <FormControl>
                                        <Input 
                                            className="bg-white dark:bg-gray-800/50 border-slate-300 dark:border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 dark:focus:ring-purple-400/20 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-gray-400 transition-all duration-200 shadow-sm h-12 text-base text-center tracking-widest"
                                            placeholder="Enter 6-digit code..." 
                                            {...field} 
                                            maxLength={6}
                                            style={{ fontSize: '16px' }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button 
                            type="submit" 
                            className="w-full py-4 h-14 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg transform bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600 text-white touch-manipulation"
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
