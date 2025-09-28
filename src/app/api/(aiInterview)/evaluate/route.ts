import retRes from "@/utilities/returnResponse";
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
        
        const evaluateQuestionsPrompt = `"You are an expert interview evaluator. Analyze the candidate's complete interview performance.
         INPUT DATA:
         Questions: ${JSON.stringify(questions, null, 2)}
         Answers: ${JSON.stringify(allAnswers, null, 2)}
         Return in text format using the below given structure and dont wrap the response in tildes or quots:
         {
           "technicalRound": {
             "correctAnswers": 0,
             "totalQuestions": 0,
             "score": 0,
             "anwerkey": [{"qid":1,"correctanswer":"answer1 "},{"qid":2,"correctanswer": "answer2 "}]
           },
           "codingRound": {
             "functionalityScore": 0,
             "codeQuality": 0,
             "optimizedSolution": "code here"
           },
           "personalityRound": {
             "communicationScore": 0,
             "culturalFit": 0,
           },
           "finalDecision": {
             "selected": true,
            "message":"a sleection or rejection message with proper reasoning based on the candidates performance in the interview"
           },
           "report": {
             "strengths": ["strength1", "strength2"],
             "weaknesses": ["weakness1", "weakness2"],
             "improvements": ["tip1", "tip2"],
             "nextSteps": ["advice1", "advice2"]
           }
         }
         EVALUATION CRITERIA:
         - Technical: ≥5 correct = pass
         - Coding: ≥60% functionality = pass
         - Selection: Both criteria must be met
         - Scores: 0-100 scale"
         SELECTION CRITERIA:
         - Technical: ≥5 correct answers (out of total)
         - Coding: ≥60% functionality score
         - Final decision: Both criteria must be met for selection
         - Scoring: All scores on 0-100 scale for consistency`

        const result = await generateText({
            model: google("gemini-2.5-flash"),
            prompt: evaluateQuestionsPrompt
        });
        
        let evaluation;
        try {
            evaluation = JSON.parse(result.text);
        } catch (parseError) {
            return retRes(false,`${parseError} : Failed to parse evaluation response`, 500);
        }
        
        return retRes(true, evaluation, 200)
    } catch (error) {
        console.error('Error parsing request:', error)
        return retRes(false, "Invalid request body", 400)
    }
}