import { ComponentProps, forwardRef } from "react";
import { cn } from "@dookdiks/utils";

const Button = forwardRef<HTMLButtonElement, ComponentProps<"button">>(
	({ className, ...restProps }, ref) => {
		return (
			<button
				ref={ref}
				className={cn(
					"p-2 w-full text-primary bg-secondary hover:bg-secondary-highlight rounded ease-in-out duration-200",
					className
				)}
				{...restProps}
			/>
		);
	}
);

Button.displayName = "Button";

export default Button;
