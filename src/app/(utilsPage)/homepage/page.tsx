'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { Zap, BarChart3, Clock, Settings, Calendar, Award, Activity, Bookmark } from 'lucide-react'

export default function Homepage() {
    const { data: session, status } = useSession()
    const router = useRouter()
    
    useEffect(() => {
        if (status === 'loading') return
        if (!session) {
            router.push('/sign-in')
            return
        }
    }, [session, status, router])

    if (status === 'loading' || !session) {
        return <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center theme-transition">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
        </div>
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:bg-gray-950 text-slate-900 dark:text-white theme-transition">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent mb-6">
                        Welcome Back, {session.user?.username || session.user?.email?.split('@')[0]}!
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Ready to ace your next interview? Let&apos;s continue your journey to success.
                    </p>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    <Link href="/interview/CreateInterview" className="group bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6 text-center hover:scale-105 hover:shadow-xl hover:border-purple-500 theme-transition">
                        <div className="w-16 h-16 bg-purple-100 dark:bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 dark:group-hover:bg-purple-500/30 theme-transition">
                            <Zap className="w-8 h-8 text-purple-600 dark:text-purple-400 theme-transition" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 theme-transition">Start Interview</h3>
                        <p className="text-slate-600 dark:text-gray-400 text-sm theme-transition">Begin a new mock interview session</p>
                    </Link>
                    
                    <Link href="/dashboard" className="group bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6 text-center hover:scale-105 hover:shadow-xl hover:border-teal-500 theme-transition">
                        <div className="w-16 h-16 bg-teal-100 dark:bg-teal-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-teal-200 dark:group-hover:bg-teal-500/30 theme-transition">
                            <BarChart3 className="w-8 h-8 text-teal-600 dark:text-teal-400 theme-transition" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 theme-transition">Dashboard</h3>
                        <p className="text-slate-600 dark:text-gray-400 text-sm theme-transition">View your progress and analytics</p>
                    </Link>
                    
                    <div className="group bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6 text-center hover:scale-105 hover:shadow-xl hover:border-blue-500 cursor-pointer theme-transition">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-500/30 theme-transition">
                            <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400 theme-transition" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 theme-transition">History</h3>
                        <p className="text-slate-600 dark:text-gray-400 text-sm theme-transition">Review past interview sessions</p>
                    </div>
                    
                    <div className="group bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6 text-center hover:scale-105 hover:shadow-xl hover:border-amber-500 cursor-pointer theme-transition">
                        <div className="w-16 h-16 bg-amber-100 dark:bg-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 dark:group-hover:bg-amber-500/30 theme-transition">
                            <Settings className="w-8 h-8 text-amber-600 dark:text-amber-400 theme-transition" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 theme-transition">Settings</h3>
                        <p className="text-slate-600 dark:text-gray-400 text-sm theme-transition">Customize your preferences</p>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-8 mb-16 shadow-lg theme-transition">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                        <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        Recent Activity
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                            <div className="w-10 h-10 bg-green-100 dark:bg-green-500/20 rounded-lg flex items-center justify-center">
                                <Award className="w-5 h-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div className="flex-1">
                                <p className="text-slate-900 dark:text-white font-medium">Completed Frontend Developer Interview</p>
                                <p className="text-slate-600 dark:text-gray-400 text-sm">Score: 85% • 2 hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-500/20 rounded-lg flex items-center justify-center">
                                <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="flex-1">
                                <p className="text-slate-900 dark:text-white font-medium">Started Data Science Practice Session</p>
                                <p className="text-slate-600 dark:text-gray-400 text-sm">In progress • 1 day ago</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-500/20 rounded-lg flex items-center justify-center">
                                <Bookmark className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div className="flex-1">
                                <p className="text-slate-900 dark:text-white font-medium">Saved Backend Engineer Questions</p>
                                <p className="text-slate-600 dark:text-gray-400 text-sm">Draft saved • 3 days ago</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-purple-500 to-teal-500 rounded-2xl p-8 text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">Ready for Your Next Challenge?</h2>
                    <p className="text-white/90 mb-6 text-lg">
                        Practice makes perfect. Start a new interview session and improve your skills.
                    </p>
                    <Link href="/interview/CreateInterview" className="inline-block bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                        🚀 Start New Interview
                    </Link>
                </div>
            </div>
        </div>
    )
}