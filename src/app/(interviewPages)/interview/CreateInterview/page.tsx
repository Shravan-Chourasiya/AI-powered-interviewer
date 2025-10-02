'use client'
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { 
  BrainCircuit, 
  Users, 
  Target, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle,
  Code,
  MessageSquare,
  Zap
} from 'lucide-react'

const interviewSchema = z.object({
  jobTitle: z.string().min(2, 'Job title must be at least 2 characters'),
  experienceLevel: z.string().min(1, 'Please select experience level'),
  duration: z.string().min(1, 'Please select duration')
})

const CreateInterview = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { data: session, status } = useSession()
  const router = useRouter()
  
  // Auth check
  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/sign-in')
      return
    }
  }, [session, status, router])
  
  const form = useForm<z.infer<typeof interviewSchema>>({
    resolver: zodResolver(interviewSchema),
    defaultValues: {
      jobTitle: '',
      experienceLevel: '',
      duration: ''
    }
  })
  
  // Get field from URL params
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const field = urlParams.get('field')
    if (field) {
      form.setValue('jobTitle', field)
    }
  }, [form])

  const experienceLevels = [
    { value: 'entry', label: 'Entry Level (0-2 years)', icon: '🌱' },
    { value: 'mid', label: 'Mid Level (2-5 years)', icon: '🚀' },
    { value: 'senior', label: 'Senior Level (5+ years)', icon: '⭐' },
    { value: 'lead', label: 'Lead/Principal (8+ years)', icon: '👑' }
  ]

  const durations = [
    { value: '15', label: '15 Minutes', icon: '⚡' },
    { value: '30', label: '30 Minutes', icon: '🕐' },
    { value: '45', label: '45 Minutes', icon: '🕑' },
    { value: '60', label: '1 Hour', icon: '🕒' }
  ]

  const onSubmit = async (data: z.infer<typeof interviewSchema>) => {
    setIsSubmitting(true)
    try {
      // Generate a unique interview ID and navigate directly
      const interviewId = Date.now().toString()
      
      // Store interview data in localStorage for the interview page
      localStorage.setItem('interviewData', JSON.stringify({
        position: data.jobTitle,
        fieldname: data.experienceLevel,
        duration: data.duration
      }))
      
      // Navigate to interview
      window.location.href = `/interview/${interviewId}`
    } catch {
      console.error('Error creating interview')
      alert('Error creating interview. Please try again.')
    }
    setIsSubmitting(false)
  }

  const nextStep = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
            currentStep >= step 
              ? 'bg-gradient-to-r from-purple-400 to-teal-400 text-white shadow-lg' 
              : 'bg-gray-800 text-gray-400 border border-gray-700'
          }`}>
            {currentStep > step ? <CheckCircle className="w-5 h-5" /> : step}
          </div>
          {step < 3 && (
            <div className={`w-16 h-1 mx-2 transition-all duration-300 ${
              currentStep > step ? 'bg-gradient-to-r from-purple-400 to-teal-400' : 'bg-gray-700'
            }`} />
          )}
        </div>
      ))}
    </div>
  )

  const renderStep1 = () => (
    <div className="space-y-6 animate-in slide-in-from-right-5 duration-500">
      <div className="text-center mb-8">
        <BrainCircuit className="w-16 h-16 mx-auto mb-4 text-purple-400 animate-pulse" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Interview Basics</h2>
        <p className="text-slate-600 dark:text-gray-400">Let&apos;s start with the fundamentals</p>
      </div>
      
      <FormField
        control={form.control}
        name="jobTitle"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-slate-900 dark:text-white text-lg">Job Title</FormLabel>
            <FormControl>
              <Input 
                {...field}
                placeholder="e.g., Senior Frontend Developer"
                className="bg-white dark:bg-gray-800/50 border-slate-300 dark:border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 dark:focus:ring-purple-400/20 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-gray-400 h-12 text-lg transition-all duration-200 shadow-sm"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-8 animate-in slide-in-from-right-5 duration-500">
      <div className="text-center mb-8">
        <Target className="w-16 h-16 mx-auto mb-4 text-teal-400 animate-bounce" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Interview Configuration</h2>
        <p className="text-slate-600 dark:text-gray-400">Customize your interview settings</p>
      </div>
      
      <FormField
        control={form.control}
        name="experienceLevel"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-slate-900 dark:text-white text-base sm:text-lg mb-3 sm:mb-4 block">Experience Level</FormLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {experienceLevels.map((level) => (
                <div
                  key={level.value}
                  onClick={() => field.onChange(level.value)}
                  className={`p-4 sm:p-5 rounded-xl border cursor-pointer transition-all duration-300 hover:scale-[1.02] touch-manipulation min-h-[80px] flex flex-col justify-center ${
                    field.value === level.value
                      ? 'border-purple-500/50 bg-purple-100/50 dark:bg-purple-500/20 shadow-lg shadow-purple-500/25'
                      : 'border-slate-300/50 dark:border-slate-700/50 bg-slate-50/30 dark:bg-slate-800/30 hover:border-slate-400/50 dark:hover:border-slate-600/50 hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="text-xl sm:text-2xl mb-2 text-center">{level.icon}</div>
                  <div className="text-slate-900 dark:text-white font-medium text-sm sm:text-base text-center leading-tight">{level.label}</div>
                </div>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="duration"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-slate-900 dark:text-white text-base sm:text-lg mb-3 sm:mb-4 block">Interview Duration</FormLabel>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {durations.map((duration) => (
                <div
                  key={duration.value}
                  onClick={() => field.onChange(duration.value)}
                  className={`p-3 sm:p-4 rounded-lg border cursor-pointer transition-all duration-300 hover:scale-[1.02] text-center touch-manipulation min-h-[70px] flex flex-col justify-center ${
                    field.value === duration.value
                      ? 'border-teal-500/50 bg-teal-100/50 dark:bg-teal-500/20 shadow-lg shadow-teal-500/25'
                      : 'border-slate-300/50 dark:border-slate-700/50 bg-slate-50/30 dark:bg-slate-800/30 hover:border-slate-400/50 dark:hover:border-slate-600/50 hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="text-lg sm:text-xl mb-1">{duration.icon}</div>
                  <div className="text-slate-900 dark:text-white text-xs sm:text-sm font-medium leading-tight">{duration.label}</div>
                </div>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-3 sm:p-6">
      <div className="max-w-5xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-500/20 to-teal-500/20 rounded-2xl mb-6 border border-purple-500/30 backdrop-blur-sm">
            <BrainCircuit className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400 animate-pulse" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent mb-4">
            Create AI Interview
          </h1>
          <p className="text-slate-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">Design your personalized AI-powered interview experience with advanced evaluation</p>
        </div>

        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Enhanced Main Form Card */}
        <Card className="bg-white/80 dark:bg-slate-900/80 border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
          <CardContent className="p-4 sm:p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                
                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 pt-6 sm:pt-8 border-t border-slate-200 dark:border-gray-800">
                  <Button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    variant="outline"
                    className="bg-slate-100/50 dark:bg-slate-800/50 border-slate-300/50 dark:border-slate-700/50 text-slate-900 dark:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50 disabled:opacity-50 hover:scale-[1.02] transition-all duration-300 h-12 touch-manipulation order-2 sm:order-1"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                  
                  {currentStep < 2 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="bg-gradient-to-r from-purple-500 to-teal-500 text-white hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-purple-500/25 h-12 touch-manipulation order-1 sm:order-2"
                    >
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-purple-500 to-teal-500 text-white hover:scale-[1.02] transition-all duration-300 min-w-32 shadow-lg hover:shadow-purple-500/25 disabled:opacity-70 disabled:cursor-not-allowed h-12 touch-manipulation order-1 sm:order-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Zap className="w-4 h-4 mr-2 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Create Interview
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Enhanced Feature Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
          <div className="group bg-white/80 dark:bg-slate-900/80 border border-slate-200/50 dark:border-slate-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-purple-500/20 hover:border-purple-500/50 touch-manipulation">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100/80 dark:bg-purple-500/20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-purple-200/80 dark:group-hover:bg-purple-500/30 transition-all group-hover:scale-110">
              <Code className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-slate-900 dark:text-white font-semibold mb-2 sm:mb-3 text-base sm:text-lg group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">AI-Powered Questions</h3>
            <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed group-hover:text-slate-700 dark:group-hover:text-gray-300 transition-colors">Dynamic questions tailored to your role and experience level</p>
          </div>
          <div className="group bg-white/80 dark:bg-slate-900/80 border border-slate-200/50 dark:border-slate-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-teal-500/20 hover:border-teal-500/50 touch-manipulation">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-teal-100/80 dark:bg-teal-500/20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-teal-200/80 dark:group-hover:bg-teal-500/30 transition-all group-hover:scale-110">
              <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-teal-600 dark:text-teal-400" />
            </div>
            <h3 className="text-slate-900 dark:text-white font-semibold mb-2 sm:mb-3 text-base sm:text-lg group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors">Real-time Feedback</h3>
            <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed group-hover:text-slate-700 dark:group-hover:text-gray-300 transition-colors">Instant analysis and improvement suggestions</p>
          </div>
          <div className="group bg-white/80 dark:bg-slate-900/80 border border-slate-200/50 dark:border-slate-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-amber-500/20 hover:border-amber-500/50 sm:col-span-2 lg:col-span-1 touch-manipulation">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-amber-100/80 dark:bg-amber-500/20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-amber-200/80 dark:group-hover:bg-amber-500/30 transition-all group-hover:scale-110">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="text-slate-900 dark:text-white font-semibold mb-2 sm:mb-3 text-base sm:text-lg group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">Industry Standards</h3>
            <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed group-hover:text-slate-700 dark:group-hover:text-gray-300 transition-colors">Questions based on real industry practices</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateInterview
