import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new Response(null, { status: 403 });
    }

    const user = await db.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        customer: {
          include: {
            payments: true,
          },
        },
        accounts: true,
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found." }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ user }), {
      status: 200,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
