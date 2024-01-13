"use server";

import { distroySession } from "@/utils/session";
import { redirect } from "next/navigation";

export const signOutAction = async () => {

  try {
    await distroySession();
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error("Something went wrong");
  }

  redirect("/");
};