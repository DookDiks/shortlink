"use client"

import toast, { Renderable, Toaster } from "react-hot-toast";
import styles from "@/styles/component/toaster.module.scss"

export const useToseter = () => {

  const setToast = (value: string, icon?: Renderable | string) => {
    return toast.success(value, {
      className: styles.toast,
      position: "top-right",
      icon: icon,
      duration: 5000,
    });
  }

  return { setToast, Toaster }
}