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

import { signUp } from "@/actions/authAction";

import { SignUpSchema, SignUp, SignUpError } from "@/types/SignUpType";
import { redirect } from "next/navigation";

const SignUpForm = () => {
	const [error, setError] = useState<SignUpError>();
	const [success, setSuccess] = useState(true);

	const clientAction = async (formData: FormData) => {
		setSuccess(false);
		const data = Object.fromEntries(formData.entries()) as SignUp;

		const result = SignUpSchema.safeParse(data);

		// NOTE - handle client Error
		if (!result.success) {
			const errorFormat = result.error.format();
			setSuccess(true);

			return setError({
				success: false,
				errors: {
					email: errorFormat.email?._errors?.[0],
					password: errorFormat.password?._errors?.[0],
					confirmPassword: errorFormat.confirmPassword?._errors?.[0],
				},
			});
		}

		const actionResult = await signUp(result.data);

		// NOTE - handle Error
		if (!actionResult?.success) {
			setSuccess(true);
			return setError(actionResult);
		}
		if (typeof actionResult === "string") {
			console.log(actionResult);
		}
		setSuccess(true);

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
			<FormContainer>
				<Label htmlFor="password">Confirm Password</Label>
				<Password
					name="confirmPassword"
					id="confirm-password"
					placeholder="Confirm Password"
				/>
				<ErrorMessage>{error?.errors?.confirmPassword}</ErrorMessage>
			</FormContainer>
			{/* TODO - change disable */}
			<Button disabled={!success} type="submit" className="w-full mt-8">
				{success ? "Sign up" : "Signing up..."}
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

export default SignUpForm;
