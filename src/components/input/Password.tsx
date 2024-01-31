"use client";

import { cn } from "@dookdiks/utils";
import {
	ComponentProps,
	HTMLInputTypeAttribute,
	forwardRef,
	useState,
	MouseEvent,
} from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

type PasswordProps = Omit<ComponentProps<"input">, "type"> & {
	showPassword?: boolean;
};

const Password = forwardRef<HTMLInputElement, PasswordProps>(
	({ className, showPassword, ...restProps }, ref) => {
		const [inputType, setInputType] = useState<HTMLInputTypeAttribute>(
			showPassword ? "text" : "password"
		);

		const togglePassword = (e: MouseEvent<HTMLButtonElement>) => {
			e.preventDefault();

			if (inputType === "password") {
				setInputType("text");
			} else {
				setInputType("password");
			}
		};
		return (
			<div className={cn("relative")}>
				<input
					ref={ref}
					type={inputType}
					className={cn(
						"border-2 border-secondary rounded p-2 focus:outline-secondary-highlight lg:min-w-96 text-base min-w-72 w-full lg:w-fit",
						className
					)}
					{...restProps}
				/>
				<button
					type="button"
					tabIndex={-1}
					onClick={togglePassword}
					className={cn("absolute right-4 top-1/2 -translate-y-1/2 ")}
				>
					{inputType === "password" ? (
						<AiFillEyeInvisible className={cn("w-4 h-auto")} />
					) : (
						<AiFillEye className={cn("w-4 h-auto")} />
					)}
				</button>
			</div>
		);
	}
);

Password.displayName = "Password";

export default Password;
