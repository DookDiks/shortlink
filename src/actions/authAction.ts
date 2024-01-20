"use server";

import { SignUpSchema, SignUp, SignUpError } from "@/types/SignUpType";
import { SignIn, SignInError, SignInSchema } from "@/types/SignInType";
import { prisma } from "@/lib/prisma";
import { createSession } from './../utils/session';
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";

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
    const user = await prisma.user.findUnique({
      where: {
        email: result.data.email
      }
    })

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
    await prisma.user.create({
      data: {
        email: result.data.email,
        password: bcrypt.hashSync(result.data.password, 10)
      }
    })

    revalidatePath("/auth/signup")

    return {
      success: true,
    } satisfies SignUpError
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

export const signIn = async (data: SignIn) => {

  const result = SignInSchema.safeParse(data);

  if (!result.success) {
    const resultParse = result.error.format();
    return {
      success: false,
      errors: {
        email: resultParse.email?._errors?.[0],
        password: resultParse.password?._errors?.[0],
      }
    } satisfies SignInError
  }


  try {
    const user = await prisma.user.findUnique({
      where: {
        email: result.data.email
      }
    })

    if (!user) {
      return {
        success: false,
        errors: {
          email: "Email does not exist"
        }
      } satisfies SignInError
    }

    if (!(await bcrypt.compare(result.data.password, user.password))) {
      return {
        success: false,
        errors: {
          password: "Password is incorrect"
        }
      } satisfies SignInError
    }

    await createSession(user.email, user.id)

    revalidatePath("/auth/signin")

    return {
      success: true,
    } satisfies SignInError
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}