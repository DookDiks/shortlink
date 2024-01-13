import { cn } from "@dookdiks/utils";
import { ComponentProps, forwardRef } from "react";

const Label = forwardRef<HTMLLabelElement, ComponentProps<"label">>(
	({ className, ...restProps }, ref) => {
		return (
			<label
				ref={ref}
				className={cn("text-base text-neutral font-semibold", className)}
				{...restProps}
			/>
		);
	}
);

Label.displayName = "Label";

export default Label;
