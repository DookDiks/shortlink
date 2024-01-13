"use server";

import { permanentRedirect } from "next/navigation";

export const searchAction = async (search: string) => {
  permanentRedirect(`/${search}`)
};