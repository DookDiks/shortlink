"use client";

import { cn } from "@dookdiks/utils";
import { ComponentProps, forwardRef } from "react";

const Input = forwardRef<HTMLInputElement, ComponentProps<"input">>(
	({ className, ...restProps }, ref) => {
		return (
			<input
				ref={ref}
				type="text"
				className={cn(
					"border-2 rounded outline-none focus:outline-none border-neutral p-2 px-3 w-full md:w-fit md:min-w-[25rem] text-neutral bg-primary text-base",
					"active:shadow-none",
					className
				)}
				{...restProps}
			/>
		);
	}
);

Input.displayName = "Input";

export default Input;
