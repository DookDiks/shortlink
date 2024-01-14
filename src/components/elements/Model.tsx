"use client";

import { cn } from "@dookdiks/utils";
import { links } from "@prisma/client";
import { ComponentProps, FC } from "react";
import { IoCloseOutline } from "react-icons/io5";
import Button from "@/components/button/Button";
import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

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
			className={cn(
				"fixed z-50 inset-0 bg-neutral bg-opacity-70 overflow-y-auto h-full w-full px-4",
				{
					hidden: !visible,
				}
			)}
		>
			<div
				ref={ref}
				className="relative lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 top-4 rounded bg-primary max-w-md border-2 border-neutral"
			>
				<div className="flex flex-col justify-end w-full items-end p-2">
					<div>
						<Button
							className={cn("p-1 rounded lg:text-2xl text-lg")}
							onClick={() => onClose()}
							type="button"
						>
							<IoCloseOutline />
						</Button>
					</div>
				</div>
				<div className={cn("text-center font-semibold text-2xl mb-4")}>
					{title}
				</div>
				<div className="p-6 pt-0">{children}</div>
			</div>
		</div>
	);
};

export default Model;
