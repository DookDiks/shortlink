import Logo from "@/components/logo/DookDik";
import { cn } from "@dookdiks/utils";
import SignInForm from "@/containers/auth/SignInForm";
import { Metadata } from "next";
import styles from "@/styles/pages/authPage.module.scss";

export const metadata: Metadata = {
	title: "DookDiks - Sign up",
};

const SignUpPage = () => {
	return (
		<>
			<main className={cn(styles.main)}>
				<Logo className={cn(styles.logo)} />
				<SignInForm />
			</main>
		</>
	);
};

export default SignUpPage;
