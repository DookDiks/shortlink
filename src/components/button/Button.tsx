import { cn } from "@dookdiks/utils";
import { ComponentProps, forwardRef } from "react";

const Button = forwardRef<HTMLButtonElement, ComponentProps<"button">>(
	({ className, ...restProps }, ref) => {
		return (
			<button
				ref={ref}
				className={cn(
					"bg-neutral text-primary px-8 py-3 ease-in-out duration-300 hover:bg-neutral-light mx-auto rounded disabled:bg-neutral-light",
					className
				)}
				{...restProps}
			/>
		);
	}
);

Button.displayName = "Button";

export default Button;
