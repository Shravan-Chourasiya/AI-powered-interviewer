import { NextResponse } from 'next/server';

function retRes(success: boolean, data: unknown, status: number) {
  return NextResponse.json({ success, message: data }, { status });
}
import { google } from "@ai-sdk/google"
import { generateText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

interface evaluateQuestionsParams {
    questions: object[]
    allAnswers: object[]
}

export async function POST(req: Request) {
    try {
        const { questions, allAnswers }: evaluateQuestionsParams = await req.json()
        
        const evaluateQuestionsPrompt = `Evaluate interview answers. Questions: ${JSON.stringify(questions)} Answers: ${JSON.stringify(allAnswers)}

Return JSON only:
{"technicalRound":{"score":85,"correctAnswers":7,"totalQuestions":10},"codingRound":{"functionalityScore":75,"codeQuality":80},"personalityRound":{"communicationScore":90,"culturalFit":85},"finalDecision":{"selected":true,"message":"Strong technical skills"},"report":{"strengths":["Good problem solving"],"weaknesses":["Needs improvement in X"],"improvements":["Practice Y"],"nextSteps":["Focus on Z"]}}

Score 0-100. Select if technical≥70 AND coding≥60.`

        const result = await generateText({
            model: google("gemini-2.5-flash"),
            prompt: evaluateQuestionsPrompt
        });
        
        let evaluation;
        try {
            let jsonText = result.text.trim();
            if (jsonText.startsWith('```json')) {
                jsonText = jsonText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
            } else if (jsonText.startsWith('```')) {
                jsonText = jsonText.replace(/^```\s*/, '').replace(/\s*```$/, '');
            }
            evaluation = JSON.parse(jsonText);
        } catch (parseError) {
            console.error('Parse error:', parseError, 'Raw text:', result.text)
            return retRes(false,`Failed to parse evaluation response`, 500);
        }
        
        return retRes(true, evaluation, 200)
    } catch (error) {
        return retRes(false, `Server error: ${error instanceof Error ? error.message : 'Unknown error'}`, 500)
    }
}