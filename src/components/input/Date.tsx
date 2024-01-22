"use client";

import { cn } from "@dookdiks/utils";
import { ComponentProps, FC } from "react";
import styles from "@/styles/component/input.module.scss";

const DateInput: FC<ComponentProps<"input">> = ({
	className,
	...restProps
}) => {
	return (
		<input
			type="date"
			className={cn(styles.date, styles.inputContainer, className)}
			{...restProps}
		/>
	);
};

export default DateInput;
