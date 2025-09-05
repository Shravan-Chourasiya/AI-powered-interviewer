'use client'
import React from 'react'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import '../App.css'

const ContactUs = () => {
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
            Contact Us
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                  <Input className="bg-gray-700 border-gray-600 focus:border-purple-400 text-white placeholder-gray-400" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                  <Input className="bg-gray-700 border-gray-600 focus:border-purple-400 text-white placeholder-gray-400" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <Input className="bg-gray-700 border-gray-600 focus:border-purple-400 text-white placeholder-gray-400" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                <Input className="bg-gray-700 border-gray-600 focus:border-purple-400 text-white placeholder-gray-400" placeholder="How can we help?" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea 
                  rows={5}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 text-white placeholder-gray-400 resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>
              <Button className="w-full bg-gradient-to-r from-purple-500 to-teal-500 hover:scale-105 transition-all duration-300">
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-teal-500">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Email</h3>
                    <p className="text-gray-400">support@syntheview.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-teal-500">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Phone</h3>
                    <p className="text-gray-400">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-teal-500">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Address</h3>
                    <p className="text-gray-400">123 Innovation Drive<br />San Francisco, CA 94105</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-teal-500">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Business Hours</h3>
                    <p className="text-gray-400">Mon - Fri: 9:00 AM - 6:00 PM PST<br />Weekend: 10:00 AM - 4:00 PM PST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-6">Quick Help</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-purple-400 font-semibold mb-2">How do I start practicing?</h3>
                  <p className="text-gray-300 text-sm">Simply sign up for a free account and choose your field to begin your first mock interview.</p>
                </div>
                <div>
                  <h3 className="text-purple-400 font-semibold mb-2">Is my data secure?</h3>
                  <p className="text-gray-300 text-sm">Yes, we use enterprise-grade security to protect your information and never share your practice sessions.</p>
                </div>
                <div>
                  <h3 className="text-purple-400 font-semibold mb-2">Can I practice for specific companies?</h3>
                  <p className="text-gray-300 text-sm">Our AI can simulate interview styles for various company types and industries.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs