import retRes from "@/utilities/returnResponse";
import { google } from "@ai-sdk/google"
import { generateText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
interface PdfHtmlParams {
    pdfdata: string
}
export async function POST(req: Request) {
    try {
        console.log('=== PDFRAWDATA API START ===')
        const body = await req.json();
        console.log('Request body:', body)
        if (!body || typeof body.pdfdata !== 'string') {
            console.log('Invalid request body')
            return retRes(false, "Invalid request body", 400);
        }
        const pdfRawData: PdfHtmlParams = body;
        console.log('Calling AI for HTML generation...')
        const PdfHtmlPrompt: string = `
    Generate an array of two professional HTML strings for PDF generation using ${pdfRawData}:
        **First HTML** - Answer Keys Document (Technical Q&A + Coding Solution)
        **Second HTML** - Analysis Report Document (Scores + Report Details + Decision)
        **Requirements:**
        * Return as single string: \`["<html>...</html>", "<html>...</html>"]\`
        * Use inline CSS for PDF compatibility
        * Professional navy blue/gray color scheme (#2c3e50, #f8f9fa)
        * Use data from \`pdfRawData\` variable
        **Key Styling Features:**
            - Score cards with color coding: Red (<50%), Yellow (50-70%), Green (>70%)
            - Cards/boxes with shadows for content grouping
            - Unicode symbols: ✓ strengths, ✗ weaknesses, → improvements
            - Enhanced tables with alternating row colors
            - Syntax highlighted code blocks with line numbers
            - Prominent decision box with status badge
            - Professional header with candidate info
            - Consistent spacing (20px padding, 15px margins)
        **Data Structure Reference:**
            - \`pdfRawData.technicalRound.feedback\` - array of technical Q&A feedback
            - \`pdfRawData.codingRound.optimizedSolution\` - coding solution
            - \`pdfRawData.technicalRound.score\` - technical score percentage
            - \`pdfRawData.codingRound.functionalityScore\` - coding functionality score
            - \`pdfRawData.codingRound.codeQuality\` - code quality score
            - \`pdfRawData.personalityRound.communicationScore\` - communication score
            - \`pdfRawData.personalityRound.culturalFit\` - cultural fit score
            - \`pdfRawData.report.strengths\` - strengths array
            - \`pdfRawData.report.weaknesses\` - weaknesses array
            - \`pdfRawData.report.improvements\` - improvements array
            - \`pdfRawData.report.nextSteps\` - next steps array
            - \`pdfRawData.finalDecision.selected\` - boolean selection status
            - \`pdfRawData.finalDecision.message\` - decision message
            `

        const result = await generateText({
            model: google("gemini-2.5-flash"),
            prompt: PdfHtmlPrompt
        });
        console.log('AI response received:', result.text?.substring(0, 200) + '...')
        
        let generatedData;
        try {
            generatedData = JSON.parse(result.text);
        } catch (parseError) {
            console.error('Parse error:', parseError, 'Raw text:', result.text)
            return retRes(false, `Failed to parse AI response`, 500);
        }
        
        console.log('HTML generation successful')
        console.log('=== PDFRAWDATA API END ===')
        return retRes(true, generatedData, 200)
    } catch (error) {
        console.error('PDFRAWDATA API Error:', error)
        return retRes(false, `Server error: ${error instanceof Error ? error.message : 'Unknown error'}`, 500)
    }
}