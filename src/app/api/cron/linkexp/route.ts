import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  const expireLinks = await prisma.links.findMany({
    where: {
      expireAt: {
        lte: new Date()
      }
    }
  })

  const deleteLinks = expireLinks.map(link => prisma.links.delete({
    where: { id: link.id }
  }))

  return Response.json({ expireLinks, deleteLinks })
}
