import { cn } from "@dookdiks/utils";
import { FC, ComponentProps } from "react";

const FormContainer: FC<ComponentProps<"div">> = ({
	className,
	...restProps
}) => {
	return (
		<>
			<div className={cn("grid gap-1", className)} {...restProps} />
		</>
	);
};

export default FormContainer;
