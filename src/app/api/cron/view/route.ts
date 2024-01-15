import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const history = await prisma.cronHistory.findMany({
    where: {
      createdAt: {
        lte: new Date(Date.now() - 24 * 60 * 60 * 1000)
      }
    }
  })

  return NextResponse.json(history, { status: 200 });
}