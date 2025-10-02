'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Clock, ChevronLeft, ChevronRight, Flag, Loader2, Brain, Code, MessageCircle } from 'lucide-react'
import axios from 'axios'

interface Question {
    qid: number
    content: string
    difficulty: string
    round: string
    timeLimit: number
}

export default function InterviewPage() {
    const { id } = useParams()
    const router = useRouter()
    const { data: session, status } = useSession()
    
    // Auth check
    useEffect(() => {
        if (status === 'loading') return
        if (!session) {
            router.push('/sign-in')
            return
        }
    }, [session, status, router])
    const [questions, setQuestions] = useState<Question[] | null>(null)
    const [currentQ, setCurrentQ] = useState(0)
    const [answers, setAnswers] = useState<Record<number, string>>({})
    const [timeLeft, setTimeLeft] = useState(180)
    const [loading, setLoading] = useState(true)
    const [evaluating, setEvaluating] = useState(false)
    const [showTimeUpPopup, setShowTimeUpPopup] = useState(false)
    const [timerActive, setTimerActive] = useState(true)

    // Get questions when page loads
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                // Get stored interview data
                const storedData = localStorage.getItem('interviewData')
                if (!storedData) {
                    // No interview session, redirect to create interview
                    router.push('/interview/CreateInterview')
                    return
                }
                const interviewData = JSON.parse(storedData)
                
                const response = await axios.post('/api/getquestions', {
                    fieldname: interviewData.fieldname,
                    position: interviewData.position, 
                    company: interviewData.company,
                    experience: interviewData.fieldname // Using fieldname as experience level
                })
                // API returns {success: true, message: Array(18)}
                const questionsArray = response.data?.message || response.data?.data || []

                
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
    }, [router])

    // Timer countdown
    useEffect(() => {
        if (timeLeft > 0 && timerActive) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
            return () => clearTimeout(timer)
        } else if (timeLeft === 0 && timerActive) {
            setShowTimeUpPopup(true)
            setTimerActive(false)
        }
    }, [timeLeft, timerActive])

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
            setTimerActive(true)
            setShowTimeUpPopup(false)
        } else {
            finishInterview()
        }
    }

    const previousQuestion = () => {
        saveCurrentAnswer()
        if (currentQ > 0) {
            setCurrentQ(currentQ - 1)
            setTimeLeft(180)
            setTimerActive(true)
            setShowTimeUpPopup(false)
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
            if (error instanceof Error && 'code' in error && error.code === 'ECONNABORTED' || 
                (error && typeof error === 'object' && 'response' in error && (error as {response: {status: number}}).response?.status === 500)) {
                alert('Interview evaluation is taking longer than expected. Please wait and try again.')
            } else {
                alert('Error evaluating interview. Please try again.')
            }
        } finally {
            setEvaluating(false)
        }
    }


    
    if (status === 'loading' || !session) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-6">
                <div className="text-center">
                    <div className="text-slate-900 dark:text-white text-xl sm:text-2xl font-semibold mb-2">Checking Authentication...</div>
                </div>
            </div>
        )
    }
    
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-6">
                <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100/80 dark:bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-purple-300/50 dark:border-purple-500/30">
                        <Loader2 className="w-8 h-8 text-purple-600 dark:text-purple-400 animate-spin" />
                    </div>
                    <div className="text-slate-900 dark:text-white text-xl sm:text-2xl font-semibold mb-2">Preparing Your Interview</div>
                    <div className="text-slate-600 dark:text-gray-400">Generating personalized questions with AI...</div>
                </div>
            </div>
        )
    }

    if (!questions || questions.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-6">
                <div className="text-center">
                    <div className="w-20 h-20 bg-slate-200/50 dark:bg-slate-800/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Brain className="w-10 h-10 text-slate-500 dark:text-slate-500" />
                    </div>
                    <div className="text-slate-900 dark:text-white text-xl sm:text-2xl font-semibold mb-2">No Questions Available</div>
                    <div className="text-slate-600 dark:text-gray-400 mb-6">There seems to be an issue loading your interview questions.</div>
                    <Button onClick={() => window.location.reload()} className="bg-purple-600 hover:bg-purple-700 hover:scale-[1.02] transition-all">
                        Try Again
                    </Button>
                </div>
            </div>
        )
    }

    const currentQuestion = questions?.[currentQ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-3 sm:p-6">
            <div className="max-w-5xl mx-auto">
                {/* Enhanced Header */}
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-4 sm:p-6 mb-6 shadow-2xl">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <div className="flex-1">
                            <h1 className="text-slate-900 dark:text-white text-xl sm:text-2xl font-bold mb-3 flex items-center gap-3">
                                <div className="w-8 h-8 bg-purple-100/80 dark:bg-purple-500/20 rounded-lg flex items-center justify-center">
                                    <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                Question {currentQ + 1} of {questions?.length || 0}
                            </h1>
                            <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
                                <div 
                                    className="bg-gradient-to-r from-purple-500 to-teal-500 h-3 rounded-full transition-all duration-500"
                                    style={{ width: `${questions?.length ? ((currentQ + 1) / questions.length) * 100 : 0}%` }}
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className={`flex items-center gap-2 text-lg sm:text-xl font-bold px-4 py-2 rounded-xl border transition-all ${
                                !timerActive ? 'text-gray-400 border-gray-500/50 bg-gray-500/20' :
                                timeLeft <= 30 ? 'text-red-400 border-red-500/50 bg-red-500/20 animate-pulse' :
                                timeLeft <= 60 ? 'text-amber-400 border-amber-500/50 bg-amber-500/20' :
                                'text-emerald-400 border-emerald-500/50 bg-emerald-500/20'
                            }`}>
                                <Clock className="w-5 h-5" />
                                {!timerActive ? 'Time Up' : `${Math.floor(timeLeft/60)}:${(timeLeft%60).toString().padStart(2,'0')}`}
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Enhanced Question Card */}
                <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 p-4 sm:p-8 mb-6 shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-2">
                        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border ${
                            currentQuestion?.round === 'technical' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                            currentQuestion?.round === 'coding' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                            'bg-purple-500/20 text-purple-300 border-purple-500/30'
                        }`}>
                            {currentQuestion?.round === 'technical' ? <Brain className="w-4 h-4" /> :
                             currentQuestion?.round === 'coding' ? <Code className="w-4 h-4" /> :
                             <MessageCircle className="w-4 h-4" />}
                            {currentQuestion?.round === 'coding' ? 'SKILLS' : currentQuestion?.round?.toUpperCase()} ROUND
                        </span>
                        <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm bg-slate-800/50 text-gray-300 border border-slate-600/50">
                            Difficulty: {currentQuestion?.difficulty}
                        </span>
                    </div>
                    <h2 className="text-slate-900 dark:text-white text-lg sm:text-xl leading-relaxed">
                        {currentQuestion?.content}
                    </h2>
                </Card>

                {/* Enhanced Answer Input */}
                <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 p-4 sm:p-6 mb-6 shadow-2xl">
                    <label className="text-slate-700 dark:text-gray-300 block mb-3 font-medium">Your Answer:</label>
                    <textarea
                        id="answer"
                        placeholder="Type your detailed answer here... Be specific and provide examples where possible."
                        className="w-full h-48 sm:h-64 bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white p-4 rounded-xl border border-slate-300/50 dark:border-slate-700/50 resize-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-100 dark:focus:ring-purple-500/20 focus:outline-none transition-all duration-200 placeholder-slate-500 dark:placeholder-gray-500 shadow-sm"
                        defaultValue={answers[currentQ] || ''}
                        key={currentQ}
                    />
                    <div className="flex justify-between items-center mt-3 text-sm text-slate-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                            <Brain className="w-4 h-4" />
                            Tip: Provide detailed explanations and examples
                        </span>
                        <span>{(answers[currentQ] || '').length} characters</span>
                    </div>
                </Card>

                {/* Enhanced Navigation */}
                <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
                    <Button 
                        onClick={previousQuestion}
                        disabled={currentQ === 0}
                        className="bg-slate-200/80 dark:bg-slate-700/80 hover:bg-slate-300/80 dark:hover:bg-slate-600 disabled:opacity-50 backdrop-blur-sm border border-slate-300/50 dark:border-slate-600/50 px-6 py-3 text-slate-900 dark:text-white font-medium transition-all duration-200 hover:scale-[1.02] disabled:hover:scale-100"
                    >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Previous Question
                    </Button>
                    
                    <Button 
                        onClick={nextQuestion}
                        disabled={evaluating}
                        className="bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600 px-6 py-3 text-white font-medium transition-all duration-200 hover:scale-[1.02] shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        {evaluating ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Evaluating...
                            </>
                        ) : (
                            questions?.length && currentQ === questions.length - 1 ? (
                                <>
                                    <Flag className="w-4 h-4 mr-2" />
                                    Finish Interview
                                </>
                            ) : (
                                <>
                                    Next Question
                                    <ChevronRight className="w-4 h-4 ml-2" />
                                </>
                            )
                        )}
                    </Button>
                </div>
                
                {/* Time Up Popup */}
                {showTimeUpPopup && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-md w-full border border-slate-200 dark:border-slate-700 shadow-2xl">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-amber-100 dark:bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Clock className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Time&apos;s Up!</h3>
                                <p className="text-slate-600 dark:text-gray-400 mb-6">
                                    The suggested time for this question has ended. You can continue answering without a timer.
                                </p>
                                <Button 
                                    onClick={() => setShowTimeUpPopup(false)}
                                    className="bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600 px-6 py-2 text-white font-medium transition-all duration-200 hover:scale-105"
                                >
                                    Continue Answering
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}