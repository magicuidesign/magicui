import components from "./components.json";
export const dynamic = "force-dynamic";
// no cache

export async function GET(req: Request) {
  return Response.json(components, { status: 200 });
}
