'use client'
import React, { useState } from 'react'
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
import axios from 'axios'

const interviewSchema = z.object({
  jobTitle: z.string().min(2, 'Job title must be at least 2 characters'),
  experienceLevel: z.string().min(1, 'Please select experience level'),
  duration: z.string().min(1, 'Please select duration')
})

const CreateInterview = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const form = useForm<z.infer<typeof interviewSchema>>({
    resolver: zodResolver(interviewSchema),
    defaultValues: {
      jobTitle: '',
      experienceLevel: '',
      duration: ''
    }
  })

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
      const payload = {
        position: data.jobTitle,
        company: 'General',
        fieldname: data.experienceLevel,
        duration: data.duration
      }
      const response = await axios.post('/api/InterviewHandler', payload)
      console.log('Interview created:', response.data)
    } catch (error) {
      console.error('Error creating interview:', error)
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
        <h2 className="text-2xl font-bold text-white mb-2">Interview Basics</h2>
        <p className="text-gray-400">Let&apos;s start with the fundamentals</p>
      </div>
      
      <FormField
        control={form.control}
        name="jobTitle"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white text-lg">Job Title</FormLabel>
            <FormControl>
              <Input 
                {...field}
                placeholder="e.g., Senior Frontend Developer"
                className="bg-gray-800/50 border-gray-700 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 text-white placeholder-gray-400 h-12 text-lg transition-all duration-200"
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
        <h2 className="text-2xl font-bold text-white mb-2">Interview Configuration</h2>
        <p className="text-gray-400">Customize your interview settings</p>
      </div>
      
      <FormField
        control={form.control}
        name="experienceLevel"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white text-lg mb-4 block">Experience Level</FormLabel>
            <div className="grid grid-cols-2 gap-4">
              {experienceLevels.map((level) => (
                <div
                  key={level.value}
                  onClick={() => field.onChange(level.value)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                    field.value === level.value
                      ? 'border-purple-400 bg-purple-400/10 shadow-lg'
                      : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
                  }`}
                >
                  <div className="text-2xl mb-2">{level.icon}</div>
                  <div className="text-white font-medium">{level.label}</div>
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
            <FormLabel className="text-white text-lg mb-4 block">Interview Duration</FormLabel>
            <div className="grid grid-cols-4 gap-3">
              {durations.map((duration) => (
                <div
                  key={duration.value}
                  onClick={() => field.onChange(duration.value)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all duration-300 hover:scale-105 text-center ${
                    field.value === duration.value
                      ? 'border-teal-400 bg-teal-400/10 shadow-lg'
                      : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
                  }`}
                >
                  <div className="text-xl mb-1">{duration.icon}</div>
                  <div className="text-white text-sm font-medium">{duration.label}</div>
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
    <div className="min-h-screen bg-gray-950 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent mb-4">
            Create AI Interview
          </h1>
          <p className="text-gray-400 text-lg">Design your personalized AI-powered interview experience</p>
        </div>

        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Main Form Card */}
        <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm shadow-2xl">
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                
                {/* Navigation Buttons */}
                <div className="flex justify-between pt-8 border-t border-gray-800">
                  <Button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    variant="outline"
                    className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 disabled:opacity-50"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                  
                  {currentStep < 2 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="bg-gradient-to-r from-purple-400 to-teal-400 text-white hover:scale-105 transition-all duration-300"
                    >
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-purple-400 to-teal-400 text-white hover:scale-105 transition-all duration-300 min-w-32"
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

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 text-center hover:border-purple-400 transition-all duration-300 hover:scale-105">
            <Code className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">AI-Powered Questions</h3>
            <p className="text-gray-400 text-sm">Dynamic questions tailored to your role and experience</p>
          </div>
          <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 text-center hover:border-teal-400 transition-all duration-300 hover:scale-105">
            <MessageSquare className="w-12 h-12 text-teal-400 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">Real-time Feedback</h3>
            <p className="text-gray-400 text-sm">Instant analysis and improvement suggestions</p>
          </div>
          <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 text-center hover:border-yellow-400 transition-all duration-300 hover:scale-105">
            <Users className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">Industry Standards</h3>
            <p className="text-gray-400 text-sm">Questions based on real industry practices</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateInterview
