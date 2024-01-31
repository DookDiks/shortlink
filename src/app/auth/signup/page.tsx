import Logo from "@/components/logo/DookDik";
import { cn } from "@dookdiks/utils";
import SetUpForm from "@/containers/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "DookDiks - Sign up",
};

const SignUpPage = () => {
	return (
		<>
			<main
				className={cn(
					"flex flex-col justify-center items-center min-h-screen h-screen gap-4"
				)}
			>
				<Logo className={cn("fill-secondary h-auto w-64 mb-16")} />
				<SetUpForm />
			</main>
		</>
	);
};

export default SignUpPage;
