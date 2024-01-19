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


// Detail: DNS problem: NXDOMAIN looking up A for sl.redbiiddsun.com - check that a DNS record exists for this domain; no valid AAAA records found for sl.redbiiddsun.com


// Started issuing a wildcard SSL/TLS certificate from Let's Encrypt for the domain sl.redbiiddsun.com.

// Please wait while Plesk finishes adding a DNS record with the following parameters:
// Record type: TXT
// Domain name: _acme-challenge.sl.redbiiddsun.com
// Record: MFImcJsOTn4tqmyESRq5d41hAOBOoQsY7SoakyOghGQ