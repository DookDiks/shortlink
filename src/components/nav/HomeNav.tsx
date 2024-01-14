import { signOutAction } from "@/actions/signOutAction";
import { cn } from "@dookdiks/utils";
import { FC } from "react";
import Button from "@/components/button/Button";
import Logo from "@/components/logo/DookDik";

const HomeNav: FC = () => {
	return (
		<nav
			className={cn(
				"border-neutral border-b-2 p-2 flex items-center justify-between fixed w-full bg-primary z-10"
			)}
		>
			<div className={cn("flex items-center gap-4")}>
				<Logo className="h-auto w-14 fill-neutral" />
				Short link
			</div>
			<form action={signOutAction}>
				<Button type="submit" className="px-4 py-2">
					Sign out
				</Button>
			</form>
		</nav>
	);
};

export default HomeNav;