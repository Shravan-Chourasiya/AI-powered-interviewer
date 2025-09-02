import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarProvider,
    SidebarInset,
    SidebarTrigger
} from '@/components/ui/sidebar'
import { Home, FileText, Bookmark, LogOut, User, CheckCircle, XCircle } from 'lucide-react'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/api/auth/[...nextauth]/providers'
import React from 'react'
import DoughnutChart from '@/components/DoughnutChart'
import Footer from '@/components/Footer'
import Downlodables from '@/components/Downlodables'
import '../App.css'

const page = async () => {
    const session = await getServerSession(authOptions)

    const answerKeys = [
        { srno: 1, fieldname: 'Frontend Developer' },
        { srno: 2, fieldname: 'Backend Developer' }
    ]

    const analysisReports = [
        { srno: 1, fieldname: 'Performance Report' },
        { srno: 2, fieldname: 'Improvement Areas' }
    ]
    return (
        <div className="min-h-screen bg-gray-950 text-white">
            <SidebarProvider>
                <Sidebar className="bg-gray-950 border-gray-800">
                    <SidebarHeader className="p-4 border-b border-gray-800 bg-gray-950">
                        <h2 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
                            SyntheView
                        </h2>
                    </SidebarHeader>
                    <SidebarContent className="bg-gray-950">
                        <SidebarGroup>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton className="hover:bg-gray-800 text-gray-300 hover:text-white">
                                        <Home className="w-4 h-4" />
                                        <span>Home</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton className="hover:bg-gray-800 text-gray-300 hover:text-white">
                                        <Home className="w-4 h-4" />
                                        <span>Dashboard</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton className="hover:bg-gray-800 text-gray-300 hover:text-white">
                                        <FileText className="w-4 h-4" />
                                        <span>Completed Interviews</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton className="hover:bg-gray-800 text-gray-300 hover:text-white">
                                        <Bookmark className="w-4 h-4" />
                                        <span>Saved Interviews</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton className="hover:bg-red-900 text-gray-300 hover:text-white">
                                        <LogOut className="w-4 h-4" />
                                        <span>Log Out</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroup>
                    </SidebarContent>
                    <SidebarFooter className="p-4 border-t border-gray-800 bg-gray-950">
                        <div className="flex items-center gap-2 p-2 rounded-md border border-gray-700 bg-gray-900">
                            <User className="w-8 h-8 p-1 rounded-full bg-gradient-to-r from-purple-400 to-teal-400 text-white" />
                            <span className="text-sm text-gray-300">{session?.user?.username || session?.user?.email || 'User'}</span>
                        </div>
                    </SidebarFooter>
                </Sidebar>
                <SidebarInset className="bg-gray-950">
                    <div className="p-6 space-y-8">
                        <div className="flex items-center gap-4 mb-8">
                            <SidebarTrigger className="text-white hover:bg-gray-800" />
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
                                Dashboard
                            </h1>
                        </div>

                        {/* Statistics Section */}
                        <div className="grid lg:grid-cols-2 gap-8 mb-8">
                            {/* Doughnut Chart */}
                            <DoughnutChart completed={7} failed={45} saved={5} />

                            {/* Statistics Cards */}
                            <div className="space-y-4">
                                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center hover:border-green-400 transition-all duration-300">
                                    <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                                    <div className="text-3xl font-bold text-green-400 mb-2">7</div>
                                    <div className="text-gray-300">Completed</div>
                                </div>
                                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center hover:border-red-400 transition-all duration-300">
                                    <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                                    <div className="text-3xl font-bold text-red-400 mb-2">45</div>
                                    <div className="text-gray-300">Failed</div>
                                </div>
                                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center hover:border-blue-400 transition-all duration-300">
                                    <Bookmark className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                                    <div className="text-3xl font-bold text-blue-400 mb-2">5</div>
                                    <div className="text-gray-300">Saved</div>
                                </div>
                            </div>
                        </div>

                        {/* Downloads Section */}
                        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                            <h2 className="text-2xl font-bold text-white mb-6">Interview Resources</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-gray-800 rounded-lg p-4">
                                    <h3 className="text-lg font-semibold text-white mb-4">Answer Keys</h3>
                                    <table className="w-full" style={{borderSpacing: '0 12px'}}>
                                        <tbody>
                                            {answerKeys.map((item) => (
                                                <tr key={item.srno} className="mb-3">
                                                    <Downlodables srno={item.srno} fieldname={item.fieldname} />
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                
                                <div className="bg-gray-800 rounded-lg p-4">
                                    <h3 className="text-lg font-semibold text-white mb-4">Interview Analysis</h3>
                                    <table className="w-full" style={{borderSpacing: '0 12px'}}>
                                        <tbody>
                                            {analysisReports.map((item) => (
                                                <tr key={item.srno} className="mt-4 mb-3">
                                                    <Downlodables srno={item.srno} fieldname={item.fieldname} />
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </div>
    )
}

export default page