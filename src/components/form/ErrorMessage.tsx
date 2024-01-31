import { cn } from "@dookdiks/utils";
import { FC, ComponentProps } from "react";

const ErrorMessage: FC<ComponentProps<"div">> = ({
	className,
	...restProps
}) => {
	return (
		<div className={cn("h-4 text-sm text-danger", className)} {...restProps} />
	);
};

export default ErrorMessage;
