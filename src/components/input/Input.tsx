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
					"border-2 border-secondary bg-primary rounded p-2 focus:outline-secondary-highlight lg:min-w-96 text-base min-w-72 w-full lg:w-fit",
					className
				)}
				{...restProps}
			/>
		);
	}
);

Input.displayName = "Input";

export default Input;
