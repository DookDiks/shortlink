import { cn } from "@dookdiks/utils";
import { FC, ComponentProps } from "react";
import styles from "@/styles/component/form.module.scss";

const FormContainer: FC<ComponentProps<"div">> = ({
	className,
	...restProps
}) => {
	return (
		<>
			<div className={cn(styles.container, className)} {...restProps} />
		</>
	);
};

export default FormContainer;
