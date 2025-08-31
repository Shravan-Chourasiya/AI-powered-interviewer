import { Button } from "@/components/ui/button";
import Link from "next/link";
import '../App.css';

const Homepage = () => {
    return (
        <main className="min-h-screen bg-gray-900 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute top-20 right-20 w-32 h-32 bg-purple-500/10 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-40 h-40 bg-teal-500/10 rounded-full animate-pulse"></div>
            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-500/5 rounded-full animate-pulse"></div>
            
            <div className="flex flex-col justify-center items-center min-h-screen px-4 sm:px-6">
                <div className="text-center flex flex-col justify-center items-center gap-6 max-w-4xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent mb-4">
                        Welcome User, How are you
                    </h1>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent mb-8">
                        doing today?
                    </h1>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-12">
                    <Link href='/interviews'>
                        <Button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-teal-500 text-white rounded-lg font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg">
                            Take an Interview →
                        </Button>
                    </Link>
                    <Link href='/interviews-working'>
                        <Button className="px-8 py-4 bg-gray-800 border border-gray-700 text-gray-300 hover:text-white hover:border-purple-400 rounded-lg font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg">
                            How interviews work?
                        </Button>
                    </Link>
                </div>
            </div>
            
            <div className="pb-16 text-center">
                <div className="text-gray-400 text-lg">
                    Interview carousel coming soon...
                </div>
            </div>
        </main>
    );
}

export default Homepage
