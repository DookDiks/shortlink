import bcrypt from 'bcrypt';
import { prisma } from "@/lib/prisma";
import { SignUpProps } from '@/components/auth/SignUpForm';
import { tryCatch } from "@dookdiks/error"

export async function POST(request: Request) {
  const { email, confirmPassword, password } = await request.json() as SignUpProps

  if (!email) return Response.json({ target: "email", message: "Missing email" }, { status: 400 })
  if (!password) return Response.json({ target: "password", message: "Missing password" }, { status: 400 })
  if (!confirmPassword) return Response.json({ target: "confirmPassword", message: "Missing confirm password" }, { status: 400 })


  const existingUser = await tryCatch(() => prisma.user.findUnique({
    where: {
      email
    }
  }), (e) => Response.json({ error: e, message: "Something went wrong with prisma" }, { status: 500 }))

  // try {
  //   const existingUser = await prisma.user.findUnique({
  //     where: {
  //       email
  //     }
  //   })
  // } catch (error) {
  //   return Response.json({ target: "email", message: "Something went wrong" }, { status: 500 })
  // }

  if (existingUser) return Response.json({ target: "email", message: "User already exists" }, { status: 400 })

  const user = await tryCatch(async () => prisma.user.create({
    data: {
      email,
      password: await bcrypt.hash(password, 10),
    }
  }), (e) => Response.json({ error: e, message: "Something went wrong with prisma" }, { status: 500 }))

  // const user = await prisma.user.create({
  //   data: {
  //     email,
  //     password: await bcrypt.hash(password, 10),
  //   }
  // })

  return Response.json(user, { status: 200 })
}
