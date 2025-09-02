import React from 'react'

interface DoughnutChartProps {
  completed: number
  failed: number
  saved: number
}

const DoughnutChart = ({ completed, failed, saved }: DoughnutChartProps) => {
  const total = completed + failed + saved
  
  // Calculate percentages and stroke-dasharray values
  const completedPercent = total > 0 ? (completed / total) * 251.2 : 0
  const failedPercent = total > 0 ? (failed / total) * 251.2 : 0
  const savedPercent = total > 0 ? (saved / total) * 251.2 : 0

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 flex flex-col">
      <h3 className="text-xl font-bold text-white mb-6 text-center">Interview Statistics</h3>
      <div className="flex justify-center items-center flex-1">
        <div className="relative w-76 h-76">
          <svg className="w-76 h-76 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle cx="50" cy="50" r="40" fill="none" stroke="#374151" strokeWidth="12"/>
            {/* Completed */}
            <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="12"
              strokeDasharray={`${completedPercent} ${251.2 - completedPercent}`} 
              strokeDashoffset="0" className="transition-all duration-1000"/>
            {/* Failed */}
            <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="12"
              strokeDasharray={`${failedPercent} ${251.2 - failedPercent}`} 
              strokeDashoffset={`-${completedPercent}`} className="transition-all duration-1000"/>
            {/* Saved */}
            <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="12"
              strokeDasharray={`${savedPercent} ${251.2 - savedPercent}`} 
              strokeDashoffset={`-${completedPercent + failedPercent}`} className="transition-all duration-1000"/>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{total}</div>
              <div className="text-sm text-gray-400">Total</div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-300 text-sm">Completed</span>
          </div>
          <span className="text-green-400 font-semibold text-lg">{completed}</span>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-300 text-sm">Failed</span>
          </div>
          <span className="text-red-400 font-semibold text-lg">{failed}</span>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-gray-300 text-sm">Saved</span>
          </div>
          <span className="text-blue-400 font-semibold text-lg">{saved}</span>
        </div>
      </div>
    </div>
  )
}

export default DoughnutChart