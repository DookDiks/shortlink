import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const expireLinks = await prisma.links.findMany({
    where: {
      expireAt: {
        lte: new Date()
      }
    }
  })

  return NextResponse.json(expireLinks, { status: 200 });
}