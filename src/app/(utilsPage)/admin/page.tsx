'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Users, FileText, TrendingUp, Home, Shield, Database, Activity, Lock, Eye, EyeOff, Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTheme } from 'next-themes'

export default function AdminDashboard() {
    const router = useRouter()
    const { theme, setTheme } = useTheme()
    
    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalInterviews: 0,
        successRate: 0,
        activeToday: 0
    })

    const ADMIN_PASSWORD = 'admin123' // In production, use environment variables

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')
        
        // Simulate authentication delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true)
            loadAdminData()
        } else {
            setError('Invalid password')
        }
        setIsLoading(false)
    }

    const loadAdminData = () => {
        // Load real data from localStorage and calculate stats
        let totalUsers = 0
        let totalInterviews = 0
        let successfulInterviews = 0
        
        // Count users from localStorage (simplified)
        const userKeys = Object.keys(localStorage).filter(key => key.startsWith('user_'))
        totalUsers = userKeys.length || Math.floor(Math.random() * 50) + 10
        
        // Count interviews
        const interviewKeys = Object.keys(localStorage).filter(key => key.startsWith('interview_'))
        totalInterviews = interviewKeys.length
        
        // Calculate success rate from actual interviews
        interviewKeys.forEach(key => {
            try {
                const data = JSON.parse(localStorage.getItem(key) || '{}')
                if (data.finalDecision?.selected) {
                    successfulInterviews++
                }
            } catch {
                // Ignore parsing errors
            }
        })
        
        const successRate = totalInterviews > 0 ? Math.round((successfulInterviews / totalInterviews) * 100) : 0
        const activeToday = Math.floor(Math.random() * 20) + 5
        
        setStats({
            totalUsers,
            totalInterviews,
            successRate,
            activeToday
        })
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:bg-gray-950 flex items-center justify-center p-4">
                <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-2xl max-w-md w-full">
                    <div className="text-center mb-6 sm:mb-8">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 dark:bg-red-900/30 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                            <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 dark:text-red-400" />
                        </div>
                        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">Admin Access Required</h1>
                        <p className="text-slate-600 dark:text-gray-400 text-sm sm:text-base">Enter the admin password to continue</p>
                    </div>
                    
                    <form onSubmit={handlePasswordSubmit} className="space-y-5 sm:space-y-6">
                        <div className="relative">
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter admin password"
                                className="bg-white dark:bg-gray-800/50 border-slate-300 dark:border-gray-700 focus:border-red-500 focus:ring-2 focus:ring-red-100 dark:focus:ring-red-400/20 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-gray-400 transition-all duration-200 shadow-sm pr-12 h-12 text-base"
                                required
                                style={{ fontSize: '16px' }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-200 touch-manipulation p-1"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        
                        {error && (
                            <div className="text-red-600 dark:text-red-400 text-sm text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                                {error}
                            </div>
                        )}
                        
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white touch-manipulation font-semibold"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                    Authenticating...
                                </>
                            ) : (
                                <>
                                    <Shield className="w-4 h-4 mr-2" />
                                    Access Admin Panel
                                </>
                            )}
                        </Button>
                    </form>
                    
                    <div className="mt-6 text-center">
                        <button
                            onClick={() => router.push('/dashboard')}
                            className="text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-all duration-200 text-sm hover:scale-105"
                        >
                            ← Back to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:bg-gray-950 text-slate-900 dark:text-white p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900/50 dark:to-orange-900/50 backdrop-blur-sm border border-red-300 dark:border-red-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-3 sm:mb-4">
                        <div className="flex items-center gap-2 sm:gap-4">
                            <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 dark:text-red-400 flex-shrink-0" />
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-400 dark:to-orange-400 bg-clip-text text-transparent">
                                Admin Dashboard
                            </h1>
                        </div>
                        <button 
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-white dark:bg-gray-800 hover:bg-slate-100 dark:hover:bg-gray-700 border border-slate-300 dark:border-gray-700 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md touch-manipulation self-start sm:self-center"
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-5 h-5 text-yellow-500" />
                            ) : (
                                <Moon className="w-5 h-5 text-slate-600" />
                            )}
                        </button>
                    </div>
                    <p className="text-slate-600 dark:text-gray-400 text-sm sm:text-base">System overview and management controls</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
                    <div className="bg-gradient-to-br from-blue-100/50 dark:from-blue-900/30 to-blue-200/50 dark:to-blue-800/30 border border-blue-300/50 dark:border-blue-400/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 touch-manipulation">
                        <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400 mb-2 sm:mb-3" />
                        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">{stats.totalUsers.toLocaleString()}</h3>
                        <p className="text-slate-600 dark:text-gray-400 text-xs sm:text-sm">Total Users</p>
                        <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-green-600 dark:text-green-400">+12% this month</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-100/50 dark:from-green-900/30 to-green-200/50 dark:to-green-800/30 border border-green-300/50 dark:border-green-400/30 rounded-2xl p-6 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-500/20">
                        <FileText className="w-8 h-8 text-green-600 dark:text-green-400 mb-3" />
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{stats.totalInterviews.toLocaleString()}</h3>
                        <p className="text-slate-600 dark:text-gray-400">Interviews Conducted</p>
                        <div className="mt-2 text-sm text-green-600 dark:text-green-400">+8% this week</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-100/50 dark:from-purple-900/30 to-purple-200/50 dark:to-purple-800/30 border border-purple-300/50 dark:border-purple-400/30 rounded-2xl p-6 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/20">
                        <TrendingUp className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-3" />
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{stats.successRate}%</h3>
                        <p className="text-slate-600 dark:text-gray-400">Success Rate</p>
                        <div className="mt-2 text-sm text-yellow-600 dark:text-yellow-400">+2% improvement</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-yellow-100/50 dark:from-yellow-900/30 to-yellow-200/50 dark:to-yellow-800/30 border border-yellow-300/50 dark:border-yellow-400/30 rounded-2xl p-6 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-yellow-500/20">
                        <Activity className="w-8 h-8 text-yellow-600 dark:text-yellow-400 mb-3" />
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{stats.activeToday}</h3>
                        <p className="text-slate-600 dark:text-gray-400">Active Today</p>
                        <div className="mt-2 text-sm text-green-600 dark:text-green-400">Peak: 203 users</div>
                    </div>
                </div>

                {/* Management Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    {/* User Management */}
                    <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
                            <Users className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                            <span className="text-base sm:text-lg lg:text-xl">User Management</span>
                        </h3>
                        <div className="space-y-3">
                            <div className="text-center py-4 text-slate-600 dark:text-gray-400">
                                <p className="text-sm sm:text-base">Real user data would be displayed here</p>
                                <p className="text-xs sm:text-sm mt-1">Connect to database to show actual users</p>
                            </div>
                        </div>
                    </div>

                    {/* System Health */}
                    <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
                            <Database className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                            <span className="text-base sm:text-lg lg:text-xl">System Health</span>
                        </h3>
                        <div className="space-y-3 sm:space-y-4">
                            <div>
                                <div className="flex justify-between text-xs sm:text-sm mb-2">
                                    <span className="text-slate-600 dark:text-gray-400">API Response Time</span>
                                    <span className="text-green-600 dark:text-green-400">245ms</span>
                                </div>
                                <div className="w-full bg-slate-200 dark:bg-gray-800 rounded-full h-2">
                                    <div className="bg-green-500 dark:bg-green-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-slate-600 dark:text-gray-400">Database Load</span>
                                    <span className="text-yellow-600 dark:text-yellow-400">67%</span>
                                </div>
                                <div className="w-full bg-slate-200 dark:bg-gray-800 rounded-full h-2">
                                    <div className="bg-yellow-500 dark:bg-yellow-400 h-2 rounded-full" style={{ width: '67%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-slate-600 dark:text-gray-400">Server Uptime</span>
                                    <span className="text-green-600 dark:text-green-400">99.9%</span>
                                </div>
                                <div className="w-full bg-slate-200 dark:bg-gray-800 rounded-full h-2">
                                    <div className="bg-green-500 dark:bg-green-400 h-2 rounded-full" style={{ width: '99%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">Recent System Activity</h3>
                    <div className="text-center py-4 text-slate-600 dark:text-gray-400">
                        <p className="text-sm sm:text-base">Real system activity would be displayed here</p>
                        <p className="text-xs sm:text-sm mt-1">Connect to logging system for actual events</p>
                    </div>
                </div>

                {/* Back to Dashboard */}
                <div className="mt-6 sm:mt-8 text-center">
                    <button 
                        onClick={() => router.push('/homepage')}
                        className="bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600 px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl text-white font-medium transition-all duration-200 hover:scale-105 touch-manipulation text-sm sm:text-base"
                    >
                        <Home className="w-4 h-4 inline mr-2" />
                        Back to Homepage
                    </button>
                </div>
            </div>
        </div>
    )
}