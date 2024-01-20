import Logo from "@/components/logo/DookDik";
import { cn } from "@dookdiks/utils";
import SignInForm from "@/containers/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
	title:"DookDiks - Sign up"
}


const SignUpPage = () => {
	return (
		<>
			<main
				className={cn(
					"flex flex-col relative justify-center items-center min-h-screen bg-primary gap-16 p-8"
				)}
			>
				<Logo className="fill-neutral w-56 h-auto" />
				<SignInForm />
			</main>
		</>
	);
};

export default SignUpPage;
