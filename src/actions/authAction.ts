"use server";

import { SignUpSchema, SignUp, SignUpError } from "@/types/SignUpType";
import { prisma } from "@/lib/prisma";

export const signUp = async (data: SignUp) => {

  const result = SignUpSchema.safeParse(data);

  if (!result.success) {
    const resultParse = result.error.format();
    return {
      success: false,
      errors: {
        email: resultParse.email?._errors?.[0],
        password: resultParse.password?._errors?.[0],
        confirmPassword: resultParse.confirmPassword?._errors?.[0],
      }
    } satisfies SignUpError
  }

  try {
    prisma.$connect();
    const user = await prisma.user.findUnique({
      where: {
        email: result.data.email
      }
    })
    prisma.$disconnect();

    if (user) {
      return {
        success: false,
        errors: {
          email: "Email already exists"
        }
      } satisfies SignUpError
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }

  try {
    prisma.$connect();
    await prisma.user.create({
      data: {
        email: result.data.email,
        password: result.data.password,
      }
    })
    prisma.$disconnect();

    return {
      success: true,
    } satisfies SignUpError
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}