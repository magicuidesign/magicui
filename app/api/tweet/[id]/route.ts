import { getTweet } from "react-tweet/api";
import { z } from "zod";

const schema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export async function GET(req: Request, context: z.infer<typeof schema>) {
  try {
    const { params } = schema.parse(context);
    const tweet = await getTweet(params.id);
    console.log(params.id);

    if (tweet) {
      return new Response(JSON.stringify({ data: tweet }));
    } else {
      return new Response(null, { status: 404 });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    console.error(error);
    return new Response(null, { status: 500 });
  }
}
