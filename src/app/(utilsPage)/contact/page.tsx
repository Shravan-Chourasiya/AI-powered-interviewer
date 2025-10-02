'use client'
import React, { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'


const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        setIsSubmitted(true)
        setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' })
      }
    } catch (error) {
      console.error('Error sending message:', error)
    }
    
    setIsSubmitting(false)
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-10 right-10 sm:top-20 sm:right-20 w-24 h-24 sm:w-32 sm:h-32 bg-purple-500/10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 left-10 sm:bottom-20 sm:left-20 w-32 h-32 sm:w-40 sm:h-40 bg-teal-500/10 rounded-full animate-pulse"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 sm:w-24 sm:h-24 bg-purple-500/5 rounded-full animate-pulse"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent mb-4 sm:mb-6 px-2">
            Contact Us
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-gray-400 max-w-3xl mx-auto px-4">
            Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">Send us a Message</h2>
            {isSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
                <p className="text-slate-600 dark:text-gray-300">Thank you for contacting us. We&apos;ll get back to you soon.</p>
                <Button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 bg-gradient-to-r from-purple-500 to-teal-500"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">First Name</label>
                  <Input 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="bg-white dark:bg-gray-800/50 border-slate-300 dark:border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 dark:focus:ring-purple-400/20 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-gray-400 transition-all duration-200 shadow-sm h-12 text-base" 
                    placeholder="Your first name" 
                    required
                    style={{ fontSize: '16px' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Last Name</label>
                  <Input 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="bg-white dark:bg-gray-800/50 border-slate-300 dark:border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 dark:focus:ring-purple-400/20 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-gray-400 transition-all duration-200 shadow-sm h-12 text-base" 
                    placeholder="Your last name" 
                    required
                    style={{ fontSize: '16px' }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Email</label>
                <Input 
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-white dark:bg-gray-800/50 border-slate-300 dark:border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 dark:focus:ring-purple-400/20 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-gray-400 transition-all duration-200 shadow-sm h-12 text-base" 
                  placeholder="your.email@domain.com" 
                  required
                  style={{ fontSize: '16px' }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Subject</label>
                <Input 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="bg-white dark:bg-gray-800/50 border-slate-300 dark:border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 dark:focus:ring-purple-400/20 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-gray-400 transition-all duration-200 shadow-sm h-12 text-base" 
                  placeholder="How can we help?" 
                  required
                  style={{ fontSize: '16px' }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-3 bg-white dark:bg-gray-800/50 border border-slate-300 dark:border-gray-700 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-100 dark:focus:ring-purple-400/20 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-gray-400 resize-none transition-all duration-200 shadow-sm text-base min-h-[100px]"
                  placeholder="Tell us more about your inquiry..."
                  required
                  style={{ fontSize: '16px' }}
                />
              </div>
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-gradient-to-r from-purple-500 to-teal-500 hover:scale-105 transition-all duration-300 disabled:opacity-50 touch-manipulation font-semibold"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">Get in Touch</h2>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="p-2 sm:p-3 rounded-lg bg-gradient-to-r from-purple-500 to-teal-500 flex-shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-slate-900 dark:text-white font-semibold text-sm sm:text-base">Email</h3>
                    <p className="text-slate-600 dark:text-gray-400 text-sm sm:text-base break-all">syntheview.ai@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="p-2 sm:p-3 rounded-lg bg-gradient-to-r from-purple-500 to-teal-500 flex-shrink-0">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-slate-900 dark:text-white font-semibold text-sm sm:text-base">Phone</h3>
                    <p className="text-slate-600 dark:text-gray-400 text-sm sm:text-base">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="p-2 sm:p-3 rounded-lg bg-gradient-to-r from-purple-500 to-teal-500 flex-shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-slate-900 dark:text-white font-semibold text-sm sm:text-base">Address</h3>
                    <p className="text-slate-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">123 Innovation Drive<br />San Francisco, CA 94105</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="p-2 sm:p-3 rounded-lg bg-gradient-to-r from-purple-500 to-teal-500 flex-shrink-0">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-slate-900 dark:text-white font-semibold text-sm sm:text-base">Business Hours</h3>
                    <p className="text-slate-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">Mon - Fri: 9:00 AM - 6:00 PM PST<br />Weekend: 10:00 AM - 4:00 PM PST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">Quick Help</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-purple-600 dark:text-purple-400 font-semibold mb-2 text-sm sm:text-base">How do I start practicing?</h3>
                  <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed">Simply sign up for a free account and choose your field to begin your first mock interview.</p>
                </div>
                <div>
                  <h3 className="text-purple-600 dark:text-purple-400 font-semibold mb-2 text-sm sm:text-base">Is my data secure?</h3>
                  <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed">Yes, we use enterprise-grade security to protect your information and never share your practice sessions.</p>
                </div>
                <div>
                  <h3 className="text-purple-600 dark:text-purple-400 font-semibold mb-2 text-sm sm:text-base">Can I practice for specific companies?</h3>
                  <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed">Our AI can simulate interview styles for various company types and industries.</p>
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