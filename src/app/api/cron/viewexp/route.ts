import { prisma } from "@/lib/prisma";
import { addDays } from "date-fns";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

  const expireLinks = await prisma.links.findMany({
    where: {
      expireAt: {
        lte: new Date()
      }
    }
  })


  return NextResponse.json({ date: new Date(), expireLinks }, { status: 200 });
}