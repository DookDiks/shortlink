"use server"

import {ShortLink, ShortLinkError, ShortLinkType, UpdateShortLink, UpdateShortLinkType} from "@/types/ShortLinkType"
import {} from "@/types/ShortLinkType";
import {getSession} from "@/utils/session";
import {prisma} from "@/lib/prisma";
import {generateRandomString} from "@/utils/generateRandomString";
import {ServerError} from "@/types/utils";
import {revalidatePath} from "next/cache";


type CreateLink = (data: ShortLink) => Promise<ServerError<ShortLinkError>>
export const createLink: CreateLink = async (data) => {

  const result = ShortLinkType.safeParse(data);

  if (!result.success) return {
    success: false,
    errors: result.error.format(),
    type: "zod"
  }

  const session = await getSession()

  const lists = await prisma.links.findUnique({
    where: {
      entrypoint: data.entrypoint
    }
  })

  if (lists) {
    return {
      success: false,
      errors: "Entry point already exists",
      type: "server"
    }
  }

  if (!session.isLogged) {
    throw new Error("User not logged in")
  }

  try {
    await prisma.links.create({
      data: {
        userId: session.id,
        endpoint: data.endpoint,
        entrypoint: data.entrypoint ? data.entrypoint : generateRandomString(6),
        title: data.title ? data.title : "untitle",
        expireAt: data.expireDate
      }
    })

    revalidatePath("/")

    return {
      success: true,
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        errors: error.message,
        type: "server"
      }
    }
    return {
      success: false,
      errors: "Error",
      type: "server"
    }
  }
}

type UpdateLink = (data: UpdateShortLink & { id: string }) => Promise<ServerError<ShortLinkError>>

export const updateLink: UpdateLink = async (data) => {

  const result = UpdateShortLinkType.safeParse(data);
  const listId = data.id

  if (!result.success) return {
    success: false,
    errors: result.error.format(),
    type: "zod"
  }

  const lists = await prisma.links.findUnique({
    where: {
      entrypoint: data.entrypoint
    }
  })

  if (lists && lists.id !== listId) {
    return {
      success: false,
      errors: "Entry point already exists",
      type: "server"
    }
  }

  const session = await getSession()

  if (!session.isLogged) {
    throw new Error("User not logged in")
  }

  try {
    await prisma.links.update({
      where: {id: listId},
      data: {
        userId: session.id,
        endpoint: data.endpoint,
        entrypoint: data.entrypoint,
        title: data.title,
        expireAt: data.expireDate
      }
    })
    revalidatePath("/")

    return {
      success: true,
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        errors: error.message,
        type: "server"
      }
    }
    return {
      success: false,
      errors: "Error",
      type: "server"
    }
  }
}

type DeleteLink = (idList: string[]) => Promise<ServerError<ShortLinkError>>

export const deleteLink: DeleteLink = async (idList) => {
  const session = await getSession()

  if (!session.isLogged) {
    throw new Error("User not logged in")
  }

  try {
    await prisma.links.deleteMany({
      where: {
        id: {
          in: idList
        }
      }
    })

    revalidatePath("/")

    return {
      success: true,
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        errors: error.message,
        type: "server"
      }
    }
    return {
      success: false,
      errors: "Error",
      type: "server"
    }
  }
}