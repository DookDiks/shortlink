"use client";

import Input from "@/components/input/Input";
import Password from "@/components/input/Password";

import Label from "@/components/form/Label";
import ErrorMessage from "@/components/form/ErrorMessage";
import FormContainer from "@/components/form/Container";

import Button from "@/components/button/Button";

import { cn } from "@dookdiks/utils";

import { useRouter } from "next/navigation";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";

const schema = z
	.object({
		email: z
			.string()
			.min(1, "Email is required")
			.email("Invalid email address"),
		password: z.string().min(8, "Password must be at least 8 characters"),
		confirmPassword: z
			.string()
			.min(8, "Password must be at least 8 characters"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export type SignUpProps = z.infer<typeof schema>;

const SetUpForm = () => {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<SignUpProps>({ resolver: zodResolver(schema) });

	const onSubmit: SubmitHandler<SignUpProps> = async (data) => {
		try {
			setIsSubmitting(true);
			const axiosRes = await axios.post("/api/auth/signup", data);

			if (axiosRes.status === 200) router.push("/auth/signin");
		} catch (error) {
			if (axios.isAxiosError<{ target: string; message: string }>(error)) {
				const errorMessage = error.response?.data;
				switch (errorMessage?.target) {
					case "email":
						setError("email", { message: errorMessage.message });
						break;
					case "password":
						setError("password", { message: errorMessage.message });
						break;
					case "confirmPassword":
						setError("confirmPassword", {
							message: errorMessage.message,
						});
						break;
					default:
						alert(error);
						console.error(error);
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
				<FormContainer>
					<Label htmlFor="password">Confirm Password</Label>
					<Password
						id="confirm-password"
						placeholder="Confirm Password"
						{...register("confirmPassword")}
					/>
					<ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
				</FormContainer>
				<Button disabled={isSubmitting} type="submit" className="w-full mt-8">
					{!isSubmitting ? "Sign up" : "Signing up..."}
				</Button>
				<div
					className={cn("mt-4 text-sm text-neutral hover:text-neutral-light")}
				>
					<Link href={"/auth/signin"}>
						Already have an account{" "}
						<span className="font-semibold text-highlight">click</span> here to
						sign in
					</Link>
				</div>
			</form>
		</>
	);
};

export default SetUpForm;
