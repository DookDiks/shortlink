import { prisma } from '@/lib/prisma';
import { AddShortLinkFormSchema } from "@/containers/AddShortLinkForm";
import { getSession } from '@/utils/session';
import { generateRandomString } from '@/utils/generateRandomString';


export async function POST(request: Request) {
  const { endpoint, entrypoint, title, expireDate } = await request.json() as AddShortLinkFormSchema

  if (!endpoint) return Response.json({ target: "endpoint", message: "Missing endpoint" }, { status: 400 })

  console.log(endpoint, entrypoint, title, expireDate);

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
      expireAt: expireDate
    }
  })

  return Response.json(newLink, { status: 200 })
}

export async function PATCH(request: Request) {
  const { endpoint, entrypoint, title, id, expireDate } = await request.json() as AddShortLinkFormSchema & { id: string }

  if (!endpoint) return Response.json({ target: "endpoint", message: "Missing endpoint" }, { status: 400 })
  if (!id) return Response.json({ target: "id", message: "Missing id" }, { status: 400 })
  if (!entrypoint) return Response.json({ target: "entrypoint", message: "Missing Search parameter" }, { status: 400 })
  if (!title) return Response.json({ target: "title", message: "Missing title" }, { status: 400 })

  const session = await getSession()

  if (!session.isLogged) {
    return Response.redirect("/auth/signin", 301)
  }

  const newLink = await prisma.links.update({
    where: { id },
    data: {
      userId: session.id,
      endpoint,
      entrypoint: entrypoint ? entrypoint : generateRandomString(6),
      title: title ? title : "untitle",
      expireAt: expireDate
    }
  })

  return Response.json(newLink, { status: 200 })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) return Response.json("Missing id", { status: 400 })

  const session = await getSession()

  if (!session.isLogged) {
    return Response.redirect("/auth/signin", 301)
  }

  const link = await prisma.links.findUnique({
    where: { id }
  })

  if (!link) return Response.json("Invalid id", { status: 400 })

  if (link.userId != session.id) {
    return Response.json("Unable to delete others link", { status: 400 })
  }

  try {
    const deleteLink = await prisma.links.delete({
      where: { id }
    })

    return Response.json(deleteLink, { status: 200 })
  } catch (error) {
    return Response.json("Unable to delete link", { status: 400 })
  }
}
