'use client'
import React from 'react'
import { Users, Target, Zap, Shield } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-purple-500/10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-teal-500/10 rounded-full animate-pulse"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-500/5 rounded-full animate-pulse"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent mb-6">
            About SyntheView
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Empowering job seekers with AI-powered mock interviews to build confidence and land their dream jobs.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              At SyntheView, we believe everyone deserves the opportunity to showcase their best self in job interviews. 
              Our AI-powered platform provides realistic interview practice, personalized feedback, and the confidence 
              boost you need to succeed.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              We're democratizing interview preparation by making high-quality practice accessible to everyone, 
              regardless of their background or resources.
            </p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">10K+</div>
                <div className="text-gray-400 text-sm">Interviews Conducted</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">85%</div>
                <div className="text-gray-400 text-sm">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">50+</div>
                <div className="text-gray-400 text-sm">Job Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">24/7</div>
                <div className="text-gray-400 text-sm">Available</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose SyntheView?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-purple-400 transition-all duration-300 shadow-lg transform hover:scale-105">
              <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-teal-500 w-fit mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">AI-Powered</h3>
              <p className="text-gray-300 text-sm">Advanced AI technology provides realistic interview scenarios and personalized feedback.</p>
            </div>
            
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-purple-400 transition-all duration-300 shadow-lg transform hover:scale-105">
              <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-teal-500 w-fit mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Targeted Practice</h3>
              <p className="text-gray-300 text-sm">Practice for specific roles and industries with customized question sets.</p>
            </div>
            
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-purple-400 transition-all duration-300 shadow-lg transform hover:scale-105">
              <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-teal-500 w-fit mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Expert Insights</h3>
              <p className="text-gray-300 text-sm">Get feedback based on industry best practices and hiring manager expectations.</p>
            </div>
            
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-purple-400 transition-all duration-300 shadow-lg transform hover:scale-105">
              <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-teal-500 w-fit mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Privacy First</h3>
              <p className="text-gray-300 text-sm">Your practice sessions are private and secure. We never share your data.</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Built by Interview Experts</h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-8">
            Our team combines years of hiring experience, AI expertise, and a passion for helping people succeed. 
            We've been on both sides of the interview table and understand what it takes to make a great impression.
          </p>
          <div className="bg-gradient-to-r from-purple-500 to-teal-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Ace Your Next Interview?</h3>
            <p className="text-white/90 mb-6">Join thousands of successful candidates who've improved their interview skills with SyntheView.</p>
            <Link href="/interview/CreateInterview">
              <Button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg">
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