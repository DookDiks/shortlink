"use client";

import { links } from "@prisma/client";
import { FC, useRef, useState } from "react";
import FormContainer from "@/components/form/Container";
import ErrorMessage from "@/components/form/ErrorMessage";
import Label from "@/components/form/Label";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@dookdiks/utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import DateInput from "@/components/input/Date";
import { addDays, format } from "date-fns";

export const editShortLinkFormSchema = z.object({
	title: z
		.string()
		.max(50, "Title must be less than 50 characters")
		.min(1, "Title is required"),
	endpoint: z.string().min(1, "Endpoint is required").url("Invalid URL"),
	entrypoint: z
		.string()
		.regex(/^[^/]*$/, "'/' is not allow in this field")
		.min(1, "Search parameter is required"),
	expireDate: z
		.date({
			required_error: "Date is required",
			invalid_type_error: "Format invalid",
		})
		.min(new Date(), "Date must be in the future"),
});

export type EditShortLinkFormSchema = z.infer<typeof editShortLinkFormSchema>;

const LinkEditForm: FC<{ link: links; afrerSubmit?: () => void }> = ({
	link,
	afrerSubmit,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
		control,
	} = useForm<EditShortLinkFormSchema>({
		resolver: zodResolver(editShortLinkFormSchema),
		defaultValues: {
			title: link.title,
			endpoint: link.endpoint,
			entrypoint: link.entrypoint,
			expireDate: addDays(link.expireAt, 0),
		},
	});

	const [isSubmitting, setIsSubmitting] = useState(false);

	const formRef = useRef<HTMLFormElement>(null);

	const router = useRouter();

	const onSubmit: SubmitHandler<EditShortLinkFormSchema> = async (data) => {
		setIsSubmitting(true);

		try {
			const axiosRes = await axios.patch("/api/shortlink", {
				...data,
				id: link.id,
			});
			if (axiosRes.status == 200) {
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
				<Label htmlFor="title">Title</Label>
				<Input id="title" {...register("title")} placeholder="Example site" />
				<ErrorMessage>{errors.title?.message}</ErrorMessage>
			</FormContainer>
			<FormContainer>
				<Label htmlFor="entrypoint">Search parameter</Label>
				<Input
					id="entrypoint"
					{...register("entrypoint")}
					placeholder="example"
				/>
				<ErrorMessage>{errors.entrypoint?.message}</ErrorMessage>
			</FormContainer>
			<Controller
				name="expireDate"
				render={({
					field: { onChange, name, value },
					fieldState: { error },
				}) => {
					return (
						<FormContainer>
							<Label htmlFor="entrypoint">Expire date</Label>
							<DateInput
								required
								name={name}
								value={format(addDays(value, 0), "yyyy-MM-dd")}
								minDate={addDays(new Date(), 1)}
								id="entrypoint"
								onChange={(date) => {
									onChange(date);
								}}
							/>
							<ErrorMessage>{error?.message}</ErrorMessage>
						</FormContainer>
					);
				}}
				control={control}
			/>

			<Button
				className={cn("w-full mt-6")}
				type="submit"
				disabled={isSubmitting}
			>
				{!isSubmitting ? "Save" : "Saving..."}
			</Button>
		</form>
	);
};

export default LinkEditForm;
