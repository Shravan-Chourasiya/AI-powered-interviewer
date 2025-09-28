# 🎯 AI INTERVIEWER - IMPLEMENTATION STEPS

## **PHASE 1: Foundation (Day 1-2)**

### Step 1: Create Interview Model
**File:** `src/models/Interview.model.ts`
```typescript
import mongoose, { Schema, Document } from "mongoose";

export interface Interview extends Document {
    userId: string;
    fieldname: string;
    position: string;
    company: string;
    experience: string;
    questions: any[];
    answers: any[];
    status: 'pending' | 'in-progress' | 'completed';
    score?: number;
    createdAt: Date;
}

const interviewSchema: Schema<Interview> = new Schema({
    userId: { type: String, required: true },
    fieldname: { type: String, required: true },
    position: { type: String, required: true },
    company: { type: String, required: true },
    experience: { type: String, required: true },
    questions: { type: Array, default: [] },
    answers: { type: Array, default: [] },
    status: { type: String, default: 'pending' },
    score: { type: Number, default: 0 }
}, { timestamps: true });

const InterviewModel = mongoose.models.Interview as mongoose.Model<Interview> || mongoose.model<Interview>("Interview", interviewSchema);
export default InterviewModel;
```

### Step 2: Create Interview Creation API
**File:** `src/app/api/interview/create/route.ts`
```typescript
import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/api/auth/[...nextauth]/providers';
import dbConn from '@/lib/db';
import InterviewModel from '@/models/Interview.model';
import retRes from '@/utilities/returnResponse';
import axios from 'axios';

export async function POST(request: NextRequest) {
    await dbConn();
    
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return retRes(false, 'Unauthorized', 401);
        }

        const { fieldname, position, company, experience } = await request.json();

        // Generate questions using existing AI API
        const questionsResponse = await axios.post(`${process.env.NEXTAUTH_URL}/api/getquestions`, {
            fieldname,
            position, 
            company,
            experience
        });

        const questions = questionsResponse.data.data;

        // Create interview record
        const interview = new InterviewModel({
            userId: session.user.id,
            fieldname,
            position,
            company,
            experience,
            questions,
            status: 'pending'
        });

        await interview.save();

        return retRes(true, { interviewId: interview._id }, 201);
    } catch (error) {
        console.error('Error creating interview:', error);
        return retRes(false, 'Failed to create interview', 500);
    }
}
```

### Step 3: Create Interview Creation Page
**File:** `src/app/interview/create/page.tsx`
```typescript
'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import axios from 'axios';

export default function CreateInterview() {
    const [formData, setFormData] = useState({
        fieldname: '',
        position: '',
        company: '',
        experience: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post('/api/interview/create', formData);
            const { interviewId } = response.data.data;
            
            toast.success('Interview created successfully!');
            router.push(`/interview/${interviewId}`);
        } catch (error) {
            toast.error('Failed to create interview');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 p-6 flex items-center justify-center">
            <Card className="w-full max-w-md bg-gray-900 border-gray-800">
                <CardHeader>
                    <CardTitle className="text-white text-center">Create Interview</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label className="text-gray-300">Field/Role</Label>
                            <Input
                                placeholder="e.g. Frontend Developer"
                                value={formData.fieldname}
                                onChange={(e) => setFormData({...formData, fieldname: e.target.value})}
                                className="bg-gray-800 border-gray-700 text-white"
                                required
                            />
                        </div>
                        
                        <div>
                            <Label className="text-gray-300">Position</Label>
                            <Input
                                placeholder="e.g. Senior Developer"
                                value={formData.position}
                                onChange={(e) => setFormData({...formData, position: e.target.value})}
                                className="bg-gray-800 border-gray-700 text-white"
                                required
                            />
                        </div>

                        <div>
                            <Label className="text-gray-300">Company</Label>
                            <Input
                                placeholder="e.g. Google"
                                value={formData.company}
                                onChange={(e) => setFormData({...formData, company: e.target.value})}
                                className="bg-gray-800 border-gray-700 text-white"
                                required
                            />
                        </div>

                        <div>
                            <Label className="text-gray-300">Experience Level</Label>
                            <Input
                                placeholder="e.g. 3 years"
                                value={formData.experience}
                                onChange={(e) => setFormData({...formData, experience: e.target.value})}
                                className="bg-gray-800 border-gray-700 text-white"
                                required
                            />
                        </div>

                        <Button 
                            type="submit" 
                            className="w-full bg-purple-600 hover:bg-purple-700"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating...' : 'Start Interview'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
```

---

## **PHASE 2: Core Interview (Day 3-5)**

