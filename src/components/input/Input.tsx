"use client";

import { cn } from "@dookdiks/utils";
import { ComponentProps, forwardRef } from "react";
import styles from "@/styles/component/input.module.scss";

const Input = forwardRef<HTMLInputElement, ComponentProps<"input">>(
	({ className, ...restProps }, ref) => {
		return (
			<input
				ref={ref}
				type="text"
				className={cn(styles.inputContainer, styles.input, className)}
				{...restProps}
			/>
		);
	}
);

Input.displayName = "Input";

export default Input;
