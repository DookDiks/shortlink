"use client";

import Input from "@/components/input/Input";
import Password from "@/components/input/Password";

import Label from "@/components/form/Label";
import ErrorMessage from "@/components/form/ErrorMessage";
import FormContainer from "@/components/form/Container";

import Button from "@/components/button/Button";

import { cn } from "@dookdiks/utils";
import { FormEvent, useState } from "react";

import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";

export const SighInFormSchema = z.object({
	email: z.string().min(1, "Email require").email("Invalid email address"),
	password: z.string().min(8, "Password must be at least 8 characters"),
});

export type SignInProps = z.infer<typeof SighInFormSchema>;

const SetUpForm = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const router = useRouter();

	const {
		register,
		formState: { errors },
		handleSubmit,
		setError,
	} = useForm<SignInProps>({
		resolver: zodResolver(SighInFormSchema),
	});

	const onSubmit: SubmitHandler<SignInProps> = async (data) => {
		try {
			setIsSubmitting(true);

			const axiosRes = await axios.post("/api/auth/signin", data);

			if (axiosRes.status === 200) router.push("/");
		} catch (error) {
			if (axios.isAxiosError<{ target: string; message: string }>(error)) {
				const errorMessage = error.response?.data;
				switch (errorMessage?.target) {
					case "email":
						setError("email", {
							message: errorMessage.message,
						});
						break;
					case "password":
						setError("password", {
							message: errorMessage.message,
						});
						break;
					default:
						alert("Something went wrong");
						break;
				}
			}
		}
		setIsSubmitting(false);
	};
	return (
		<>
			<form
				className={cn("flex flex-col gap-1 px-4 w-full md:w-fit")}
				onSubmit={handleSubmit(onSubmit)}
			>
				<FormContainer>
					<Label htmlFor="email">Email</Label>
					<Input
						type="email"
						id="email"
						placeholder="Email"
						{...register("email")}
					/>
					<ErrorMessage>{errors.email?.message}</ErrorMessage>
				</FormContainer>
				<FormContainer>
					<Label htmlFor="password">Password</Label>
					<Password
						id="password"
						placeholder="Password"
						{...register("password")}
					/>
					<ErrorMessage>{errors.password?.message}</ErrorMessage>
				</FormContainer>
				<Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
					{!isSubmitting ? "Sign In" : "Signing In..."}
				</Button>
				<div
					className={cn("mt-4 text-sm text-neutral hover:text-neutral-light")}
				>
					<Link href={"/auth/signup"}>
						Do not have an account{" "}
						<span className="font-semibold text-highlight">click</span> here to
						sign up
					</Link>
				</div>
			</form>
		</>
	);
};

export default SetUpForm;
