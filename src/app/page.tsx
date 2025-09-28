'use client'
import { Button } from "@/components/ui/button";
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-400 to-teal-400 rounded-full mb-6 animate-bounce">
            🎆
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
            <Button className="px-10 py-5 bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600 text-white rounded-2xl font-bold text-xl hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25 min-w-64">
              🚀 Start Free Trial
            </Button>
          </Link>
          <Link href='/about'>
            <Button className="px-10 py-5 bg-gray-800/50 backdrop-blur-sm border-2 border-gray-600 hover:border-purple-400 text-gray-300 hover:text-white rounded-2xl font-bold text-xl hover:scale-110 transition-all duration-300 shadow-2xl min-w-64">
              📚 Learn More
            </Button>
          </Link>
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-purple-400/50 transition-all duration-300">
            <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent mb-2">10K+</div>
            <div className="text-gray-400 font-medium">Interviews Completed</div>
          </div>
          <div className="text-center bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-purple-400/50 transition-all duration-300">
            <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent mb-2">95%</div>
            <div className="text-gray-400 font-medium">Success Rate</div>
          </div>
          <div className="text-center bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-purple-400/50 transition-all duration-300">
            <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent mb-2">50+</div>
            <div className="text-gray-400 font-medium">Job Categories</div>
          </div>
          <div className="text-center bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-purple-400/50 transition-all duration-300">
            <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent mb-2">24/7</div>
            <div className="text-gray-400 font-medium">Available</div>
          </div>
        </div>
      </div>
    </main>
  );
}