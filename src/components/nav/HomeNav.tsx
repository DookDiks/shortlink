import { signOutAction } from "@/actions/signOutAction";
import { cn } from "@dookdiks/utils";
import { FC } from "react";
import Button from "@/components/button/Button";
import Logo from "@/components/logo/DookDik";

const HomeNav: FC = () => {
	return (
		<nav
			className={cn(
				"flex justify-between items-center p-2 border-b-2 border-secondary fixed z-40 w-full bg-primary"
			)}
		>
			<div className={cn("flex justify-center items-center h-full gap-4")}>
				<Logo className={cn("h-auto w-14 fill-secondary")} />
				Short link
			</div>
			<form action={signOutAction}>
				<Button type="submit" style={{ padding: "0.25rem 0.5rem" }}>
					Sign out
				</Button>
			</form>
		</nav>
	);
};

export default HomeNav;
