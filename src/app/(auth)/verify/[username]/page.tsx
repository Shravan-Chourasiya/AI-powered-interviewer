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
        // copilot styling
        // <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
        //     <div className="w-full max-w-md space-y-8 p-8 bg-white shadow-lg rounded-xl">
        //         <div className="text-center space-y-2">
        //             <h1 className="text-2xl font-bold text-gray-800">SyntheView – AI Interviewer</h1>
        //             <p className="text-sm text-gray-600">Sign In To Take a Free Mock Interview</p>
        //         </div>
        //         <div>
        //             <Form {...form}>
        //                 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        //                     <FormField
        //                         name="code"
        //                         control={form.control}
        //                         render={({ field }) => (
        //                             <FormItem>
        //                                 <FormLabel className="text-sm font-medium text-gray-700">Verification Code</FormLabel>
        //                                 <FormControl>
        //                                     <Input
        //                                         placeholder="Verification Code ..."
        //                                         {...field}
        //                                         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        //                                     />
        //                                 </FormControl>
        //                                 <FormMessage className="text-sm text-red-500" />
        //                             </FormItem>
        //                         )}
        //                     />
        //                 </form>
        //             </Form>
        //         </div>
        //     </div>
        // </div>

        //claude styling 
        // <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        //     <div className="w-full max-w-md space-y-8 p-8 bg-white shadow-2xl rounded-2xl border border-gray-100">
        //         <div className="text-center space-y-3">
        //             <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
        //                 SyntheView
        //             </h1>
        //             <div className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full inline-block">
        //                 AI Interviewer
        //             </div>
        //             <p className="text-gray-600 text-sm leading-relaxed">
        //                 Sign In To Take a Free Mock Interview
        //             </p>
        //         </div>

        //         <div className="pt-4">
        //             <Form {...form}>
        //                 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        //                     <FormField
        //                         name="code"
        //                         control={form.control}
        //                         render={({ field }) => (
        //                             <FormItem className="space-y-2">
        //                                 <FormLabel className="text-sm font-medium text-gray-700">
        //                                     Verification Code
        //                                 </FormLabel>
        //                                 <FormControl>
        //                                     <Input
        //                                         placeholder="Enter verification code..."
        //                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 placeholder-gray-400"
        //                                         {...field}
        //                                     />
        //                                 </FormControl>
        //                                 <FormMessage className="text-sm text-red-600" />
        //                             </FormItem>
        //                         )}
        //                     />

        //                     <button
        //                         type="submit"
        //                         className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-lg hover:shadow-xl"
        //                     >
        //                         Verify & Continue
        //                     </button>
        //                 </form>
        //             </Form>
        //         </div>

        //         <div className="text-center pt-4 border-t border-gray-100">
        //             <p className="text-xs text-gray-500">
        //                 Need help? <span className="text-indigo-600 hover:text-indigo-700 cursor-pointer font-medium">Contact Support</span>
        //             </p>
        //         </div>
        //     </div>
        // </div>


        //My initial Styling  
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md space-y-8 p-8 shadow-md rounded-lg">
                <div>
                    <h1>SyntheView - AI Interviewer </h1>
                    <p>{`Sign In To Take a Free Mock Interview`}</p>
                </div>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                name="code"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Verification Code</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Verification Code ..." {...field} />
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
                </div>
            </div>
        </div>
    )
}
export default VerifyAccount
