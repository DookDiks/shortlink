import {prisma} from '@/lib/prisma';
import {addDays} from 'date-fns';
import {NextResponse} from 'next/server';

export async function GET(request: Request) {

  try {

    const links = await prisma.links.findMany({
      where: {
        expireAt: {
          lte: new Date()
        }
      }
    })

    await prisma.links.deleteMany({
      where: {
        expireAt: {
          lte: new Date()
        }
      }
    })

    await prisma.cronHistory.deleteMany({
      where: {
        createdAt: {
          lte: addDays(new Date(), -30)
        }
      }
    })

    await prisma.cronHistory.create({
      data: {
        linkNumber: links.length
      }
    })

    return NextResponse.json({ok: true});
  } catch
    (error) {
    return NextResponse.json({ok: false, error}, {status: 400});
  }
}