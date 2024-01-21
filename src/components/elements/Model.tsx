"use client";

import { cn } from "@dookdiks/utils";
import { ComponentProps, FC } from "react";
import { IoCloseOutline } from "react-icons/io5";
import Button from "@/components/button/Button";
import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import styles from "@/styles/component/model.module.scss";

const Model: FC<
	Pick<ComponentProps<"div">, "children"> & {
		visible: boolean;
		onClose: () => void;
		title?: string;
	}
> = ({ visible = false, onClose, children, title }) => {
	const ref = useRef<HTMLDivElement>(null);

	useOnClickOutside(ref, () => visible && onClose());
	return (
		<div
			id="modelConfirm"
			className={cn(styles.model, !visible && styles.hidden)}
		>
			<div ref={ref} className={cn(styles.model_container)}>
				<div className={cn(styles.model_close_btn)}>
					<div>
						<Button onClick={() => onClose()} type="button">
							<IoCloseOutline />
						</Button>
					</div>
				</div>
				<div className={cn(styles.model_title)}>{title}</div>
				<div
					style={{
						padding: "1.25rem",
						paddingTop: "0",
					}}
				>
					{children}
				</div>
			</div>
		</div>
	);
};

export default Model;
