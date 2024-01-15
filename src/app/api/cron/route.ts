import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';


const getExpireCrons = async () => {
  const history = await prisma.cronHistory.findMany({
    where: {
      createdAt: {
        lte: new Date(Date.now() - 24 * 60 * 60 * 1000)
      }
    }
  })

  const deleteHistory = history.map(h => prisma.cronHistory.delete({
    where: { id: h.id }
  }))

  return deleteHistory

}

const getExpireLinks = async () => {
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

  return deleteLinks
}

export async function GET(request: Request) {
  if (request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const expireLinks = await getExpireLinks()

  const expireCrons = await getExpireCrons()

  try {
    const links = await Promise.all(expireLinks)

    await Promise.all(expireCrons)

    await prisma.cronHistory.create({
      data: {
        linkNumber: links.length
      }
    })


    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false, error }, { status: 400 });
  }
}