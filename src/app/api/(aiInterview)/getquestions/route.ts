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
  company: string,
  experience: string
}

export async function POST(req: Request) {
  const { fieldname, position, company, experience }: getQuestionsParams = await req.json();
  const getQuestionsPrompt: string = `Generate interview questions for ${position} (${fieldname}, ${experience} level) at ${company}.

Structure (70min total):
- Technical: 10 questions (25min) - core concepts, system design, advanced topics
- Coding: ${experience.includes('senior') ? '1 comprehensive problem (30min)' : '3-4 short problems (6-8min each)'} - intermediate difficulty
- Behavioral: 5 questions (15min) - leadership, teamwork, problem-solving, culture fit

Return JSON array ONLY (no markdown):
[{"qid":1,"content":"question text","difficulty":"beginner|intermediate|expert","round":"technical|coding|behavioral","timeLimit":180}]

Requirements: Job-relevant, practical, scenario-based, professional.`;
  const prompt: string = `You are an expert technical interviewer hiring a ${fieldname} ${experience}. Generate questions for a ${position} role at ${company}.
    Interview Structure (70 minutes total):
    - **Technical Round**: 25 minutes (10 questions)
    - **Coding Round**: 30 minutes 
    - **Behavioral Round**: 15 minutes (5 questions)
    ## Coding Round Options (30 minutes):
    **Option A**: 1 comprehensive intermediate-level problem (uses full 30 minutes)
    **Option B**: 3-4 shorter problems (6-8 minutes each)
    ## Question Generation:
    ### Technical Round:
    - 10 questions covering core concepts, system design, and advanced topics
    ### Coding Round: 
    - Choose Option A for senior roles or Option B for junior roles
    - All problems should be intermediate difficulty level
    ### Behavioral Round:
    - 5 questions covering leadership, teamwork, problem-solving, and culture fit
    ## JSON Output Format:
    [
      {
        "qid": 1,
        "content": "question text",
        "difficulty": "beginner|intermediate|expert",
        "round": "technical|coding|behavioral",
        "timeLimit": 180
      }
    ]
    Requirements:
    - Technical: Focus on job-relevant skills and concepts
    - Coding: Practical problems suitable for screen sharing
    - Behavioral: Use scenario-based questions
    - All questions should be professional and assess real job capabilities
    Generate questions that effectively evaluate candidates while providing a positive interview experience.and return the questions in text format following the above json structure only .And dont wrp thejson array in tildes or quots`
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