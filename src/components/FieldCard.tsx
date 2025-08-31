import Image from 'next/image'
import React from 'react'
import { Bookmark } from 'lucide-react'
import { Button } from './ui/button'
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card"

interface FieldCardProps {
    logoUrl: string;
    fieldTitle: string;
    description: string;
    noOfRounds: number;
    interviewTime: number;
}

const FieldCard = ({ logoUrl, fieldTitle, description, noOfRounds, interviewTime }: FieldCardProps) => {
    return (
        <Card className="w-full max-w-sm bg-gray-800 border-gray-700 hover:border-purple-400 transition-all duration-300 shadow-lg">
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                            <Image src={logoUrl} height={40} width={40} alt='Logo' className="rounded-full" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">{fieldTitle}</h3>
                    </div>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-200 hover:bg-gray-700/50 p-1">
                        <Bookmark className="w-5 h-5" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between items-start">
                    <p className="text-gray-300 text-sm leading-relaxed flex-1 pr-4">{description}</p>
                    <div className="flex flex-col items-end space-y-4">
                        <div className="bg-gray-700 p-2 rounded-lg text-center">
                            <p className="text-xs text-gray-400">Time: {interviewTime}min</p>
                            <p className="text-xs text-gray-400">{noOfRounds} rounds</p>
                        </div>
                        <Button className="bg-gradient-to-r from-purple-500 to-teal-500 hover:scale-105 transition-all duration-300">
                            Take Interview
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default FieldCard;
