import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const history = await prisma.cronHistory.findMany({})

  return NextResponse.json(history, { status: 200 });
}