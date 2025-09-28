import { NextResponse } from 'next/server';

function retRes(success: boolean, data: unknown, status: number) {
  return NextResponse.json({ success, message: data }, { status });
}


export async function POST(req: Request) {
    try {
        const { position, company, fieldname ,duration} = await req.json()
        // Direct internal API call instead of HTTP request to prevent SSRF
        const { POST: getQuestionsHandler } = await import('../getquestions/route')
        const questionsRequest = new Request('http://localhost:3000/api/getquestions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fieldname, position, company, experience: duration })
        })
        const questionsResponse = await getQuestionsHandler(questionsRequest)
        const questionsData = await questionsResponse.json()
        const interviewQuestions = questionsData.message
        const InterviewQuest=JSON.stringify(interviewQuestions)
        return retRes(true, InterviewQuest, 200)
    } catch (error) {
        console.log(error," An Error Occured");
        return retRes(false, "Interview Handler Failed ", 500)
    }
}

