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
import styles from "@/styles/component/input.module.scss";

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
			<div className={styles.passwordContainer}>
				<input
					ref={ref}
					type={inputType}
					className={cn(
						styles.inputContainer,

						className
					)}
					{...restProps}
				/>
				<button
					type="button"
					tabIndex={-1}
					onClick={togglePassword}
					className={cn(styles.showPassword)}
				>
					{inputType === "password" ? (
						<AiFillEyeInvisible className={cn(styles.showPasswordIcon)} />
					) : (
						<AiFillEye className={cn(styles.showPasswordIcon)} />
					)}
				</button>
			</div>
		);
	}
);

Password.displayName = "Password";

export default Password;
