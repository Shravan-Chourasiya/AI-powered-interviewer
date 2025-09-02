import { DownloadIcon, View } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

interface DownloadablesProps {
    srno: number
    fieldname: string
}

const Downlodables = ({ srno, fieldname }: DownloadablesProps) => {
    return (
        <td className='p-2 bg-gray-700 rounded-lg mb-3 mt-3'>
            <div className="flex items-center justify-between">
                <span className="text-gray-300">{srno}. {fieldname}</span>
                <div className="flex gap-2">
                    <Button className="p-2 border border-gray-600 text-gray-300 hover:bg-gray-600 rounded transition-colors">
                        <View className="w-3 h-3" />
                    </Button>
                    <Button className="p-2 border border-gray-600 text-gray-300 hover:bg-gray-600 rounded transition-colors">
                        <DownloadIcon className="w-3 h-3" />
                    </Button>
                </div>
            </div>
        </td>
    )
}

export default Downlodables
