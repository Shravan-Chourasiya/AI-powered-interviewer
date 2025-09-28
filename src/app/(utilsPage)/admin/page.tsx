'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Users, FileText, TrendingUp, Home, Shield, Database, Activity, Settings } from 'lucide-react'

export default function AdminDashboard() {
    const { data: session } = useSession()
    const router = useRouter()
    const [stats, setStats] = useState({
        totalUsers: 1247,
        totalInterviews: 3891,
        successRate: 73,
        activeToday: 156
    })

    useEffect(() => {
        // Check if user is admin
        if (session && !(session?.user?.username === 'AdminDev' || session?.user?.email === 'AdminDev')) {
            router.push('/dashboard')
        }
    }, [session, router])

    return (
        <div className="min-h-screen bg-gray-950 text-white p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-red-900/50 to-orange-900/50 backdrop-blur-sm border border-red-800 rounded-2xl p-6 mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <Shield className="w-8 h-8 text-red-400" />
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                            Admin Dashboard
                        </h1>
                    </div>
                    <p className="text-gray-400">System overview and management controls</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 border border-blue-400/30 rounded-2xl p-6 hover:scale-105 transition-all">
                        <Users className="w-8 h-8 text-blue-400 mb-3" />
                        <h3 className="text-3xl font-bold text-white">{stats.totalUsers.toLocaleString()}</h3>
                        <p className="text-gray-400">Total Users</p>
                        <div className="mt-2 text-sm text-green-400">+12% this month</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-900/30 to-green-800/30 border border-green-400/30 rounded-2xl p-6 hover:scale-105 transition-all">
                        <FileText className="w-8 h-8 text-green-400 mb-3" />
                        <h3 className="text-3xl font-bold text-white">{stats.totalInterviews.toLocaleString()}</h3>
                        <p className="text-gray-400">Interviews Conducted</p>
                        <div className="mt-2 text-sm text-green-400">+8% this week</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 border border-purple-400/30 rounded-2xl p-6 hover:scale-105 transition-all">
                        <TrendingUp className="w-8 h-8 text-purple-400 mb-3" />
                        <h3 className="text-3xl font-bold text-white">{stats.successRate}%</h3>
                        <p className="text-gray-400">Success Rate</p>
                        <div className="mt-2 text-sm text-yellow-400">+2% improvement</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/30 border border-yellow-400/30 rounded-2xl p-6 hover:scale-105 transition-all">
                        <Activity className="w-8 h-8 text-yellow-400 mb-3" />
                        <h3 className="text-3xl font-bold text-white">{stats.activeToday}</h3>
                        <p className="text-gray-400">Active Today</p>
                        <div className="mt-2 text-sm text-green-400">Peak: 203 users</div>
                    </div>
                </div>

                {/* Management Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* User Management */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <Users className="w-5 h-5" />
                            User Management
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                                <div>
                                    <p className="text-white font-medium">john.doe@company.com</p>
                                    <p className="text-gray-400 text-sm">Last active: 2 hours ago</p>
                                </div>
                                <span className="px-2 py-1 bg-green-900 text-green-300 rounded text-xs">Active</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                                <div>
                                    <p className="text-white font-medium">sarah.wilson@company.com</p>
                                    <p className="text-gray-400 text-sm">Last active: 1 day ago</p>
                                </div>
                                <span className="px-2 py-1 bg-yellow-900 text-yellow-300 rounded text-xs">Away</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                                <div>
                                    <p className="text-white font-medium">mike.johnson@company.com</p>
                                    <p className="text-gray-400 text-sm">Last active: 3 days ago</p>
                                </div>
                                <span className="px-2 py-1 bg-red-900 text-red-300 rounded text-xs">Inactive</span>
                            </div>
                        </div>
                    </div>

                    {/* System Health */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <Database className="w-5 h-5" />
                            System Health
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-400">API Response Time</span>
                                    <span className="text-green-400">245ms</span>
                                </div>
                                <div className="w-full bg-gray-800 rounded-full h-2">
                                    <div className="bg-green-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-400">Database Load</span>
                                    <span className="text-yellow-400">67%</span>
                                </div>
                                <div className="w-full bg-gray-800 rounded-full h-2">
                                    <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '67%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-400">Server Uptime</span>
                                    <span className="text-green-400">99.9%</span>
                                </div>
                                <div className="w-full bg-gray-800 rounded-full h-2">
                                    <div className="bg-green-400 h-2 rounded-full" style={{ width: '99%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Recent System Activity</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-gray-300">New user registered: alex.smith@company.com</span>
                            <span className="text-gray-500 text-sm ml-auto">2 min ago</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <span className="text-gray-300">Interview completed: Senior Frontend Developer</span>
                            <span className="text-gray-500 text-sm ml-auto">5 min ago</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                            <span className="text-gray-300">System backup completed successfully</span>
                            <span className="text-gray-500 text-sm ml-auto">1 hour ago</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                            <span className="text-gray-300">High API usage detected - scaling initiated</span>
                            <span className="text-gray-500 text-sm ml-auto">2 hours ago</span>
                        </div>
                    </div>
                </div>

                {/* Back to Dashboard */}
                <div className="mt-8 text-center">
                    <button 
                        onClick={() => router.push('/dashboard')}
                        className="bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600 px-6 py-3 rounded-xl text-white font-medium transition-all duration-200 hover:scale-105"
                    >
                        <Home className="w-4 h-4 inline mr-2" />
                        Back to User Dashboard
                    </button>
                </div>
            </div>
        </div>
    )
}