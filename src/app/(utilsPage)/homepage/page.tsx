import { Button } from "@/components/ui/button";
import Link from "next/link";
import StackedImageSlider from "@/components/StackedImageSlider";


const Homepage = () => {
    return (
        <main className="min-h-screen bg-gray-900 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute top-20 right-20 w-32 h-32 bg-purple-500/10 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-40 h-40 bg-teal-500/10 rounded-full animate-pulse"></div>
            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-500/5 rounded-full animate-pulse"></div>
            
            <div className="flex flex-col justify-center items-center min-h-screen px-4 sm:px-6">
                <div className="text-center flex flex-col justify-center items-center gap-8 max-w-5xl mx-auto">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-400 to-teal-400 rounded-full mb-6 animate-bounce">
                        👋
                    </div>
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-teal-400 bg-clip-text text-transparent mb-6 leading-tight">
                        Ready to Excel?
                    </h1>
                    <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl leading-relaxed">
                        Your next career breakthrough starts with practice. Choose your path and let our AI help you shine in interviews.
                    </p>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-16">
                    <Link href='/interview/CreateInterview'>
                        <Button className="px-10 py-5 bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600 text-white rounded-2xl font-bold text-xl hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25 min-w-64">
                            ✨ Start Interview Now
                        </Button>
                    </Link>
                    <Link href='/dashboard'>
                        <Button className="px-10 py-5 bg-gray-800/50 backdrop-blur-sm border-2 border-gray-600 hover:border-purple-400 text-gray-300 hover:text-white rounded-2xl font-bold text-xl hover:scale-110 transition-all duration-300 shadow-2xl min-w-64">
                            📈 View Dashboard
                        </Button>
                    </Link>
                </div>
            </div>
            
            <div className="pb-16 px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Quick Start Options</h2>
                    <p className="text-gray-400 text-lg mb-8">Choose your interview type and get started immediately</p>
                </div>
                
                {/* Quick Categories */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto mb-12">
                    <a href='/interview/CreateInterview?field=Frontend' className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 border border-purple-400/30 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-purple-400/20 group">
                        <div className="text-3xl mb-3">💻</div>
                        <h3 className="text-white font-semibold text-sm">Frontend</h3>
                    </a>
                    <a href='/interview/CreateInterview?field=Backend' className="bg-gradient-to-br from-teal-900/30 to-teal-800/30 border border-teal-400/30 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-teal-400/20 group">
                        <div className="text-3xl mb-3">⚙️</div>
                        <h3 className="text-white font-semibold text-sm">Backend</h3>
                    </a>
                    <a href='/interview/CreateInterview?field=Full Stack' className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 border border-blue-400/30 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-blue-400/20 group">
                        <div className="text-3xl mb-3">🚀</div>
                        <h3 className="text-white font-semibold text-sm">Full Stack</h3>
                    </a>
                    <a href='/interview/CreateInterview?field=Data Science' className="bg-gradient-to-br from-green-900/30 to-green-800/30 border border-green-400/30 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-green-400/20 group">
                        <div className="text-3xl mb-3">📈</div>
                        <h3 className="text-white font-semibold text-sm">Data Science</h3>
                    </a>
                    <a href='/interview/CreateInterview?field=AI/ML' className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/30 border border-yellow-400/30 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-yellow-400/20 group">
                        <div className="text-3xl mb-3">🤖</div>
                        <h3 className="text-white font-semibold text-sm">AI/ML</h3>
                    </a>
                    <a href='/interview/CreateInterview?field=DSA' className="bg-gradient-to-br from-red-900/30 to-red-800/30 border border-red-400/30 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-red-400/20 group">
                        <div className="text-3xl mb-3">🧠</div>
                        <h3 className="text-white font-semibold text-sm">DSA</h3>
                    </a>
                </div>
                
                <StackedImageSlider />
            </div>
        </main>
    );
}

export default Homepage
