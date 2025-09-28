'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import axios from 'axios'

export default function InterviewPage() {
    const { id } = useParams()
    const router = useRouter()
    const [questions, setQuestions] = useState(null)
    const [currentQ, setCurrentQ] = useState(0)
    const [answers, setAnswers] = useState({})
    const [timeLeft, setTimeLeft] = useState(180)
    const [loading, setLoading] = useState(true)
    const [evaluating, setEvaluating] = useState(false)

    // Get questions when page loads
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                // Get stored interview data
                const storedData = localStorage.getItem('interviewData')
                const interviewData = storedData ? JSON.parse(storedData) : {
                    fieldname: 'Frontend Developer',
                    position: 'Senior Developer', 
                    company: 'Tech Company',
                    experience: '3 years'
                }
                
                const response = await axios.post('/api/getquestions', {
                    fieldname: interviewData.fieldname,
                    position: interviewData.position, 
                    company: interviewData.company,
                    experience: interviewData.fieldname // Using fieldname as experience level
                })
                // API returns {success: true, message: Array(18)}
                const questionsArray = response.data?.message || response.data?.data || []
                console.log('Questions Array:', questionsArray)
                
                if (Array.isArray(questionsArray) && questionsArray.length > 0) {
                    setQuestions(questionsArray)
                } else {
                    setQuestions([])
                }
                setLoading(false)
            } catch (error) {
                console.error('Error fetching questions:', error)
                setQuestions([])
                setLoading(false)
            }
        }
        fetchQuestions()
    }, [])

    // Timer countdown
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
            return () => clearTimeout(timer)
        }
    }, [timeLeft])

    const saveCurrentAnswer = () => {
        const textarea = document.getElementById('answer') as HTMLTextAreaElement
        if (textarea) {
            setAnswers({...answers, [currentQ]: textarea.value})
        }
    }

    const nextQuestion = () => {
        saveCurrentAnswer()
        if (questions?.length && currentQ < questions.length - 1) {
            setCurrentQ(currentQ + 1)
            setTimeLeft(180) // Reset timer for next question
        } else {
            finishInterview()
        }
    }

    const previousQuestion = () => {
        saveCurrentAnswer()
        if (currentQ > 0) {
            setCurrentQ(currentQ - 1)
            setTimeLeft(180)
        }
    }

    const finishInterview = async () => {
        if (evaluating) return
        setEvaluating(true)
        saveCurrentAnswer()
        
        // Convert answers object to array format expected by API
        const allAnswers = (questions || []).map((_, index) => ({
            qid: index + 1,
            answer: answers[index] || ''
        }))



        try {
            const evaluation = await axios.post('/api/evaluate', {
                questions: questions || [],
                allAnswers
            })
            

            
            // Store results in localStorage to avoid URL length limits
            const resultData = evaluation.data?.message || evaluation.data
            localStorage.setItem('interviewResults', JSON.stringify(resultData))
            router.push(`/interview/${id}/results`)
        } catch (error) {
            console.error('Error evaluating interview:', error)
            if (error.code === 'ECONNABORTED' || error.response?.status === 500) {
                alert('Interview evaluation is taking longer than expected. Please wait and try again.')
            } else {
                alert('Error evaluating interview. Please try again.')
            }
        } finally {
            setEvaluating(false)
        }
    }


    
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-6">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-purple-400/30 border-t-purple-400 rounded-full animate-spin mx-auto mb-6"></div>
                    <div className="text-white text-xl sm:text-2xl font-semibold mb-2">Preparing Your Interview</div>
                    <div className="text-gray-400">Generating personalized questions with AI...</div>
                </div>
            </div>
        )
    }

    if (!questions || questions.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-6">
                <div className="text-center">
                    <div className="text-6xl mb-6">🤔</div>
                    <div className="text-white text-xl sm:text-2xl font-semibold mb-2">No Questions Available</div>
                    <div className="text-gray-400 mb-6">There seems to be an issue loading your interview questions.</div>
                    <Button onClick={() => window.location.reload()} className="bg-purple-600 hover:bg-purple-700">
                        Try Again
                    </Button>
                </div>
            </div>
        )
    }

    const currentQuestion = questions?.[currentQ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-3 sm:p-6">
            <div className="max-w-5xl mx-auto">
                {/* Enhanced Header */}
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-4 sm:p-6 mb-6 shadow-2xl">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <div>
                            <h1 className="text-white text-xl sm:text-2xl font-bold mb-1">
                                Question {currentQ + 1} of {questions?.length || 0}
                            </h1>
                            <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
                                <div 
                                    className="bg-gradient-to-r from-purple-400 to-teal-400 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${questions?.length ? ((currentQ + 1) / questions.length) * 100 : 0}%` }}
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className={`text-lg sm:text-xl font-bold px-4 py-2 rounded-full border-2 transition-all ${
                                timeLeft <= 30 ? 'text-red-400 border-red-400 bg-red-400/10 animate-pulse' :
                                timeLeft <= 60 ? 'text-yellow-400 border-yellow-400 bg-yellow-400/10' :
                                'text-green-400 border-green-400 bg-green-400/10'
                            }`}>
                                ⏱️ {Math.floor(timeLeft/60)}:{(timeLeft%60).toString().padStart(2,'0')}
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Enhanced Question Card */}
                <Card className="bg-gray-900/70 backdrop-blur-sm border-gray-800 p-4 sm:p-8 mb-6 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-400 to-teal-400 text-white">
                            {currentQuestion?.round?.toUpperCase()} ROUND
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-800 text-gray-300 border border-gray-700">
                            Difficulty: {currentQuestion?.difficulty}
                        </span>
                    </div>
                    <h2 className="text-white text-lg sm:text-xl leading-relaxed">
                        {currentQuestion?.content}
                    </h2>
                </Card>

                {/* Enhanced Answer Input */}
                <Card className="bg-gray-900/70 backdrop-blur-sm border-gray-800 p-4 sm:p-6 mb-6 shadow-2xl">
                    <label className="text-gray-300 block mb-3 font-medium">Your Answer:</label>
                    <textarea
                        id="answer"
                        placeholder="Type your detailed answer here... Be specific and provide examples where possible."
                        className="w-full h-48 sm:h-64 bg-gray-800/50 text-white p-4 rounded-xl border border-gray-700 resize-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 focus:outline-none transition-all duration-200 placeholder-gray-500"
                        defaultValue={answers[currentQ] || ''}
                        key={currentQ}
                    />
                    <div className="flex justify-between items-center mt-3 text-sm text-gray-400">
                        <span>💡 Tip: Provide detailed explanations and examples</span>
                        <span>{(answers[currentQ] || '').length} characters</span>
                    </div>
                </Card>

                {/* Enhanced Navigation */}
                <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
                    <Button 
                        onClick={previousQuestion}
                        disabled={currentQ === 0}
                        className="bg-gray-700/80 hover:bg-gray-600 disabled:opacity-50 backdrop-blur-sm border border-gray-600 px-6 py-3 text-white font-medium transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                    >
                        ← Previous Question
                    </Button>
                    
                    <Button 
                        onClick={nextQuestion}
                        disabled={evaluating}
                        className="bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600 px-6 py-3 text-white font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        {evaluating ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                Evaluating...
                            </>
                        ) : (
                            questions?.length && currentQ === questions.length - 1 ? '🏁 Finish Interview' : 'Next Question →'
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}