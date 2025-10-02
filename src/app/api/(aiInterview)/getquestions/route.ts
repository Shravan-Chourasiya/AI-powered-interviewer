import { NextResponse } from 'next/server';

function retRes(success: boolean, data: unknown, status: number) {
  return NextResponse.json({ success, message: data }, { status });
}
import { google } from "@ai-sdk/google"
import { generateText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
interface getQuestionsParams {
  fieldname: string,
  position: string,
  duration:number,
  experience: string
}

export async function POST(req: Request) {
  const { fieldname, position, duration, experience }: getQuestionsParams = await req.json();
  
  const totalQuestions = Math.floor(duration / 3);
  const technicalCount = Math.floor(totalQuestions * 0.4);
  const codingCount = Math.floor(totalQuestions * 0.4);
  const behavioralCount = totalQuestions - technicalCount - codingCount;

  const getQuestionsPrompt: string = `Generate ${totalQuestions} interview questions for ${fieldname} ${position} role (${experience} level) for ${duration} minutes.

Distribution:
- Technical: ${technicalCount} questions (40%)
- Coding: ${codingCount} questions (40%)
- Behavioral: ${behavioralCount} questions (20%)

Difficulty by experience:
- Beginner: mostly beginner/intermediate
- Intermediate: balanced intermediate/expert
- Expert: mostly expert level

${fieldname} focus:
- Technical: Core concepts, architecture, best practices
- Coding: Algorithms, problem-solving, optimization
- Behavioral: Leadership, teamwork, culture fit

Return JSON array:
[{"qid":1,"content":"question","difficulty":"beginner|intermediate|expert","round":"technical|coding|behavioral","timeLimit":180}]

No markdown.`;

  const result = await generateText({
    model: google("gemini-2.5-flash"),
    prompt: getQuestionsPrompt
  });
  // Extract JSON from markdown code blocks if present
  let jsonText = result.text.trim();
  if (jsonText.startsWith('```json')) {
    jsonText = jsonText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
  } else if (jsonText.startsWith('```')) {
    jsonText = jsonText.replace(/^```\s*/, '').replace(/\s*```$/, '');
  }
  const questions = JSON.parse(jsonText);
  return retRes(true, questions, 200);
}