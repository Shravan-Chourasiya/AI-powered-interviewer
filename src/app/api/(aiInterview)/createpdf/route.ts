import retRes from '@/utilities/returnResponse';
import Redis from 'ioredis';
import { getServerSession } from 'next-auth';
import puppeteer from 'puppeteer-core';
import authOptions from '../../auth/[...nextauth]/providers';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions)
        const user_email = session?.user?.email;
        if (!user_email) {
            return retRes(false, "User email not found in session!", 400);
        }
        const htmlToConvert = await req.json()
        if (!Array.isArray(htmlToConvert) || htmlToConvert.length < 2) {
            return retRes(false, "Invalid HTML data format", 400);
        }

        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        const answerkeyPdf = htmlToConvert[0]
        const reviewPdf = htmlToConvert[1]
        
        let redis;
        try {
            redis = new Redis(process.env.REDIS_URL!);
        } catch (redisError) {
            await browser.close();
            return retRes(false, `${redisError} :Redis connection failed`, 500);
        }

        try {
            //creating answerkey pdf
            await page.setContent(answerkeyPdf, { waitUntil: 'networkidle0', timeout: 30000 });
            await page.emulateMediaType('screen');
            const answerKeyBuffer = await page.pdf({ format: 'A4' });

            //creating review pdf
            await page.setContent(reviewPdf, { waitUntil: 'networkidle0', timeout: 30000 });
            await page.emulateMediaType('screen');
            const reviewBuffer = await page.pdf({ format: 'A4' });

            // Store PDFs in Redis for 48 hours
            const ttl = 48 * 60 * 60; // 48 hours in seconds
            await redis.setex(`${user_email}:answerkey`, ttl, Buffer.from(answerKeyBuffer));
            await redis.setex(`${user_email}:review`, ttl, Buffer.from(reviewBuffer));
            
            const totalResponse = {
                "message": "PDFs generated successfully. NOTE: These are available for 48hrs only!",
                "userRedisKey": {
                    "answerkey": `${user_email}:answerkey`,
                    "review": `${user_email}:review`
                }
            }

            await browser.close();
            await redis.quit();
            return retRes(true, JSON.stringify(totalResponse), 200)
        } catch (pdfError) {
            await browser.close();
            await redis.quit();
            throw pdfError;
        }
    }
    catch (error) {
        return retRes(false, `Failed to generate pdf ! ${error}`, 400)
    }
}