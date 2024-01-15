import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  if (request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

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

  try {
    await Promise.all(deleteLinks)
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false, error }, { status: 400 });
  }
}