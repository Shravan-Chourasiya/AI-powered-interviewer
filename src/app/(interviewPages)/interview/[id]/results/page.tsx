'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle, Download, Home, Trophy, Award, TrendingUp, Target, Zap } from 'lucide-react'

export default function ResultsPage() {
    const router = useRouter()
    const [results, setResults] = useState<{
        finalDecision?: { selected?: boolean; message?: string };
        technicalRound?: { score?: number; correctAnswers?: number; totalQuestions?: number };
        codingRound?: { functionalityScore?: number; codeQuality?: number };
        personalityRound?: { communicationScore?: number; culturalFit?: number };
        report?: { strengths?: string[]; weaknesses?: string[]; improvements?: string[]; nextSteps?: string[] };
    } | null>(null)
    
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
    }, [])

    const downloadPDF = () => {
        if (!results) return
        
        const printWindow = window.open('', '_blank')
        const htmlContent = `
            <html>
            <head>
                <title>Interview Report</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    .header { text-align: center; margin-bottom: 30px; }
                    .score-card { border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 5px; }
                    .selected { background-color: #d4edda; }
                    .rejected { background-color: #f8d7da; }
                    .section { margin: 20px 0; }
                    ul { margin: 10px 0; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>Interview Report</h1>
                    <p>AI-Powered Interview Evaluation</p>
                </div>
                
                <div class="score-card ${results.finalDecision?.selected ? 'selected' : 'rejected'}">
                    <h2>Final Decision: ${results.finalDecision?.selected ? 'SELECTED' : 'NOT SELECTED'}</h2>
                    <p>${results.finalDecision?.message || 'No message available'}</p>
                </div>
                
                <div class="section">
                    <h3>Scores</h3>
                    <p>Technical: ${results.technicalRound?.score || 0}%</p>
                    <p>Coding: ${results.codingRound?.functionalityScore || 0}%</p>
                    <p>Communication: ${results.personalityRound?.communicationScore || 0}%</p>
                </div>
                
                <div class="section">
                    <h3>Strengths</h3>
                    <ul>
                        ${results.report?.strengths?.map((s: string) => `<li>${s}</li>`).join('') || '<li>No strengths recorded</li>'}
                    </ul>
                </div>
                
                <div class="section">
                    <h3>Areas for Improvement</h3>
                    <ul>
                        ${results.report?.weaknesses?.map((w: string) => `<li>${w}</li>`).join('') || '<li>No weaknesses recorded</li>'}
                    </ul>
                </div>
                
                <div class="section">
                    <h3>Recommendations</h3>
                    <ul>
                        ${results.report?.improvements?.map((i: string) => `<li>${i}</li>`).join('') || '<li>No recommendations available</li>'}
                    </ul>
                </div>
            </body>
            </html>
        `
        
        printWindow?.document.write(htmlContent)
        printWindow?.document.close()
        printWindow?.print()
    }

    if (!results) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <div className="text-white text-xl">No results available</div>
            </div>
        )
    }

    const isSelected = results.finalDecision?.selected
    const technicalScore = results.technicalRound?.score || 0
    const codingScore = results.codingRound?.functionalityScore || 0
    const communicationScore = results.personalityRound?.communicationScore || 0

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-3 sm:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Enhanced Header */}
                <div className="text-center mb-8 sm:mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-500/20 to-teal-500/20 rounded-2xl mb-6 border border-purple-500/30 backdrop-blur-sm">
                        <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400 animate-pulse" />
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent mb-4">
                        Interview Results
                    </h1>
                    <p className="text-gray-400 text-lg">Your comprehensive AI-powered evaluation</p>
                </div>

                {/* Enhanced Final Decision */}
                <Card className={`bg-gradient-to-r backdrop-blur-sm border-2 p-6 sm:p-10 mb-8 text-center shadow-2xl transition-all duration-500 ${
                    isSelected 
                        ? 'from-green-900/30 to-emerald-900/30 border-green-400/50 hover:shadow-green-400/20' 
                        : 'from-red-900/30 to-rose-900/30 border-red-400/50 hover:shadow-red-400/20'
                }`}>
                    <div className={`inline-flex items-center gap-3 text-2xl sm:text-4xl font-bold mb-6 animate-bounce ${
                        isSelected ? 'text-green-400' : 'text-red-400'
                    }`}>
                        {isSelected ? <CheckCircle className="w-8 h-8 sm:w-12 sm:h-12" /> : <XCircle className="w-8 h-8 sm:w-12 sm:h-12" />}
                        <span className="bg-gradient-to-r bg-clip-text text-transparent ${
                            isSelected ? 'from-green-300 to-emerald-300' : 'from-red-300 to-rose-300'
                        }">
                            {isSelected ? 'CONGRATULATIONS!' : 'KEEP IMPROVING!'}
                        </span>
                    </div>
                    <div className={`text-lg sm:text-2xl mb-6 font-semibold flex items-center justify-center gap-2 ${isSelected ? 'text-green-300' : 'text-red-300'}`}>
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
                    <p className="text-gray-300 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
                        {results.finalDecision?.message}
                    </p>
                </Card>

                {/* Enhanced Score Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
                    <Card className="bg-slate-900/80 border-slate-700/50 p-6 text-center hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-blue-500/20 hover:border-blue-500/50">
                        <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Award className="w-8 h-8 text-blue-400" />
                        </div>
                        <h3 className="text-blue-300 font-bold text-lg mb-3">Technical Round</h3>
                        <div className="relative mb-4">
                            <div className="text-4xl sm:text-5xl font-bold text-blue-400 mb-2">{technicalScore}%</div>
                            <div className="w-full bg-gray-800 rounded-full h-2">
                                <div 
                                    className="bg-gradient-to-r from-blue-400 to-blue-500 h-2 rounded-full transition-all duration-1000"
                                    style={{ width: `${technicalScore}%` }}
                                />
                            </div>
                        </div>
                        <div className="text-gray-400 text-sm">
                            {results.technicalRound?.correctAnswers || 0} / {results.technicalRound?.totalQuestions || 0} correct
                        </div>
                    </Card>

                    <Card className="bg-slate-900/80 border-slate-700/50 p-6 text-center hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-green-500/20 hover:border-green-500/50">
                        <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <TrendingUp className="w-8 h-8 text-green-400" />
                        </div>
                        <h3 className="text-green-300 font-bold text-lg mb-3">Coding Round</h3>
                        <div className="relative mb-4">
                            <div className="text-4xl sm:text-5xl font-bold text-green-400 mb-2">{codingScore}%</div>
                            <div className="w-full bg-gray-800 rounded-full h-2">
                                <div 
                                    className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-1000"
                                    style={{ width: `${codingScore}%` }}
                                />
                            </div>
                        </div>
                        <div className="text-gray-400 text-sm">
                            Code Quality: {results.codingRound?.codeQuality || 0}%
                        </div>
                    </Card>

                    <Card className="bg-slate-900/80 border-slate-700/50 p-6 text-center hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-purple-500/20 hover:border-purple-500/50 sm:col-span-2 lg:col-span-1">
                        <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Target className="w-8 h-8 text-purple-400" />
                        </div>
                        <h3 className="text-purple-300 font-bold text-lg mb-3">Communication</h3>
                        <div className="relative mb-4">
                            <div className="text-4xl sm:text-5xl font-bold text-purple-400 mb-2">{communicationScore}%</div>
                            <div className="w-full bg-gray-800 rounded-full h-2">
                                <div 
                                    className="bg-gradient-to-r from-purple-400 to-purple-500 h-2 rounded-full transition-all duration-1000"
                                    style={{ width: `${communicationScore}%` }}
                                />
                            </div>
                        </div>
                        <div className="text-gray-400 text-sm">
                            Cultural Fit: {results.personalityRound?.culturalFit || 0}%
                        </div>
                    </Card>
                </div>

                {/* Detailed Report */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Strengths */}
                    <Card className="bg-slate-900/80 border-slate-700/50 p-6 hover:shadow-emerald-500/10 transition-all">
                        <h3 className="text-emerald-400 font-bold text-xl mb-4 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5" />
                            Strengths
                        </h3>
                        <ul className="space-y-2">
                            {results.report?.strengths?.map((strength, index) => (
                                <li key={index} className="text-gray-300 flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                                    {strength}
                                </li>
                            )) || <li className="text-gray-400">No strengths recorded</li>}
                        </ul>
                    </Card>

                    {/* Areas for Improvement */}
                    <Card className="bg-slate-900/80 border-slate-700/50 p-6 hover:shadow-amber-500/10 transition-all">
                        <h3 className="text-amber-400 font-bold text-xl mb-4 flex items-center gap-2">
                            <XCircle className="w-5 h-5" />
                            Areas for Improvement
                        </h3>
                        <ul className="space-y-2">
                            {results.report?.weaknesses?.map((weakness, index) => (
                                <li key={index} className="text-gray-300 flex items-start gap-2">
                                    <XCircle className="w-4 h-4 text-yellow-400 mt-1 flex-shrink-0" />
                                    {weakness}
                                </li>
                            )) || <li className="text-gray-400">No weaknesses recorded</li>}
                        </ul>
                    </Card>
                </div>

                {/* Recommendations */}
                <Card className="bg-slate-900/80 border-slate-700/50 p-6 mb-8 hover:shadow-teal-500/10 transition-all">
                    <h3 className="text-teal-400 font-bold text-xl mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Recommendations
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-white font-semibold mb-2">Improvement Tips</h4>
                            <ul className="space-y-1">
                                {results.report?.improvements?.map((tip, index) => (
                                    <li key={index} className="text-gray-300 text-sm">• {tip}</li>
                                )) || <li className="text-gray-400">No tips available</li>}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-2">Next Steps</h4>
                            <ul className="space-y-1">
                                {results.report?.nextSteps?.map((step, index) => (
                                    <li key={index} className="text-gray-300 text-sm">• {step}</li>
                                )) || <li className="text-gray-400">No next steps available</li>}
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
                        onClick={downloadPDF}
                        className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 px-6 py-3 text-white font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-teal-500/25 w-full sm:w-auto"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Download Report
                    </Button>
                    
                    <Button 
                        onClick={() => router.push('/interview/CreateInterview')}
                        className="bg-slate-800/50 hover:bg-slate-700 border border-slate-600/50 text-gray-300 hover:text-white px-6 py-3 font-medium transition-all duration-200 hover:scale-[1.02] w-full sm:w-auto"
                    >
                        <Zap className="w-4 h-4 mr-2" />
                        Take Another Interview
                    </Button>
                </div>
            </div>
        </div>
    )
}