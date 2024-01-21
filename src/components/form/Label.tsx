import { cn } from "@dookdiks/utils";
import { ComponentProps, forwardRef } from "react";
import styles from "@/styles/component/form.module.scss";

const Label = forwardRef<HTMLLabelElement, ComponentProps<"label">>(
	({ className, ...restProps }, ref) => {
		return (
			<label ref={ref} className={cn(styles.label, className)} {...restProps} />
		);
	}
);

Label.displayName = "Label";

export default Label;
