import {prisma} from "@/lib/prisma"

export async function GET(request: Request) {
  const links = await prisma.links.findMany()
  const cronHistory = await prisma.cronHistory.findMany()
  return Response.json({status: "ok", cronHistory, links}, {status: 200})
}
