"use client"

import { cn } from "@dookdiks/utils";
import toast, { Renderable, Toaster } from "react-hot-toast";

export const useToseter = () => {

  const setToast = (value: string, icon?: Renderable | string) => {
    return toast.success(value, {
      className: cn(""),
      position: "top-right",
      icon: icon,
      duration: 5000,
    });
  }

  return { setToast, Toaster }
}