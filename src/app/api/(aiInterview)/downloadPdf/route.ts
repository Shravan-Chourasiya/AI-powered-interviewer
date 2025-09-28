import Redis from "ioredis"

export async function POST(req: Request) {
  let redis;
  try {
      const { userRedisKey, type } = await req.json()
      if (!userRedisKey || !type) {
          return new Response("Missing required parameters", { status: 400 });
      }
      
      redis = new Redis(process.env.REDIS_URL!);
      const key = type === 'answerkey' ? userRedisKey.answerkey : userRedisKey.review;
      const fetchedBuffer = await redis.getBuffer(key);
      
      if (!fetchedBuffer) {
          await redis.quit();
          return new Response("PDF not found or has expired.", { status: 404 });
      }

      const filename = type === 'answerkey' ? 'answerkey.pdf' : 'review.pdf';
      await redis.quit();
      
      return new Response(fetchedBuffer, {
          headers: {
              'Content-Type': 'application/pdf',
              'Content-Disposition': `attachment; filename="${filename}"`
          }
      });
  } catch (error) {
    if (redis) await redis.quit();
    return new Response(`Failed to fetch PDF.:${error}`, { status: 500 });
  }
}