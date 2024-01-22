"use client";

import Input from "@/components/input/Input";

import Label from "@/components/form/Label";
import ErrorMessage from "@/components/form/ErrorMessage";
import FormContainer from "@/components/form/Container";

import Button from "@/components/button/Button";

import { FC, useRef, useState } from "react";
import DateInput from "@/components/input/Date";
import { format, addMonths } from "date-fns";
import { ShortLinkType, ShortLink } from "@/types/ShortLinkType";
import { setErrors, useError } from "@/utils/setErrors";
import { createLink } from "@/actions/shortLink";
import { useToseter } from "@/utils/useToaster";

import { BiSolidError } from "react-icons/bi";

const AddShortLinkForm: FC<{ afrerSubmit?: () => void }> = ({
	afrerSubmit,
}) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useError<ShortLink>();

	const { setToast, Toaster } = useToseter();

	const formRef = useRef<HTMLFormElement>(null);

	const clientAction = async (formData: FormData) => {
		setIsSubmitting(true);

		const data = {
			title: formData.get("title") as string,
			endpoint: formData.get("endpoint") as string,
			entrypoint: formData.get("entrypoint") as string,
			expireDate: new Date(formData.get("expireDate") as string),
		} as ShortLink;

		const result = ShortLinkType.safeParse(data);

		if (!result.success) {
			setErrors(result.error.format(), setError);
			return setIsSubmitting(false);
		}

		const serverError = await createLink(result.data);

		if (!serverError.success) {
			if (serverError?.type == "zod") {
				setErrors(serverError.errors, setError);
				return setIsSubmitting(false);
			}

			if (serverError.type == "server") {
				setToast(serverError.errors as string, <BiSolidError />);
				return setIsSubmitting(false);
			}
		}

		afrerSubmit && afrerSubmit();

		formRef.current?.reset();

		setIsSubmitting(false);
	};

	return (
		<>
			<Toaster />
			<form action={clientAction} style={{ width: "100%" }} ref={formRef}>
				<FormContainer>
					<Label htmlFor="endpoint">Destination</Label>
					<Input
						style={{ width: "100%" }}
						id="endpoint"
						name="endpoint"
						placeholder="https://example.com/"
						type="url"
						inputMode="url"
					/>
					<ErrorMessage>{error?.endpoint?._errors[0]}</ErrorMessage>
				</FormContainer>
				<FormContainer>
					<Label htmlFor="title">Title ( optional )</Label>
					<Input
						style={{ width: "100%" }}
						id="title"
						name="title"
						placeholder="Example site"
					/>
					<ErrorMessage>{error?.title?._errors[0]}</ErrorMessage>
				</FormContainer>
				<FormContainer>
					<Label htmlFor="entrypoint">Search parameter ( optional )</Label>
					<Input
						style={{ width: "100%" }}
						id="entrypoint"
						name="entrypoint"
						placeholder="example"
					/>
					<ErrorMessage>{error?.entrypoint?._errors[0]}</ErrorMessage>
				</FormContainer>

				<FormContainer>
					<Label htmlFor="expireDate">Expire date</Label>
					<DateInput
						required
						id="expireDate"
						name="expireDate"
						min={format(new Date(), "yyyy-MM-dd")}
						defaultValue={format(addMonths(new Date(), 1), "yyyy-MM-dd")}
					/>
					<ErrorMessage>{error?.expireDate?._errors[0]}</ErrorMessage>
				</FormContainer>
				<Button
					style={{ width: "100%", marginTop: "1.5rem" }}
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
