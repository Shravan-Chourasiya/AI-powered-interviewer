'use client'
import React from 'react'
import { Users, Target, Zap, Shield } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-10 right-10 sm:top-20 sm:right-20 w-24 h-24 sm:w-32 sm:h-32 bg-purple-500/20 dark:bg-purple-500/10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 left-10 sm:bottom-20 sm:left-20 w-32 h-32 sm:w-40 sm:h-40 bg-teal-500/20 dark:bg-teal-500/10 rounded-full animate-pulse"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 sm:w-24 sm:h-24 bg-purple-500/10 dark:bg-purple-500/5 rounded-full animate-pulse"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent mb-4 sm:mb-6 px-2">
            About SyntheView
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-gray-400 max-w-3xl mx-auto px-4">
            Empowering job seekers with AI-powered mock interviews to build confidence and land their dream jobs.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-16 sm:mb-20">
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-4 sm:mb-6">Our Mission</h2>
            <p className="text-slate-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
              At SyntheView, we believe everyone deserves the opportunity to showcase their best self in job interviews. 
              Our AI-powered platform provides realistic interview practice, personalized feedback, and the confidence 
              boost you need to succeed.
            </p>
            <p className="text-slate-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
              We&apos;re democratizing interview preparation by making high-quality practice accessible to everyone, 
              regardless of their background or resources.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">10K+</div>
                <div className="text-slate-600 dark:text-gray-400 text-xs sm:text-sm">Interviews Conducted</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">85%</div>
                <div className="text-slate-600 dark:text-gray-400 text-xs sm:text-sm">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">50+</div>
                <div className="text-slate-600 dark:text-gray-400 text-xs sm:text-sm">Job Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">24/7</div>
                <div className="text-slate-600 dark:text-gray-400 text-xs sm:text-sm">Available</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white text-center mb-8 sm:mb-12 px-4">Why Choose SyntheView?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl p-4 sm:p-6 hover:border-purple-500 hover:shadow-xl transition-all duration-300 transform hover:scale-105 touch-manipulation">
              <div className="p-2 sm:p-3 rounded-lg bg-gradient-to-r from-purple-500 to-teal-500 w-fit mb-3 sm:mb-4">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-white mb-2 sm:mb-3">AI-Powered</h3>
              <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed">Advanced AI technology provides realistic interview scenarios and personalized feedback.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl p-4 sm:p-6 hover:border-purple-500 hover:shadow-xl transition-all duration-300 transform hover:scale-105 touch-manipulation">
              <div className="p-2 sm:p-3 rounded-lg bg-gradient-to-r from-purple-500 to-teal-500 w-fit mb-3 sm:mb-4">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-white mb-2 sm:mb-3">Targeted Practice</h3>
              <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed">Practice for specific roles and industries with customized question sets.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl p-4 sm:p-6 hover:border-purple-500 hover:shadow-xl transition-all duration-300 transform hover:scale-105 touch-manipulation">
              <div className="p-2 sm:p-3 rounded-lg bg-gradient-to-r from-purple-500 to-teal-500 w-fit mb-3 sm:mb-4">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-white mb-2 sm:mb-3">Expert Insights</h3>
              <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed">Get feedback based on industry best practices and hiring manager expectations.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl p-4 sm:p-6 hover:border-purple-500 hover:shadow-xl transition-all duration-300 transform hover:scale-105 touch-manipulation">
              <div className="p-2 sm:p-3 rounded-lg bg-gradient-to-r from-purple-500 to-teal-500 w-fit mb-3 sm:mb-4">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-white mb-2 sm:mb-3">Privacy First</h3>
              <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed">Your practice sessions are private and secure. We never share your data.</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-4 sm:mb-6 px-4">Built by Interview Experts</h2>
          <p className="text-slate-600 dark:text-gray-300 text-base sm:text-lg max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
            Our team combines years of hiring experience, AI expertise, and a passion for helping people succeed. 
            We&apos;ve been on both sides of the interview table and understand what it takes to make a great impression.
          </p>
          <div className="bg-gradient-to-r from-purple-500 to-teal-500 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Ready to Ace Your Next Interview?</h3>
            <p className="text-white/90 mb-4 sm:mb-6 text-sm sm:text-base px-2">Join thousands of successful candidates who&apos;ve improved their interview skills with SyntheView.</p>
            <Link href="/interview/CreateInterview">
              <Button className="bg-white text-purple-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl touch-manipulation text-sm sm:text-base">
                🚀 Start Practicing Today
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs