"use client";

import Input from "@/components/input/Input";

import Label from "@/components/form/Label";
import ErrorMessage from "@/components/form/ErrorMessage";
import FormContainer from "@/components/form/Container";

import Button from "@/components/button/Button";

import {FC, useState} from "react";
import DateInput from "@/components/input/Date";
import {format} from "date-fns";
import {UpdateShortLink, UpdateShortLinkType} from "@/types/ShortLinkType";
import {setErrors, useError} from "@/utils/setErrors";
import {updateLink} from "@/actions/shortLink";
import {useToseter} from "@/utils/useToaster";

import {BiSolidError} from "react-icons/bi";
import {links} from "@prisma/client";
import {useRouter} from "next/navigation";
import {cn} from "@dookdiks/utils";

const LinkEditForm: FC<{ link: links; afterSubmit?: () => void }> = ({
                                                                       link,
                                                                       afterSubmit,
                                                                     }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useError<UpdateShortLink>();

  const {setToast} = useToseter();

  const router = useRouter();

  const clientAction = async (formData: FormData) => {
    setIsSubmitting(true);

    const data = {
      title: formData.get("title") as string,
      endpoint: formData.get("endpoint") as string,
      entrypoint: formData.get("entrypoint") as string,
      expireDate: new Date(formData.get("expireDate") as string),
    } as UpdateShortLink;

    const result = UpdateShortLinkType.safeParse(data);

    if (!result.success) {
      setErrors(result.error.format(), setError);
      return setIsSubmitting(false);
    }

    const serverError = await updateLink({id: link.id, ...result.data});

    if (!serverError.success) {
      if (serverError?.type == "zod") {
        setErrors(serverError.errors, setError);
        return setIsSubmitting(false);
      }

      if (serverError.type == "server") {
        setToast(serverError.errors as string, <BiSolidError/>);
        return setIsSubmitting(false);
      }
    }

    afterSubmit && afterSubmit();

    router.push('/')

    setIsSubmitting(false);
  };

  return (
    <>
      <form action={clientAction} style={{width: "100%"}}>
        <FormContainer>
          <Label htmlFor="endpoint">Destination</Label>
          <Input
            style={{width: "100%"}}
            id="endpoint"
            name="endpoint"
            placeholder="https://example.com/"
            type="url"
            inputMode="url"
            defaultValue={link.endpoint}
          />
          <ErrorMessage>{error?.endpoint?._errors[0]}</ErrorMessage>
        </FormContainer>
        <FormContainer>
          <Label htmlFor="title">Title ( optional )</Label>
          <Input
            style={{width: "100%"}}
            id="title"
            name="title"
            placeholder="Example site"
            defaultValue={link.title}
          />
          <ErrorMessage>{error?.title?._errors[0]}</ErrorMessage>
        </FormContainer>
        <FormContainer>
          <Label htmlFor="entrypoint">Search parameter ( optional )</Label>
          <Input
            style={{width: "100%"}}
            id="entrypoint"
            name="entrypoint"
            placeholder="example"
            defaultValue={link.entrypoint}
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
            defaultValue={format(link.expireAt, "yyyy-MM-dd")}
          />
          <ErrorMessage>{error?.expireDate?._errors[0]}</ErrorMessage>
        </FormContainer>
        <div className={cn('flex gap-2')}>
          <Button
            style={{width: "100%", marginTop: "1.5rem"}}
            type={"button"}
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            style={{width: "100%", marginTop: "1.5rem"}}
            type="submit"
            disabled={isSubmitting}
          >
            {!isSubmitting ? "Edit short link" : "Editing short link..."}
          </Button>
        </div>
      </form>
    </>
  );
};

export default LinkEditForm;
