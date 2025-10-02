'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle, Download, Home, Trophy, Award, TrendingUp, Target, Zap } from 'lucide-react'

export default function ResultsPage() {
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
    
    // Prevent back navigation to interview page
    useEffect(() => {
        const handlePopState = (event: PopStateEvent) => {
            event.preventDefault()
            router.push('/dashboard')
        }
        
        window.addEventListener('popstate', handlePopState)
        
        // Replace current history entry to prevent back navigation
        window.history.pushState(null, '', window.location.href)
        
        return () => {
            window.removeEventListener('popstate', handlePopState)
        }
    }, [router])
    const [results, setResults] = useState<{
        finalDecision?: { selected?: boolean; message?: string };
        technicalRound?: { score?: number; correctAnswers?: number; totalQuestions?: number };
        codingRound?: { functionalityScore?: number; codeQuality?: number };
        personalityRound?: { communicationScore?: number; culturalFit?: number };
        report?: { strengths?: string[]; weaknesses?: string[]; improvements?: string[]; nextSteps?: string[] };
    } | null>(null)
    
    const downloadPDF = useCallback((resultData = results) => {
        if (!resultData) return
        
        const reportContent = `INTERVIEW REPORT\n\n` +
            `Final Decision: ${resultData.finalDecision?.selected ? 'SELECTED' : 'NOT SELECTED'}\n` +
            `Message: ${resultData.finalDecision?.message || 'No message'}\n\n` +
            `SCORES:\n` +
            `Technical: ${resultData.technicalRound?.score || 0}%\n` +
            `Coding: ${resultData.codingRound?.functionalityScore || 0}%\n` +
            `Communication: ${resultData.personalityRound?.communicationScore || 0}%\n\n` +
            `STRENGTHS:\n${resultData.report?.strengths?.map(s => `• ${s}`).join('\n') || '• None recorded'}\n\n` +
            `IMPROVEMENTS:\n${resultData.report?.weaknesses?.map(w => `• ${w}`).join('\n') || '• None recorded'}`
        
        const blob = new Blob([reportContent], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `interview-report-${new Date().toISOString().split('T')[0]}.pdf`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }, [results])
    
    useEffect(() => {
        // Check if URL has old data parameter and extract it
        const urlParams = new URLSearchParams(window.location.search)
        const urlData = urlParams.get('data')
        
        if (urlData) {
            try {
                const parsedData = JSON.parse(decodeURIComponent(urlData))
                const resultData = parsedData.data || parsedData
                setResults(resultData)
                // Clean URL by removing the data parameter
                window.history.replaceState({}, '', window.location.pathname)
                
                // Save to interview history
                const interviewId = Date.now().toString()
                const interviewDataStr = localStorage.getItem('interviewData')
                const historyData = {
                    ...resultData,
                    date: new Date().toISOString(),
                    position: interviewDataStr ? JSON.parse(interviewDataStr).fieldname : 'Unknown Position'
                }
                localStorage.setItem(`interview_${interviewId}`, JSON.stringify(historyData))
                
            } catch (error) {
                console.error('Error parsing URL data:', error)
            }
        } else {
            // Try localStorage
            const storedResults = localStorage.getItem('interviewResults')
            if (storedResults) {
                try {
                    const resultData = JSON.parse(storedResults)
                    setResults(resultData)
                    
                    // Save to interview history if not already saved
                    const interviewId = Date.now().toString()
                    const historyData = {
                        ...resultData,
                        date: new Date().toISOString(),
                        position: (() => {
                            const data = localStorage.getItem('interviewData')
                            return data ? JSON.parse(data).fieldname : 'Unknown Position'
                        })()
                    }
                    localStorage.setItem(`interview_${interviewId}`, JSON.stringify(historyData))
                    
                } catch (error) {
                    console.error('Error parsing stored results:', error)
                }
            }
        }
        
        // Clear interview session data to prevent returning to completed interview
        localStorage.removeItem('interviewResults')
        localStorage.removeItem('interviewData')
    }, [])

    if (!results) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:bg-gray-950 flex items-center justify-center">
                <div className="text-slate-900 dark:text-white text-xl">No results available</div>
            </div>
        )
    }

    const isSelected = results.finalDecision?.selected
    const technicalScore = results.technicalRound?.score || 0
    const codingScore = results.codingRound?.functionalityScore || 0
    const communicationScore = results.personalityRound?.communicationScore || 0

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-3 sm:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Enhanced Header */}
                <div className="text-center mb-8 sm:mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-500/20 to-teal-500/20 rounded-2xl mb-6 border border-purple-500/30 backdrop-blur-sm">
                        <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400 animate-pulse" />
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent mb-4">
                        Interview Results
                    </h1>
                    <p className="text-slate-600 dark:text-gray-400 text-lg">Your comprehensive AI-powered evaluation</p>
                </div>

                {/* Enhanced Final Decision */}
                <Card className={`bg-gradient-to-r backdrop-blur-sm border-2 p-6 sm:p-10 mb-8 text-center shadow-2xl transition-all duration-500 ${
                    isSelected 
                        ? 'from-green-100/80 to-emerald-100/80 dark:from-green-900/30 dark:to-emerald-900/30 border-green-500/70 dark:border-green-400/50 hover:shadow-green-400/20' 
                        : 'from-red-100/80 to-rose-100/80 dark:from-red-900/30 dark:to-rose-900/30 border-red-500/70 dark:border-red-400/50 hover:shadow-red-400/20'
                }`}>
                    <div className={`inline-flex items-center gap-3 text-2xl sm:text-4xl font-bold mb-6 animate-bounce ${
                        isSelected ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                        {isSelected ? <CheckCircle className="w-8 h-8 sm:w-12 sm:h-12" /> : <XCircle className="w-8 h-8 sm:w-12 sm:h-12" />}
                        <span className={`bg-gradient-to-r bg-clip-text text-transparent ${
                            isSelected ? 'from-green-600 to-emerald-600 dark:from-green-300 dark:to-emerald-300' : 'from-red-600 to-rose-600 dark:from-red-300 dark:to-rose-300'
                        }`}>
                            {isSelected ? 'CONGRATULATIONS!' : 'KEEP IMPROVING!'}
                        </span>
                    </div>
                    <div className={`text-lg sm:text-2xl mb-6 font-semibold flex items-center justify-center gap-2 ${isSelected ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                        {isSelected ? (
                            <>
                                <Zap className="w-6 h-6" />
                                You have been selected for the next round!
                            </>
                        ) : (
                            <>
                                <Target className="w-6 h-6" />
                                Keep practicing and try again!
                            </>
                        )}
                    </div>
                    <p className="text-slate-700 dark:text-gray-300 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
                        {results.finalDecision?.message}
                    </p>
                </Card>

                {/* Enhanced Score Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
                    <Card className="bg-white/80 dark:bg-slate-900/80 border-slate-200/50 dark:border-slate-700/50 p-6 text-center hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-blue-500/20 hover:border-blue-500/50">
                        <div className="w-16 h-16 bg-blue-100/80 dark:bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Award className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-blue-700 dark:text-blue-300 font-bold text-lg mb-3">Technical Round</h3>
                        <div className="relative mb-4">
                            <div className="text-4xl sm:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">{technicalScore}%</div>
                            <div className="w-full bg-slate-200 dark:bg-gray-800 rounded-full h-2">
                                <div 
                                    className="bg-gradient-to-r from-blue-400 to-blue-500 h-2 rounded-full transition-all duration-1000"
                                    style={{ width: `${technicalScore}%` }}
                                />
                            </div>
                        </div>
                        <div className="text-slate-600 dark:text-gray-400 text-sm">
                            {results.technicalRound?.correctAnswers || 0} / {results.technicalRound?.totalQuestions || 0} correct
                        </div>
                    </Card>

                    <Card className="bg-white/80 dark:bg-slate-900/80 border-slate-200/50 dark:border-slate-700/50 p-6 text-center hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-green-500/20 hover:border-green-500/50">
                        <div className="w-16 h-16 bg-green-100/80 dark:bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-green-700 dark:text-green-300 font-bold text-lg mb-3">Skills Round</h3>
                        <div className="relative mb-4">
                            <div className="text-4xl sm:text-5xl font-bold text-green-600 dark:text-green-400 mb-2">{codingScore}%</div>
                            <div className="w-full bg-slate-200 dark:bg-gray-800 rounded-full h-2">
                                <div 
                                    className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-1000"
                                    style={{ width: `${codingScore}%` }}
                                />
                            </div>
                        </div>
                        <div className="text-slate-600 dark:text-gray-400 text-sm">
                            Code Quality: {results.codingRound?.codeQuality || 0}%
                        </div>
                    </Card>

                    <Card className="bg-white/80 dark:bg-slate-900/80 border-slate-200/50 dark:border-slate-700/50 p-6 text-center hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-purple-500/20 hover:border-purple-500/50 sm:col-span-2 lg:col-span-1">
                        <div className="w-16 h-16 bg-purple-100/80 dark:bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Target className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h3 className="text-purple-700 dark:text-purple-300 font-bold text-lg mb-3">Communication</h3>
                        <div className="relative mb-4">
                            <div className="text-4xl sm:text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">{communicationScore}%</div>
                            <div className="w-full bg-slate-200 dark:bg-gray-800 rounded-full h-2">
                                <div 
                                    className="bg-gradient-to-r from-purple-400 to-purple-500 h-2 rounded-full transition-all duration-1000"
                                    style={{ width: `${communicationScore}%` }}
                                />
                            </div>
                        </div>
                        <div className="text-slate-600 dark:text-gray-400 text-sm">
                            Cultural Fit: {results.personalityRound?.culturalFit || 0}%
                        </div>
                    </Card>
                </div>

                {/* Detailed Report */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Strengths */}
                    <Card className="bg-white/80 dark:bg-slate-900/80 border-slate-200/50 dark:border-slate-700/50 p-6 hover:shadow-emerald-500/10 transition-all">
                        <h3 className="text-emerald-600 dark:text-emerald-400 font-bold text-xl mb-4 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5" />
                            Strengths
                        </h3>
                        <ul className="space-y-2">
                            {results.report?.strengths?.map((strength, index) => (
                                <li key={index} className="text-slate-700 dark:text-gray-300 flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                                    {strength}
                                </li>
                            )) || <li className="text-slate-600 dark:text-gray-400">No strengths recorded</li>}
                        </ul>
                    </Card>

                    {/* Areas for Improvement */}
                    <Card className="bg-white/80 dark:bg-slate-900/80 border-slate-200/50 dark:border-slate-700/50 p-6 hover:shadow-amber-500/10 transition-all">
                        <h3 className="text-amber-600 dark:text-amber-400 font-bold text-xl mb-4 flex items-center gap-2">
                            <XCircle className="w-5 h-5" />
                            Areas for Improvement
                        </h3>
                        <ul className="space-y-2">
                            {results.report?.weaknesses?.map((weakness, index) => (
                                <li key={index} className="text-slate-700 dark:text-gray-300 flex items-start gap-2">
                                    <XCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-1 flex-shrink-0" />
                                    {weakness}
                                </li>
                            )) || <li className="text-slate-600 dark:text-gray-400">No weaknesses recorded</li>}
                        </ul>
                    </Card>
                </div>

                {/* Recommendations */}
                <Card className="bg-white/80 dark:bg-slate-900/80 border-slate-200/50 dark:border-slate-700/50 p-6 mb-8 hover:shadow-teal-500/10 transition-all">
                    <h3 className="text-teal-600 dark:text-teal-400 font-bold text-xl mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Recommendations
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-slate-900 dark:text-white font-semibold mb-2">Improvement Tips</h4>
                            <ul className="space-y-1">
                                {results.report?.improvements?.map((tip, index) => (
                                    <li key={index} className="text-slate-700 dark:text-gray-300 text-sm">• {tip}</li>
                                )) || <li className="text-slate-600 dark:text-gray-400">No tips available</li>}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-slate-900 dark:text-white font-semibold mb-2">Next Steps</h4>
                            <ul className="space-y-1">
                                {results.report?.nextSteps?.map((step, index) => (
                                    <li key={index} className="text-slate-700 dark:text-gray-300 text-sm">• {step}</li>
                                )) || <li className="text-slate-600 dark:text-gray-400">No next steps available</li>}
                            </ul>
                        </div>
                    </div>
                </Card>

                {/* Enhanced Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button 
                        onClick={() => router.push('/dashboard')}
                        className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 px-6 py-3 text-white font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-purple-500/25 w-full sm:w-auto"
                    >
                        <Home className="w-4 h-4 mr-2" />
                        Back to Dashboard
                    </Button>
                    
                    <Button 
                        onClick={() => downloadPDF()}
                        className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 px-6 py-3 text-white font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-teal-500/25 w-full sm:w-auto"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Download Report Again
                    </Button>
                    
                    <Button 
                        onClick={() => router.push('/interview/CreateInterview')}
                        className="bg-slate-200/50 dark:bg-slate-800/50 hover:bg-slate-300/50 dark:hover:bg-slate-700 border border-slate-300/50 dark:border-slate-600/50 text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white px-6 py-3 font-medium transition-all duration-200 hover:scale-[1.02] w-full sm:w-auto"
                    >
                        <Zap className="w-4 h-4 mr-2" />
                        Take Another Interview
                    </Button>
                </div>
            </div>
        </div>
    )
}