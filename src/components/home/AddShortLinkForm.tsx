"use client";

import Input from "@/components/input/Input";

import Label from "@/components/form/Label";
import ErrorMessage from "@/components/form/ErrorMessage";
import FormContainer from "@/components/form/Container";

import Button from "@/components/button/Button";

import { cn } from "@dookdiks/utils";

import { useRouter } from "next/navigation";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { FC, useRef, useState } from "react";
import DateInput from "@/components/input/Date";

export const addShortLinkFormSchema = z.object({
	title: z.string().max(50, "Title must be less than 50 characters").optional(),
	endpoint: z.string().min(1, "Endpoint is required").url("Invalid URL"),
	entrypoint: z
		.string()
		.regex(/^[^/]*$/, "'/' is not allow in this field")
		.optional(),
	expireDate: z
		.date({
			required_error: "Date is required",
			invalid_type_error: "Format invalid",
		})
		.min(new Date(), "Date must be in the future"),
});

export type AddShortLinkFormSchema = z.infer<typeof addShortLinkFormSchema>;

const AddShortLinkForm: FC<{ afrerSubmit?: () => void }> = ({
	afrerSubmit,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
		control,
	} = useForm<AddShortLinkFormSchema>({
		resolver: zodResolver(addShortLinkFormSchema),
		defaultValues: {
			expireDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
		},
	});

	const [isSubmitting, setIsSubmitting] = useState(false);

	const formRef = useRef<HTMLFormElement>(null);

	const router = useRouter();

	const onSubmit: SubmitHandler<AddShortLinkFormSchema> = async (data) => {
		setIsSubmitting(true);
		try {
			const axiosRes = await axios.post("/api/shortlink", data);
			if (axiosRes.status === 200) {
				formRef.current?.reset();
				router.refresh();
				afrerSubmit && afrerSubmit();
			}
		} catch (error) {
			if (axios.isAxiosError<{ target: string; message: string }>(error)) {
				const errorMessage = error.response?.data;

				switch (errorMessage?.target) {
					case "title":
						setError("title", { message: errorMessage.message });
						break;
					case "endpoint":
						setError("endpoint", { message: errorMessage.message });
						break;
					case "entrypoint":
						setError("entrypoint", {
							message: errorMessage.message,
						});
						break;
					default:
						alert(errorMessage?.message);
						break;
				}
			}
		}
		setIsSubmitting(false);
	};

	return (
		<>
			<form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
				<FormContainer>
					<Label htmlFor="endpoint">Destination</Label>
					<Input
						id="endpoint"
						{...register("endpoint")}
						placeholder="https://example.com/"
					/>
					<ErrorMessage>{errors.endpoint?.message}</ErrorMessage>
				</FormContainer>
				<FormContainer>
					<Label htmlFor="title">Title ( optional )</Label>
					<Input id="title" {...register("title")} placeholder="Example site" />
					<ErrorMessage>{errors.title?.message}</ErrorMessage>
				</FormContainer>
				<FormContainer>
					<Label htmlFor="entrypoint">Search parameter ( optional )</Label>
					<Input
						id="entrypoint"
						{...register("entrypoint")}
						placeholder="example"
					/>
					<ErrorMessage>{errors.entrypoint?.message}</ErrorMessage>
				</FormContainer>

				<FormContainer>
					<Label htmlFor="entrypoint">Expire date</Label>
					<Controller
						name="expireDate"
						rules={{
							required: true,
							min: new Date().toISOString().substring(0, 10),
						}}
						render={({ field: { onChange, name, value } }) => {
							const test = new Date();
							return (
								<DateInput
									required
									name={name}
									value={value}
									minDate={new Date()}
									id="entrypoint"
									placeholder="Expiration date"
									onChange={(date) => {
										onChange(date);
									}}
									format={"MM/DD/YYYY"}
								/>
							);
						}}
						control={control}
					/>

					<ErrorMessage>{errors.entrypoint?.message}</ErrorMessage>
				</FormContainer>
				<Button
					className={cn("w-full mt-6")}
					type="submit"
					disabled={isSubmitting}
				>
					{!isSubmitting ? "Create short link" : "Creating short link..."}
				</Button>
			</form>
		</>
	);
};

export default AddShortLinkForm;
