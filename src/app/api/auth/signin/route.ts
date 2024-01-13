import { SignInProps } from "@/components/auth/SignInForm";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/utils/session";
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  const { email, password } = await request.json() as SignInProps

  if (!email) return Response.json({ target: "email", message: "Missing email" }, { status: 400 })
  if (!password) return Response.json({ target: "password", message: "Missing password" }, { status: 400 })

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (!user) return Response.json({ target: "email", message: "User does not exist" }, { status: 400 })

  if (!(await bcrypt.compare(password, user.password))) return Response.json({ target: "password", message: "Incorrect password" }, { status: 400 })

  await createSession(user.email, user.id)

  return Response.json(user, { status: 200 })
}
