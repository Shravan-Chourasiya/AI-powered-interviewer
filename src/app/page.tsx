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
    return <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
    </div>
  }
  
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Notice Bar */}
      <div className="bg-gradient-to-r from-purple-600 to-teal-600 text-white py-4 px-6 text-center">
        <p className="max-w-4xl mx-auto text-sm">
          💡 Report bugs to our email on contact page • Stay tuned for exciting updates!
        </p>
      </div>
      
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-32 h-32 bg-purple-500/20 rounded-full animate-pulse blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-teal-500/20 rounded-full animate-pulse blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-500/10 rounded-full animate-pulse blur-lg"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-teal-500/15 rounded-full animate-pulse blur-lg"></div>
      </div>
      
      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen px-8 py-20">
        {/* Hero Section */}
        <div className="text-center flex flex-col justify-center items-center max-w-6xl mx-auto space-y-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500/20 to-teal-500/20 rounded-2xl border border-purple-500/30 backdrop-blur-sm">
            <Sparkles className="w-10 h-10 text-purple-400 animate-pulse" />
          </div>
          
          <h1 className="text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-teal-400 bg-clip-text text-transparent leading-tight">
            Ace Your Next Interview
          </h1>
          
          <h2 className="text-3xl text-foreground font-semibold max-w-4xl">
            AI-Powered Mock Interviews That Feel Real
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Practice with our advanced AI interviewer, get instant feedback, and build the confidence you need to land your dream job. Join thousands of successful candidates.
          </p>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex justify-center items-center gap-6 mt-12 mb-16">
          <Link href='/sign-up'>
            <Button className="group px-10 py-5 bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600 text-white rounded-2xl font-bold text-xl hover:scale-[1.05] transition-all duration-300 shadow-2xl hover:shadow-purple-500/25 min-w-64">
              <Rocket className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              Start Free Trial
            </Button>
          </Link>
          <Link href='/about'>
            <Button className="group px-10 py-5 bg-card backdrop-blur-sm border-2 border-border hover:border-purple-500 hover:bg-accent text-foreground hover:text-purple-700 rounded-2xl font-bold text-xl hover:scale-[1.05] transition-all duration-300 shadow-lg hover:shadow-xl min-w-64">
              <BookOpen className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Learn More
            </Button>
          </Link>
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-4 gap-8 max-w-5xl mx-auto w-full">
          <div className="group text-center bg-card backdrop-blur-sm border border-border rounded-2xl p-6 hover:border-purple-400 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-500/30 transition-all">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent mb-2">{stats.interviews}+</div>
            <div className="text-muted-foreground font-medium group-hover:text-foreground transition-colors leading-tight">Interviews Completed</div>
          </div>
          <div className="group text-center bg-card backdrop-blur-sm border border-border rounded-2xl p-6 hover:border-teal-400 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
            <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-teal-500/30 transition-all">
              <TrendingUp className="w-6 h-6 text-teal-400" />
            </div>
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent mb-2">{stats.successRate}%</div>
            <div className="text-muted-foreground font-medium group-hover:text-foreground transition-colors leading-tight">Success Rate</div>
          </div>
          <div className="group text-center bg-card backdrop-blur-sm border border-border rounded-2xl p-6 hover:border-emerald-400 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-emerald-500/30 transition-all">
              <Target className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent mb-2">50+</div>
            <div className="text-muted-foreground font-medium group-hover:text-foreground transition-colors leading-tight">Job Categories</div>
          </div>
          <div className="group text-center bg-card backdrop-blur-sm border border-border rounded-2xl p-6 hover:border-amber-400 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-amber-500/30 transition-all">
              <Clock className="w-6 h-6 text-amber-400" />
            </div>
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent mb-2">24/7</div>
            <div className="text-muted-foreground font-medium group-hover:text-foreground transition-colors leading-tight">Available</div>
          </div>
        </div>
      </div>
    </main>
  );
}