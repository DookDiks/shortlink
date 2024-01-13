// Next.js Server Components and Server Actions (App Router)
import { cookies } from 'next/headers';
import { getIronSession, SessionOptions } from 'iron-session';
import { User } from '@prisma/client';

const secret = process.env.SECRET_COOKIE_PASSWORD;

export type Session = Pick<User, "email" | "id"> & {
  isLogged: boolean;
}

export const getSession = async () => {
  if (!secret) throw new Error("SECRET_COOKIE_PASSWORD is not set");
  return getIronSession<Session>(cookies(), {
    password: secret,
    cookieName: "session-dookdik-shorten-link",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    }
  });
}

export const createSession = async (email: string, id: string) => {
  const session = await getSession();
  session.email = email;
  session.id = id
  session.isLogged = true;
  await session.save();
  return session;
}

export const distroySession = async () => {
  const session = await getSession();
  session.destroy();
}
