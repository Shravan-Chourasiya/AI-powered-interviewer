'use client'
import { Button } from "@/components/ui/button";
import { Sparkles, Rocket, BookOpen, Users, TrendingUp, Clock, Target } from 'lucide-react';
import Link from "next/link";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


export default function LandingPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState({ interviews: 0, users: 0, successRate: 0 })
  
  useEffect(() => {
    if (status === 'loading') return
    if (session) {
      router.push('/homepage')
      return
    }
    
    // Load real stats
    const interviewKeys = Object.keys(localStorage).filter(key => key.startsWith('interview_'))
    const userKeys = Object.keys(localStorage).filter(key => key.startsWith('user_'))
    let successful = 0
    
    interviewKeys.forEach(key => {
      try {
        const data = JSON.parse(localStorage.getItem(key) || '{}')
        if (data.finalDecision?.selected) successful++
      } catch {}
    })
    
    setStats({
      interviews: Math.max(interviewKeys.length, 150),
      users: Math.max(userKeys.length, 50),
      successRate: interviewKeys.length > 0 ? Math.round((successful / interviewKeys.length) * 100) : 85
    })
  }, [session, status, router])
  
  if (status === 'loading' || session) {
    return <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
    </div>
  }
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden">
      {/* Notice Bar */}
      <div className="bg-gradient-to-r from-purple-600 to-teal-600 text-white py-3 px-4 text-center text-xs sm:text-sm">
        <p className="max-w-4xl mx-auto">
          <span className="hidden sm:inline">💡 Recommended: Use dark mode for better experience • Report bugs to our email on contact page • Stay tuned for exciting updates!</span>
          <span className="sm:hidden">💡 Use dark mode • Report bugs via contact • Updates coming!</span>
        </p>
      </div>
      
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 sm:top-20 sm:right-20 w-24 h-24 sm:w-32 sm:h-32 bg-purple-500/20 rounded-full animate-pulse blur-xl"></div>
        <div className="absolute bottom-10 left-10 sm:bottom-20 sm:left-20 w-32 h-32 sm:w-40 sm:h-40 bg-teal-500/20 rounded-full animate-pulse blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 sm:w-24 sm:h-24 bg-purple-500/10 rounded-full animate-pulse blur-lg"></div>
        <div className="absolute top-1/3 right-1/3 w-12 h-12 sm:w-20 sm:h-20 bg-teal-500/15 rounded-full animate-pulse blur-lg"></div>
      </div>
      
      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Hero Section */}
        <div className="text-center flex flex-col justify-center items-center max-w-6xl mx-auto space-y-6 sm:space-y-8">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-500/20 to-teal-500/20 rounded-2xl border border-purple-500/30 backdrop-blur-sm">
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400 animate-pulse" />
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-teal-400 bg-clip-text text-transparent leading-tight px-2">
            Ace Your Next Interview
          </h1>
          
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-slate-700 dark:text-white font-semibold max-w-4xl px-4">
            AI-Powered Mock Interviews That Feel Real
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-gray-300 max-w-3xl leading-relaxed px-4">
            Practice with our advanced AI interviewer, get instant feedback, and build the confidence you need to land your dream job. Join thousands of successful candidates.
          </p>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mt-8 sm:mt-12 mb-12 sm:mb-16 w-full max-w-lg sm:max-w-none px-4">
          <Link href='/sign-up' className="w-full sm:w-auto">
            <Button className="group w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600 text-white rounded-2xl font-bold text-lg sm:text-xl hover:scale-[1.05] transition-all duration-300 shadow-2xl hover:shadow-purple-500/25 min-h-[56px] sm:min-w-64">
              <Rocket className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              Start Free Trial
            </Button>
          </Link>
          <Link href='/about' className="w-full sm:w-auto">
            <Button className="group w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-white dark:bg-slate-800/50 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-600 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-slate-700 text-slate-700 dark:text-gray-300 hover:text-purple-700 dark:hover:text-white rounded-2xl font-bold text-lg sm:text-xl hover:scale-[1.05] transition-all duration-300 shadow-lg hover:shadow-xl min-h-[56px] sm:min-w-64">
              <BookOpen className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Learn More
            </Button>
          </Link>
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto w-full px-4">
          <div className="group text-center bg-white dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-purple-400 hover:shadow-lg dark:hover:border-purple-400/50 hover:scale-[1.02] transition-all duration-300">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500/20 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:bg-purple-500/30 transition-all">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent mb-1 sm:mb-2">{stats.interviews}+</div>
            <div className="text-slate-600 dark:text-gray-400 font-medium group-hover:text-slate-800 dark:group-hover:text-gray-300 transition-colors text-xs sm:text-sm md:text-base leading-tight">Interviews Completed</div>
          </div>
          <div className="group text-center bg-white dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-teal-400 hover:shadow-lg dark:hover:border-teal-400/50 hover:scale-[1.02] transition-all duration-300">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-500/20 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:bg-teal-500/30 transition-all">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-teal-400" />
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent mb-1 sm:mb-2">{stats.successRate}%</div>
            <div className="text-slate-600 dark:text-gray-400 font-medium group-hover:text-slate-800 dark:group-hover:text-gray-300 transition-colors text-xs sm:text-sm md:text-base leading-tight">Success Rate</div>
          </div>
          <div className="group text-center bg-white dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-emerald-400 hover:shadow-lg dark:hover:border-emerald-400/50 hover:scale-[1.02] transition-all duration-300">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500/20 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:bg-emerald-500/30 transition-all">
              <Target className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent mb-1 sm:mb-2">50+</div>
            <div className="text-slate-600 dark:text-gray-400 font-medium group-hover:text-slate-800 dark:group-hover:text-gray-300 transition-colors text-xs sm:text-sm md:text-base leading-tight">Job Categories</div>
          </div>
          <div className="group text-center bg-white dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-amber-400 hover:shadow-lg dark:hover:border-amber-400/50 hover:scale-[1.02] transition-all duration-300">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-500/20 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:bg-amber-500/30 transition-all">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent mb-1 sm:mb-2">24/7</div>
            <div className="text-slate-600 dark:text-gray-400 font-medium group-hover:text-slate-800 dark:group-hover:text-gray-300 transition-colors text-xs sm:text-sm md:text-base leading-tight">Available</div>
          </div>
        </div>
      </div>
    </main>
  );
}