'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SlideData {
  id: number
  title: string
  description: string
  image: string
  bgColor: string
}

const slides: SlideData[] = [
  {
    id: 1,
    title: "AI-Powered Mock Interviews",
    description: "Practice with realistic interview scenarios tailored to your industry",
    image: "/api/placeholder/400/300",
    bgColor: "bg-blue-50"
  },
  {
    id: 2,
    title: "Real-time Feedback",
    description: "Get instant analysis of your responses, body language, and communication skills",
    image: "/api/placeholder/400/300", 
    bgColor: "bg-green-50"
  },
  {
    id: 3,
    title: "Industry-Specific Questions",
    description: "Access curated questions for Tech, Finance, Marketing, and more",
    image: "/api/placeholder/400/300",
    bgColor: "bg-purple-50"
  },
  {
    id: 4,
    title: "Progress Analytics",
    description: "Track your improvement with detailed performance metrics",
    image: "/api/placeholder/400/300",
    bgColor: "bg-orange-50"
  }
]

export default function StackedImageSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <div className="relative w-full max-w-4xl mx-auto h-96 overflow-hidden">
      {/* Stacked Cards */}
      <div className="relative h-full">
        {slides.map((slide, index) => {
          const offset = index - currentSlide
          const isActive = index === currentSlide
          
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-500 ease-in-out ${slide.bgColor} rounded-xl shadow-lg border`}
              style={{
                transform: `translateX(${offset * 20}px) translateY(${Math.abs(offset) * 10}px) scale(${isActive ? 1 : 0.95 - Math.abs(offset) * 0.05})`,
                zIndex: slides.length - Math.abs(offset),
                opacity: Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.2
              }}
            >
              <div className="flex h-full">
                {/* Content Side */}
                <div className="flex-1 p-8 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {slide.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {slide.description}
                  </p>
                </div>
                
                {/* Image Side */}
                <div className="flex-1 p-4">
                  <div className="w-full h-full bg-white rounded-lg shadow-inner flex items-center justify-center">
                    <div className="text-gray-400 text-center">
                      <div className="w-32 h-32 bg-gray-200 rounded-lg mx-auto mb-4"></div>
                      <p className="text-sm">Screenshot Preview</p>
                      <p className="text-xs">{slide.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Navigation Arrows */}
      <Button
        onClick={prevSlide}
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full shadow-lg"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      
      <Button
        onClick={nextSlide}
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full shadow-lg"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <Button
            key={index}
            onClick={() => setCurrentSlide(index)}
            variant={index === currentSlide ? "default" : "outline"}
            size="sm"
            className={`w-3 h-3 p-0 rounded-full transition-all ${
              index === currentSlide ? 'bg-blue-600' : 'bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  )
}