'use client'
import { Button } from "@/components/ui/button";
import { Sparkles, Rocket, BookOpen, Users, TrendingUp, Clock, Target } from 'lucide-react';
import Link from "next/link";


export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-32 h-32 bg-purple-500/20 rounded-full animate-pulse blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-teal-500/20 rounded-full animate-pulse blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-500/10 rounded-full animate-pulse blur-lg"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-teal-500/15 rounded-full animate-pulse blur-lg"></div>
      </div>
      
      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen px-4 sm:px-6">
        {/* Hero Section */}
        <div className="text-center flex flex-col justify-center items-center gap-8 max-w-6xl mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500/20 to-teal-500/20 rounded-2xl mb-6 border border-purple-500/30 backdrop-blur-sm">
            <Sparkles className="w-10 h-10 text-purple-400 animate-pulse" />
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-teal-400 bg-clip-text text-transparent mb-6 leading-tight">
            Ace Your Next Interview
          </h1>
          
          <h2 className="text-xl sm:text-3xl lg:text-4xl text-white font-semibold mb-8 max-w-4xl">
            AI-Powered Mock Interviews That Feel Real
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-300 mb-12 max-w-3xl leading-relaxed">
            Practice with our advanced AI interviewer, get instant feedback, and build the confidence you need to land your dream job. Join thousands of successful candidates.
          </p>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-16">
          <Link href='/sign-up'>
            <Button className="group px-10 py-5 bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600 text-white rounded-2xl font-bold text-xl hover:scale-[1.05] transition-all duration-300 shadow-2xl hover:shadow-purple-500/25 min-w-64">
              <Rocket className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              Start Free Trial
            </Button>
          </Link>
          <Link href='/about'>
            <Button className="group px-10 py-5 bg-slate-800/50 backdrop-blur-sm border-2 border-slate-600 hover:border-purple-400 text-gray-300 hover:text-white rounded-2xl font-bold text-xl hover:scale-[1.05] transition-all duration-300 shadow-2xl min-w-64">
              <BookOpen className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Learn More
            </Button>
          </Link>
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="group text-center bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-purple-400/50 hover:scale-[1.02] transition-all duration-300">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-500/30 transition-all">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
            <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent mb-2">10K+</div>
            <div className="text-gray-400 font-medium group-hover:text-gray-300 transition-colors">Interviews Completed</div>
          </div>
          <div className="group text-center bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-teal-400/50 hover:scale-[1.02] transition-all duration-300">
            <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-teal-500/30 transition-all">
              <TrendingUp className="w-6 h-6 text-teal-400" />
            </div>
            <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent mb-2">95%</div>
            <div className="text-gray-400 font-medium group-hover:text-gray-300 transition-colors">Success Rate</div>
          </div>
          <div className="group text-center bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-emerald-400/50 hover:scale-[1.02] transition-all duration-300">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-emerald-500/30 transition-all">
              <Target className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent mb-2">50+</div>
            <div className="text-gray-400 font-medium group-hover:text-gray-300 transition-colors">Job Categories</div>
          </div>
          <div className="group text-center bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-amber-400/50 hover:scale-[1.02] transition-all duration-300">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-amber-500/30 transition-all">
              <Clock className="w-6 h-6 text-amber-400" />
            </div>
            <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent mb-2">24/7</div>
            <div className="text-gray-400 font-medium group-hover:text-gray-300 transition-colors">Available</div>
          </div>
        </div>
      </div>
    </main>
  );
}