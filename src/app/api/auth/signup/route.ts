import bcrypt from 'bcrypt';
import { prisma } from "@/lib/prisma";
import { SignUpProps } from '@/components/auth/SignUpForm';
// import { tryCatch } from "@dookdiks/error"

async function tryCatch<T>(fn: () => Promise<T>) {
  return fn()
}

export async function POST(request: Request) {
  const { email, confirmPassword, password } = await request.json() as SignUpProps

  if (!email) return Response.json({ target: "email", message: "Missing email" }, { status: 400 })
  if (!password) return Response.json({ target: "password", message: "Missing password" }, { status: 400 })
  if (!confirmPassword) return Response.json({ target: "confirmPassword", message: "Missing confirm password" }, { status: 400 })


  const existingUser = await tryCatch(() => prisma.user.findUnique({
    where: {
      email
    }
  })).then((user) => user).catch((e) => Response.json("Some error happened in getting user from database", { status: 500 }))

  if (existingUser) return Response.json({ target: "email", message: "User already exists" }, { status: 400 })

  const user = await tryCatch(async () => prisma.user.create({
    data: {
      email,
      password: await bcrypt.hash(password, 10),
    }
  })).then((user) => user).catch(() => Response.json("Some error happened in creating user", { status: 500 }))

  return Response.json(user, { status: 200 })
}
