'use client'
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
import { Home, FileText, Bookmark, LogOut, User, Download, Calendar, Settings, Users, TrendingUp, Trophy, Loader2, BarChart3, Clock, Award, Zap, Activity } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import DoughnutChart from '@/components/DoughnutChart'
import Footer from '@/components/Footer'
import Link from 'next/link'

interface InterviewData {
    id: string
    date: string
    position: string
    score: number
    selected: boolean
    data: unknown
}

const Dashboard = () => {
    const { data: session } = useSession()
    const [interviewHistory, setInterviewHistory] = useState<InterviewData[]>([])
    const [isAdmin, setIsAdmin] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [stats] = useState({ completed: 0, failed: 0, saved: 0 })

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true)
            
            // Simulate loading delay for better UX
            await new Promise(resolve => setTimeout(resolve, 800))
            
            // Load interview history from localStorage
            const history: InterviewData[] = []
            let completed = 0, failed = 0
            const saved = Math.floor(Math.random() * 10)
            
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i)
                if (key?.startsWith('interview_')) {
                    try {
                        const data = JSON.parse(localStorage.getItem(key) || '{}')
                        const interview = {
                            id: key.replace('interview_', ''),
                            date: data.date || new Date().toISOString(),
                            position: data.position || 'Unknown Position',
                            score: data.technicalRound?.score || 0,
                            selected: data.finalDecision?.selected || false,
                            data: data
                        }
                        history.push(interview)
                        
                        // Calculate stats
                        if (interview.selected) completed++
                        else failed++
                    } catch {
                        // Ignore parsing errors
                    }
                }
            }
            
            setInterviewHistory(history.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
            setStats({ completed, failed, saved })
            
            // Check if user is admin
            setIsAdmin(session?.user?.username === 'AdminDev' || session?.user?.email === 'AdminDev')
            setIsLoading(false)
        }
        
        if (session !== undefined) {
            loadData()
        }
    }, [session])

    const downloadReport = (interviewData: InterviewData) => {
        const printWindow = window.open('', '_blank')
        const htmlContent = `
            <html>
            <head>
                <title>Interview Report</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    .header { text-align: center; margin-bottom: 30px; }
                    .score-card { border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 5px; }
                    .selected { background-color: #d4edda; }
                    .rejected { background-color: #f8d7da; }
                    .section { margin: 20px 0; }
                    ul { margin: 10px 0; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>Interview Report</h1>
                    <p>Date: ${new Date(interviewData.date).toLocaleDateString()}</p>
                    <p>Position: ${interviewData.position}</p>
                </div>
                
                <div class="score-card ${interviewData.selected ? 'selected' : 'rejected'}">
                    <h2>Final Decision: ${interviewData.selected ? 'SELECTED' : 'NOT SELECTED'}</h2>
                    <p>${interviewData.data.finalDecision?.message || 'No message available'}</p>
                </div>
                
                <div class="section">
                    <h3>Scores</h3>
                    <p>Technical: ${interviewData.data.technicalRound?.score || 0}%</p>
                    <p>Coding: ${interviewData.data.codingRound?.functionalityScore || 0}%</p>
                    <p>Communication: ${interviewData.data.personalityRound?.communicationScore || 0}%</p>
                </div>
                
                <div class="section">
                    <h3>Strengths</h3>
                    <ul>
                        ${interviewData.data.report?.strengths?.map(s => `<li>${s}</li>`).join('') || '<li>No strengths recorded</li>'}
                    </ul>
                </div>
                
                <div class="section">
                    <h3>Areas for Improvement</h3>
                    <ul>
                        ${interviewData.data.report?.weaknesses?.map(w => `<li>${w}</li>`).join('') || '<li>No weaknesses recorded</li>'}
                    </ul>
                </div>
            </body>
            </html>
        `
        printWindow.document.write(htmlContent)
        printWindow.document.close()
        printWindow.print()
    }

    if (isAdmin) {
        return (
            <div className="min-h-screen bg-gray-950 text-white">
                <SidebarProvider>
                    <Sidebar className="bg-gray-950 border-gray-800">
                        <SidebarHeader className="p-4 border-b border-gray-800 bg-gray-950">
                            <h2 className="text-lg font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                                Admin Panel
                            </h2>
                        </SidebarHeader>
                        <SidebarContent className="bg-gray-950">
                            <SidebarGroup>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton className="hover:bg-gray-800 text-gray-300 hover:text-white">
                                            <Home className="w-4 h-4" />
                                            <span>Dashboard</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton className="hover:bg-gray-800 text-gray-300 hover:text-white">
                                            <Users className="w-4 h-4" />
                                            <span>User Management</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton className="hover:bg-gray-800 text-gray-300 hover:text-white">
                                            <TrendingUp className="w-4 h-4" />
                                            <span>Analytics</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton className="hover:bg-gray-800 text-gray-300 hover:text-white">
                                            <Settings className="w-4 h-4" />
                                            <span>System Settings</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroup>
                        </SidebarContent>
                    </Sidebar>
                    <SidebarInset className="bg-gray-950">
                        <div className="p-6 space-y-8">
                            <div className="bg-gradient-to-r from-red-900/50 to-orange-900/50 backdrop-blur-sm border border-red-800 rounded-2xl p-6 mb-8">
                                <SidebarTrigger className="text-white hover:bg-gray-800 p-2 rounded-lg mb-4" />
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-2">
                                    Admin Dashboard
                                </h1>
                                <p className="text-gray-400">System overview and management</p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 border border-blue-400/30 rounded-2xl p-6">
                                    <Users className="w-8 h-8 text-blue-400 mb-3" />
                                    <h3 className="text-2xl font-bold text-white">1,247</h3>
                                    <p className="text-gray-400">Total Users</p>
                                </div>
                                <div className="bg-gradient-to-br from-green-900/30 to-green-800/30 border border-green-400/30 rounded-2xl p-6">
                                    <FileText className="w-8 h-8 text-green-400 mb-3" />
                                    <h3 className="text-2xl font-bold text-white">3,891</h3>
                                    <p className="text-gray-400">Interviews Conducted</p>
                                </div>
                                <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 border border-purple-400/30 rounded-2xl p-6">
                                    <TrendingUp className="w-8 h-8 text-purple-400 mb-3" />
                                    <h3 className="text-2xl font-bold text-white">73%</h3>
                                    <p className="text-gray-400">Success Rate</p>
                                </div>
                                <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/30 border border-yellow-400/30 rounded-2xl p-6">
                                    <Trophy className="w-8 h-8 text-yellow-400 mb-3" />
                                    <h3 className="text-2xl font-bold text-white">156</h3>
                                    <p className="text-gray-400">Active Today</p>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                                    <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                            <span className="text-gray-300">New user registered: john@example.com</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                            <span className="text-gray-300">Interview completed: Frontend Developer</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                                            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                            <span className="text-gray-300">System backup completed</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                                    <h3 className="text-xl font-bold text-white mb-4">System Health</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-400">CPU Usage</span>
                                                <span className="text-green-400">23%</span>
                                            </div>
                                            <div className="w-full bg-gray-800 rounded-full h-2">
                                                <div className="bg-green-400 h-2 rounded-full" style={{ width: '23%' }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-400">Memory</span>
                                                <span className="text-yellow-400">67%</span>
                                            </div>
                                            <div className="w-full bg-gray-800 rounded-full h-2">
                                                <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '67%' }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-400">Storage</span>
                                                <span className="text-blue-400">45%</span>
                                            </div>
                                            <div className="w-full bg-gray-800 rounded-full h-2">
                                                <div className="bg-blue-400 h-2 rounded-full" style={{ width: '45%' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SidebarInset>
                </SidebarProvider>
            </div>
        )
    }
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
                                    <SidebarMenuButton asChild className="hover:bg-gray-800 text-gray-300 hover:text-white">
                                        <Link href="/dashboard">
                                            <Home className="w-4 h-4" />
                                            <span>Dashboard</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild className="hover:bg-purple-800 text-gray-300 hover:text-white">
                                        <Link href="/interview/CreateInterview">
                                            <FileText className="w-4 h-4" />
                                            <span>Start Interview</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton className="hover:bg-gray-800 text-gray-300 hover:text-white cursor-pointer">
                                        <Bookmark className="w-4 h-4" />
                                        <span>Interview History</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild className="hover:bg-gray-800 text-gray-300 hover:text-white">
                                        <Link href="/about">
                                            <Home className="w-4 h-4" />
                                            <span>About</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                {(session?.user?.username === 'AdminDev' || session?.user?.email === 'AdminDev') && (
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild className="hover:bg-red-800 text-gray-300 hover:text-white">
                                            <Link href="/admin">
                                                <Settings className="w-4 h-4" />
                                                <span>Admin Panel</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )}
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
                        <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 mb-8 shadow-2xl">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <SidebarTrigger className="text-white hover:bg-gray-800 p-2 rounded-lg" />
                                    <div>
                                        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
                                            Welcome Back!
                                        </h1>
                                        <p className="text-gray-400 mt-1">Ready to practice your interview skills?</p>
                                    </div>
                                </div>
                                <Link href="/interview/CreateInterview" className="bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600 px-8 py-4 rounded-2xl text-white font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-purple-500/25 text-center">
                                    ✨ Start Interview
                                </Link>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            <Link href="/interview/CreateInterview" className="group relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-slate-700/50 rounded-2xl p-6 text-center hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-purple-500/20 hover:border-purple-500/50 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative z-10">
                                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-500/30 transition-all group-hover:scale-110">
                                        <Zap className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <h3 className="text-white font-semibold mb-1 group-hover:text-purple-300 transition-colors">New Interview</h3>
                                    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">Start fresh interview</p>
                                </div>
                            </Link>
                            
                            <div className="group relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-slate-700/50 rounded-2xl p-6 text-center hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-teal-500/20 hover:border-teal-500/50 cursor-pointer overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative z-10">
                                    <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-teal-500/30 transition-all group-hover:scale-110">
                                        <BarChart3 className="w-6 h-6 text-teal-400" />
                                    </div>
                                    <h3 className="text-white font-semibold mb-1 group-hover:text-teal-300 transition-colors">Analytics</h3>
                                    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">View performance</p>
                                </div>
                            </div>
                            
                            <div className="group relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-slate-700/50 rounded-2xl p-6 text-center hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-blue-500/20 hover:border-blue-500/50 cursor-pointer overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative z-10">
                                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-500/30 transition-all group-hover:scale-110">
                                        <Clock className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <h3 className="text-white font-semibold mb-1 group-hover:text-blue-300 transition-colors">History</h3>
                                    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">Past interviews</p>
                                </div>
                            </div>
                            
                            <div className="group relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-slate-700/50 rounded-2xl p-6 text-center hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-amber-500/20 hover:border-amber-500/50 cursor-pointer overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative z-10">
                                    <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-amber-500/30 transition-all group-hover:scale-110">
                                        <Settings className="w-6 h-6 text-amber-400" />
                                    </div>
                                    <h3 className="text-white font-semibold mb-1 group-hover:text-amber-300 transition-colors">Settings</h3>
                                    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">Preferences</p>
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Statistics Section */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 mb-8">
                            {/* Doughnut Chart */}
                            <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
                                {isLoading ? (
                                    <div className="flex items-center justify-center h-64">
                                        <div className="flex flex-col items-center gap-4">
                                            <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
                                            <p className="text-gray-400 text-sm">Loading analytics...</p>
                                        </div>
                                    </div>
                                ) : (
                                    <DoughnutChart completed={stats.completed} failed={stats.failed} saved={stats.saved} />
                                )}
                            </div>

                            {/* Enhanced Statistics Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-4">
                                {isLoading ? (
                                    Array.from({ length: 3 }).map((_, i) => (
                                        <div key={i} className="bg-slate-900/80 border border-slate-700/50 rounded-2xl p-6 text-center animate-pulse">
                                            <div className="w-16 h-16 bg-slate-700 rounded-xl mx-auto mb-4"></div>
                                            <div className="h-8 bg-slate-700 rounded mb-2"></div>
                                            <div className="h-4 bg-slate-700 rounded mb-3"></div>
                                            <div className="h-2 bg-slate-700 rounded"></div>
                                        </div>
                                    ))
                                ) : (
                                    <>
                                        <div className="group bg-slate-900/80 border border-slate-700/50 rounded-2xl p-6 text-center hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-emerald-500/20 hover:border-emerald-500/50">
                                            <div className="w-16 h-16 bg-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-500/30 transition-all group-hover:scale-110">
                                                <Award className="w-8 h-8 text-emerald-400" />
                                            </div>
                                            <div className="text-3xl sm:text-4xl font-bold text-emerald-400 mb-2 group-hover:text-emerald-300 transition-colors">{stats.completed}</div>
                                            <div className="text-gray-300 font-medium group-hover:text-gray-200 transition-colors">Completed Interviews</div>
                                            <div className="w-full bg-slate-800 rounded-full h-2 mt-3 overflow-hidden">
                                                <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full transition-all duration-1000" style={{ width: `${Math.min((stats.completed / (stats.completed + stats.failed)) * 100, 100)}%` }} />
                                            </div>
                                        </div>
                                        <div className="group bg-slate-900/80 border border-slate-700/50 rounded-2xl p-6 text-center hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-red-500/20 hover:border-red-500/50">
                                            <div className="w-16 h-16 bg-red-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-red-500/30 transition-all group-hover:scale-110">
                                                <Activity className="w-8 h-8 text-red-400" />
                                            </div>
                                            <div className="text-3xl sm:text-4xl font-bold text-red-400 mb-2 group-hover:text-red-300 transition-colors">{stats.failed}</div>
                                            <div className="text-gray-300 font-medium group-hover:text-gray-200 transition-colors">Need Improvement</div>
                                            <div className="w-full bg-slate-800 rounded-full h-2 mt-3 overflow-hidden">
                                                <div className="bg-gradient-to-r from-red-500 to-red-400 h-2 rounded-full transition-all duration-1000" style={{ width: `${Math.min((stats.failed / (stats.completed + stats.failed)) * 100, 100)}%` }} />
                                            </div>
                                        </div>
                                        <div className="group bg-slate-900/80 border border-slate-700/50 rounded-2xl p-6 text-center hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-blue-500/20 hover:border-blue-500/50">
                                            <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/30 transition-all group-hover:scale-110">
                                                <Bookmark className="w-8 h-8 text-blue-400" />
                                            </div>
                                            <div className="text-3xl sm:text-4xl font-bold text-blue-400 mb-2 group-hover:text-blue-300 transition-colors">{stats.saved}</div>
                                            <div className="text-gray-300 font-medium group-hover:text-gray-200 transition-colors">Saved Drafts</div>
                                            <div className="w-full bg-slate-800 rounded-full h-2 mt-3 overflow-hidden">
                                                <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full transition-all duration-1000" style={{ width: `${Math.min((stats.saved / 10) * 100, 100)}%` }} />
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Quick Start Section */}
                        <div className="bg-gradient-to-r from-purple-900/30 to-teal-900/30 border border-purple-400/30 rounded-2xl p-8 mb-8 text-center">
                            <h2 className="text-3xl font-bold text-white mb-4">🚀 Ready for Your Next Interview?</h2>
                            <p className="text-gray-300 mb-6">Start practicing with AI-powered mock interviews tailored to your field</p>
                            <Link href="/interview/CreateInterview" className="inline-block bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600 px-8 py-4 rounded-xl text-white font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-purple-500/25">
                                ✨ Start New Interview
                            </Link>
                        </div>

                        {/* Interview History Section */}
                        <div className="bg-slate-900/80 border border-slate-700/50 rounded-2xl p-6 shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                    <Calendar className="w-5 h-5 text-purple-400" />
                                </div>
                                Interview History
                            </h2>
                            {isLoading ? (
                                <div className="space-y-4">
                                    {Array.from({ length: 3 }).map((_, i) => (
                                        <div key={i} className="bg-slate-800/50 rounded-xl p-4 animate-pulse">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-3 h-3 bg-slate-600 rounded-full"></div>
                                                    <div>
                                                        <div className="h-4 bg-slate-600 rounded w-32 mb-2"></div>
                                                        <div className="h-3 bg-slate-600 rounded w-24"></div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="h-6 bg-slate-600 rounded-full w-20"></div>
                                                    <div className="w-8 h-8 bg-slate-600 rounded-lg"></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : interviewHistory.length > 0 ? (
                                <div className="space-y-3">
                                    {interviewHistory.slice(0, 5).map((interview) => (
                                        <div key={interview.id} className="group bg-slate-800/50 hover:bg-slate-800/80 rounded-xl p-4 transition-all duration-300 hover:scale-[1.01] border border-transparent hover:border-slate-600/50">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-3 h-3 rounded-full transition-all duration-300 group-hover:scale-125 ${
                                                        interview.selected ? 'bg-emerald-400 shadow-emerald-400/50 shadow-lg' : 'bg-red-400 shadow-red-400/50 shadow-lg'
                                                    }`}></div>
                                                    <div>
                                                        <h3 className="text-white font-semibold group-hover:text-gray-100 transition-colors">{interview.position}</h3>
                                                        <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                                                            {new Date(interview.date).toLocaleDateString()} • Score: {interview.score}%
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
                                                        interview.selected 
                                                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                                                            : 'bg-red-500/20 text-red-300 border border-red-500/30'
                                                    }`}>
                                                        {interview.selected ? 'Selected' : 'Not Selected'}
                                                    </span>
                                                    <button 
                                                        onClick={() => downloadReport(interview)}
                                                        className="p-2.5 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-all duration-300 border border-blue-500/30 hover:border-blue-500/50 hover:scale-110 group/btn"
                                                    >
                                                        <Download className="w-4 h-4 text-blue-400 group-hover/btn:text-blue-300 transition-colors" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-slate-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <FileText className="w-8 h-8 text-slate-500" />
                                    </div>
                                    <p className="text-gray-400 mb-4">No interviews completed yet</p>
                                    <Link href="/interview/CreateInterview" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors font-medium">
                                        Start your first interview
                                        <Zap className="w-4 h-4" />
                                    </Link>
                                </div>
                            )}
                        </div>
                        <Footer />
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </div>
    )
}

export default Dashboard