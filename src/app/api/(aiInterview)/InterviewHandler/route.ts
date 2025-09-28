import { Interview } from "@/models/Interview.model";
import retRes from "@/utilities/returnResponse";
import axios from "axios";


export async function POST(req: Request) {
    try {
        const { position, company, fieldname ,duration} = await req.json()
        const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
        const interviewQuestions: Interview["questions"] = await axios.post(`${baseUrl}/api/getquestions`, {
            fieldname, position, company, duration
        })
        const InterviewQuest=JSON.stringify(interviewQuestions)
        return retRes(true, InterviewQuest, 200)
    } catch (error) {
        console.log(error," An Error Occured");
        return retRes(false, "Interview Handler Failed ", 500)
    }
}

