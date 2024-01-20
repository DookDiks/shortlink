import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  const users = await prisma.user.findMany()
  const links = await prisma.links.findMany()
  return Response.json({ status: "ok", users, links }, { status: 200 })
}
