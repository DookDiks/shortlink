"use client";

import { cn } from "@dookdiks/utils";
import { ComponentProps, FC } from "react";
import DatePicker from "react-multi-date-picker";

const DateInput: FC<ComponentProps<typeof DatePicker>> = ({
	className,
	...restProps
}) => {
	return (
		<DatePicker
			className={cn()}
			inputClass={cn(
				"rmdp-mobile border-2 rounded outline-none focus:outline-none border-neutral p-2 px-3 w-full md:w-fit md:min-w-[25rem] text-neutral bg-primary text-base",
				"active:shadow-none",
				className
			)}
			{...restProps}
		/>
	);
};

export default DateInput;
