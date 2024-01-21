import { cn } from "@dookdiks/utils";
import { FC, ComponentProps } from "react";
import styles from "@/styles/component/form.module.scss";

const ErrorMessage: FC<ComponentProps<"div">> = ({
	className,
	...restProps
}) => {
	return <div className={cn(styles.error, className)} {...restProps} />;
};

export default ErrorMessage;