### Step 4: Create Interview Display Page
**File:** `src/app/interview/[id]/page.tsx`
```typescript
'use client'
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import QuestionDisplay from '@/components/QuestionDisplay';
import Timer from '@/components/Timer';
import { Card } from '@/components/ui/card';
import axios from 'axios';

export default function InterviewPage() {
    const params = useParams();
    const [interview, setInterview] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInterview();
    }, []);

    const fetchInterview = async () => {
        try {
            const response = await axios.get(`/api/interview/${params.id}`);
            setInterview(response.data.data);
            setAnswers(new Array(response.data.data.questions.length).fill(''));
        } catch (error) {
            console.error('Error fetching interview:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-white">Loading...</div>;
    if (!interview) return <div className="text-white">Interview not found</div>;

    return (
        <div className="min-h-screen bg-gray-950 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-white">
                        {interview.fieldname} Interview
                    </h1>
                    <Timer timeLimit={interview.questions[currentQuestion]?.timeLimit || 180} />
                </div>

                <Card className="bg-gray-900 border-gray-800 p-6">
                    <QuestionDisplay
                        question={interview.questions[currentQuestion]}
                        questionNumber={currentQuestion + 1}
                        totalQuestions={interview.questions.length}
                        answer={answers[currentQuestion]}
                        onAnswerChange={(answer) => {
                            const newAnswers = [...answers];
                            newAnswers[currentQuestion] = answer;
                            setAnswers(newAnswers);
                        }}
                        onNext={() => setCurrentQuestion(prev => Math.min(prev + 1, interview.questions.length - 1))}
                        onPrevious={() => setCurrentQuestion(prev => Math.max(prev - 1, 0))}
                        canGoNext={currentQuestion < interview.questions.length - 1}
                        canGoPrevious={currentQuestion > 0}
                    />
                </Card>
            </div>
        </div>
    );
}
```

### Step 5: Create Question Component
**File:** `src/components/QuestionDisplay.tsx`
```typescript
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface QuestionDisplayProps {
    question: any;
    questionNumber: number;
    totalQuestions: number;
    answer: string;
    onAnswerChange: (answer: string) => void;
    onNext: () => void;
    onPrevious: () => void;
    canGoNext: boolean;
    canGoPrevious: boolean;
}

export default function QuestionDisplay({
    question,
    questionNumber,
    totalQuestions,
    answer,
    onAnswerChange,
    onNext,
    onPrevious,
    canGoNext,
    canGoPrevious
}: QuestionDisplayProps) {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <span className="text-gray-400">
                    Question {questionNumber} of {totalQuestions}
                </span>
                <span className="text-purple-400 font-semibold">
                    {question?.round?.toUpperCase()} ROUND
                </span>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
                <h2 className="text-white text-lg mb-4">{question?.content}</h2>
            </div>

            <div>
                <label className="text-gray-300 block mb-2">Your Answer:</label>
                <Textarea
                    value={answer}
                    onChange={(e) => onAnswerChange(e.target.value)}
                    placeholder="Type your answer here..."
                    className="bg-gray-800 border-gray-700 text-white min-h-[200px]"
                />
            </div>

            <div className="flex justify-between">
                <Button
                    onClick={onPrevious}
                    disabled={!canGoPrevious}
                    variant="outline"
                    className="border-gray-600 text-gray-300"
                >
                    Previous
                </Button>
                
                <Button
                    onClick={onNext}
                    disabled={!canGoNext}
                    className="bg-purple-600 hover:bg-purple-700"
                >
                    {canGoNext ? 'Next' : 'Finish'}
                </Button>
            </div>
        </div>
    );
}
```

### Step 6: Create Timer Component
**File:** `src/components/Timer.tsx`
```typescript
'use client'
import { useState, useEffect } from 'react';

interface TimerProps {
    timeLimit: number; // in seconds
    onTimeUp?: () => void;
}

export default function Timer({ timeLimit, onTimeUp }: TimerProps) {
    const [timeLeft, setTimeLeft] = useState(timeLimit);

    useEffect(() => {
        if (timeLeft <= 0) {
            onTimeUp?.();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, onTimeUp]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getColor = () => {
        if (timeLeft <= 30) return 'text-red-400';
        if (timeLeft <= 60) return 'text-yellow-400';
        return 'text-green-400';
    };

    return (
        <div className={`text-2xl font-bold ${getColor()}`}>
            ⏱️ {formatTime(timeLeft)}
        </div>
    );
}
```

---

## **TESTING CHECKLIST**

### Phase 1 Test:
- [ ] Can create interview from `/interview/create`
- [ ] Gets redirected to `/interview/[id]`
- [ ] Interview saved in database

### Phase 2 Test:
- [ ] Questions display correctly
- [ ] Timer counts down
- [ ] Can type answers
- [ ] Next/Previous buttons work

**Start with Phase 1 - just create these 3 files and test!**