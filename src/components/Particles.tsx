'use client'
import { useTheme } from 'next-themes'

export default function Particles() {
    const { theme } = useTheme()
    
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {/* Light mode particles */}
            <div className={`absolute inset-0 ${theme === 'dark' ? 'hidden' : 'block'}`}>
                <div className="absolute top-20 left-10 w-2 h-2 bg-purple-400/30 rounded-full animate-pulse"></div>
                <div className="absolute top-40 right-20 w-1 h-1 bg-teal-400/40 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute top-60 left-1/4 w-1.5 h-1.5 bg-blue-400/30 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-80 right-1/3 w-1 h-1 bg-purple-400/40 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
                <div className="absolute bottom-40 left-20 w-2 h-2 bg-teal-400/30 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
                <div className="absolute bottom-60 right-10 w-1 h-1 bg-blue-400/40 rounded-full animate-pulse" style={{animationDelay: '2.5s'}}></div>
                <div className="absolute bottom-80 left-1/3 w-1.5 h-1.5 bg-purple-400/30 rounded-full animate-pulse" style={{animationDelay: '3s'}}></div>
                <div className="absolute top-1/2 left-10 w-1 h-1 bg-teal-400/40 rounded-full animate-pulse" style={{animationDelay: '3.5s'}}></div>
                <div className="absolute top-1/3 right-40 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse" style={{animationDelay: '4s'}}></div>
                <div className="absolute bottom-1/3 left-40 w-1 h-1 bg-purple-400/40 rounded-full animate-pulse" style={{animationDelay: '4.5s'}}></div>
            </div>
            
            {/* Dark mode particles */}
            <div className={`absolute inset-0 ${theme === 'dark' ? 'block' : 'hidden'}`}>
                <div className="absolute top-20 left-10 w-2 h-2 bg-purple-500/20 rounded-full animate-pulse"></div>
                <div className="absolute top-40 right-20 w-1 h-1 bg-teal-500/30 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute top-60 left-1/4 w-1.5 h-1.5 bg-blue-500/20 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-80 right-1/3 w-1 h-1 bg-purple-500/30 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
                <div className="absolute bottom-40 left-20 w-2 h-2 bg-teal-500/20 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
                <div className="absolute bottom-60 right-10 w-1 h-1 bg-blue-500/30 rounded-full animate-pulse" style={{animationDelay: '2.5s'}}></div>
                <div className="absolute bottom-80 left-1/3 w-1.5 h-1.5 bg-purple-500/20 rounded-full animate-pulse" style={{animationDelay: '3s'}}></div>
                <div className="absolute top-1/2 left-10 w-1 h-1 bg-teal-500/30 rounded-full animate-pulse" style={{animationDelay: '3.5s'}}></div>
                <div className="absolute top-1/3 right-40 w-2 h-2 bg-blue-500/20 rounded-full animate-pulse" style={{animationDelay: '4s'}}></div>
                <div className="absolute bottom-1/3 left-40 w-1 h-1 bg-purple-500/30 rounded-full animate-pulse" style={{animationDelay: '4.5s'}}></div>
            </div>
        </div>
    )
}