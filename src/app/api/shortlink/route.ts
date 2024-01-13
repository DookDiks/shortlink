import { prisma } from '@/lib/prisma';
import { AddShortLinkFormSchema } from "@/components/home/AddShortLinkForm";
import { getSession } from '@/utils/session';
import { generateRandomString } from '@/utils/generateRandomString';


export async function POST(request: Request) {
  const { endpoint, entrypoint, title } = await request.json() as AddShortLinkFormSchema

  if (!endpoint) return Response.json({ target: "endpoint", message: "Missing endpoint" }, { status: 400 })


  const session = await getSession()

  if (!session.isLogged) {
    return Response.redirect("/auth/signin", 301)
  }

  const newLink = await prisma.links.create({
    data: {
      userId: session.id,
      endpoint,
      entrypoint: entrypoint ? entrypoint : generateRandomString(6),
      title: title ? title : "untitle",
    }
  })

  return Response.json(newLink, { status: 200 })
}