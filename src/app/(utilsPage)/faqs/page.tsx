'use client'
import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle, Zap, Shield, Users } from 'lucide-react'

import { Button } from '@/components/ui/button'

const FAQs = () => {
  const faqCategories = [
    {
      title: "Getting Started",
      icon: Zap,
      faqs: [
        {
          question: "How do I create an account?",
          answer: "Simply click 'Sign Up' and provide your email, username, and password. You'll receive a verification email to activate your account."
        },
        {
          question: "Is SyntheView free to use?",
          answer: "Yes! We offer a free tier with basic features. Premium plans provide unlimited interviews and advanced analytics."
        },
        {
          question: "What types of interviews can I practice?",
          answer: "We support 50+ job categories including Software Engineering, Data Science, Marketing, Finance, and many more."
        }
      ]
    },
    {
      title: "Interview Process",
      icon: Users,
      faqs: [
        {
          question: "How realistic are the AI interviews?",
          answer: "Our AI is trained on thousands of real interview scenarios and provides industry-specific questions that mirror actual hiring processes."
        },
        {
          question: "How long does each interview session last?",
          answer: "Interview sessions typically range from 15-45 minutes depending on the role and number of rounds you select."
        },
        {
          question: "Can I pause and resume interviews?",
          answer: "Yes, you can pause your interview at any time and resume later. Your progress is automatically saved."
        },
        {
          question: "Do I get feedback after each interview?",
          answer: "Absolutely! You'll receive detailed feedback on your responses, communication skills, and areas for improvement."
        }
      ]
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      faqs: [
        {
          question: "Is my interview data private?",
          answer: "Yes, your practice sessions are completely private. We never share your responses with employers or third parties."
        },
        {
          question: "How is my data protected?",
          answer: "We use enterprise-grade encryption and security measures to protect your personal information and interview data."
        },
        {
          question: "Can I delete my account and data?",
          answer: "Yes, you can delete your account and all associated data at any time from your account settings."
        }
      ]
    },
    {
      title: "Technical Support",
      icon: HelpCircle,
      faqs: [
        {
          question: "What browsers are supported?",
          answer: "SyntheView works on all modern browsers including Chrome, Firefox, Safari, and Edge."
        },
        {
          question: "Do I need any special software?",
          answer: "No additional software is required. SyntheView runs entirely in your web browser."
        },
        {
          question: "What if I encounter technical issues?",
          answer: "Contact our support team at support@syntheview.com or use the chat feature for immediate assistance."
        },
        {
          question: "Can I use SyntheView on mobile devices?",
          answer: "Yes, our platform is fully responsive and works on smartphones and tablets."
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-purple-500/10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-teal-500/10 rounded-full animate-pulse"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-500/5 rounded-full animate-pulse"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Find answers to common questions about SyntheView and get the help you need.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <div 
              key={categoryIndex}
              className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-lg hover:border-purple-400 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${categoryIndex * 0.1}s` }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-teal-500">
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">{category.title}</h2>
              </div>
              
              <Accordion type="single" collapsible className="space-y-2">
                {category.faqs.map((faq, faqIndex) => (
                  <AccordionItem 
                    key={faqIndex} 
                    value={`${categoryIndex}-${faqIndex}`}
                    className="border border-gray-600 rounded-lg px-4 hover:border-purple-400 transition-colors duration-200"
                  >
                    <AccordionTrigger className="text-left text-white hover:text-purple-400 transition-colors duration-200 py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 pb-4 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-500 to-teal-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
            <p className="text-white/90 mb-6">
              Can&apos;t find the answer you&apos;re looking for? Our support team is here to help.
            </p>
            <a href="/contact">
              <Button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg">
                📞 Contact Support
              </Button>
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}

export default FAQs