"use client";

import { cn } from "@dookdiks/utils";
import { ComponentProps, FC } from "react";

const DateInput: FC<ComponentProps<"input">> = ({
	className,
	...restProps
}) => {
	return (
		<input
			type="date"
			className={cn(
				"border-2 border-secondary bg-primary rounded p-2 focus:outline-secondary-highlight lg:min-w-96 text-base min-w-72 w-full lg:w-fit",
				className
			)}
			{...restProps}
		/>
	);
};

export default DateInput;
