import { ComponentProps, forwardRef } from "react";
import styles from "@/styles/component/button.module.scss";
import { cn } from "@dookdiks/utils";

const Button = forwardRef<HTMLButtonElement, ComponentProps<"button">>(
	({ className, ...restProps }, ref) => {
		return (
			<button
				ref={ref}
				className={cn(styles.button, className)}
				{...restProps}
			/>
		);
	}
);

Button.displayName = "Button";

export default Button;
