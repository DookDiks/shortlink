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
			<div className="relative md:w-fit">
				<input
					ref={ref}
					type={inputType}
					className={cn(
						"border-2 rounded outline-none focus:outline-none border-neutral p-2 px-3 w-full md:w-fit md:min-w-[25rem] text-neutral bg-primary text-base",
						"active:shadow-none",
						className
					)}
					{...restProps}
				/>
				<button
					onClick={togglePassword}
					className="absolute top-1/2 right-4 -translate-y-1/2"
				>
					{inputType === "password" ? (
						<AiFillEyeInvisible className="h-5 w-auto" />
					) : (
						<AiFillEye className="h-5 w-auto" />
					)}
				</button>
			</div>
		);
	}
);

Password.displayName = "Password";

export default Password;
