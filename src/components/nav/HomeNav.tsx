import { signOutAction } from "@/actions/signOutAction";
import { cn } from "@dookdiks/utils";
import { FC } from "react";
import Button from "@/components/button/Button";
import Logo from "@/components/logo/DookDik";
import styles from "@/styles/container/topnav.module.scss";

const HomeNav: FC = () => {
	return (
		<nav className={cn(styles.nav)}>
			<div className={cn(styles.nav_logo_container)}>
				<Logo className={styles.logo} />
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
