"use client";

import { cn } from "@dookdiks/utils";
import { ComponentProps, FC } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "@/styles/component/input.module.scss";

const DateInput: FC<ComponentProps<typeof DatePicker>> = ({
	className,
	...restProps
}) => {
	return (
		<DatePicker
			className={cn(
				"rmdp-mobile",
				styles.date,
				styles.inputContainer,
				className
			)}
			minDate={new Date()}
			{...restProps}
		/>
	);
};

export default DateInput;
