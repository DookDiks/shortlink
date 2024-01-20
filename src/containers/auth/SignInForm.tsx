"use client";

import { cn } from "@dookdiks/utils";

import FormContainer from "@/components/form/Container";
import Label from "@/components/form/Label";
import ErrorMessage from "@/components/form/ErrorMessage";
import Input from "@/components/input/Input";
import Password from "@/components/input/Password";
import Button from "@/components/button/Button";
import Link from "next/link";
import { useState } from "react";

import { signIn } from "@/actions/authAction";

import { SignIn, SignInError, SignInSchema } from "@/types/SignInType";
import { redirect } from "next/navigation";

const SignInForm = () => {
	const [error, setError] = useState<SignInError>();
	const [success, setSuccess] = useState(true);

	const clientAction = async (formData: FormData) => {
		setSuccess(false);
		const data = Object.fromEntries(formData.entries()) as SignIn;

		const result = SignInSchema.safeParse(data);

		// NOTE - handle client Error
		if (!result.success) {
			const errorFormat = result.error.format();
			setSuccess(true);
			return setError({
				success: false,
				errors: {
					email: errorFormat.email?._errors?.[0],
					password: errorFormat.password?._errors?.[0],
				},
			});
		}

		const actionResult = await signIn(result.data);

		// NOTE - handle Error
		if (!actionResult?.success) {
			setSuccess(true);

			return setError(actionResult);
		}
		if (typeof actionResult === "string") {
			console.log(actionResult);
		}

		setSuccess(false);
		redirect("/auth/signin");
	};

	return (
		<form
			action={clientAction}
			className={cn("flex flex-col gap-1 px-4 w-full md:w-fit")}
		>
			<FormContainer>
				<Label htmlFor="email">Email</Label>
				<Input type="email" name="email" id="email" placeholder="Email" />
				<ErrorMessage>{error?.errors?.email}</ErrorMessage>
			</FormContainer>
			<FormContainer>
				<Label htmlFor="password">Password</Label>
				<Password name="password" id="password" placeholder="Password" />
				<ErrorMessage>{error?.errors?.password}</ErrorMessage>
			</FormContainer>
			{/* TODO - change disable */}
			<Button disabled={!success} type="submit" className="w-full mt-8">
				{success ? "Sign in" : "Signing in..."}
			</Button>
			<div className={cn("mt-4 text-sm text-neutral hover:text-neutral-light")}>
				<Link href={"/auth/signin"}>
					Already have an account{" "}
					<span className="font-semibold text-highlight">click</span> here to
					sign in
				</Link>
			</div>
		</form>
	);
};

export default SignInForm;
