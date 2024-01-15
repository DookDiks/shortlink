"use client";

import { cn } from "@dookdiks/utils";
import { ComponentProps, FC } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import enAU from "date-fns/locale/en-AU";

const DateInput: FC<ComponentProps<typeof DatePicker>> = ({
	className,
	...restProps
}) => {
	registerLocale("en-AU", enAU);
	return (
		<DatePicker
			className={cn(
				"rmdp-mobile border-2 rounded outline-none focus:outline-none border-neutral p-2 px-3 w-full md:w-fit md:min-w-[25rem] text-neutral bg-primary text-base",
				"active:shadow-none",
				className
			)}
			locale={"enAU"}
			
			minDate={new Date()}
			{...restProps}
		/>
	);
};

export default DateInput;
