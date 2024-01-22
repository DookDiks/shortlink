import { MakeZodError } from './../types/utils';
import { Dispatch, SetStateAction, useState } from 'react';
import { z } from "zod";

type SetErrors = <T>(
  data: z.ZodFormattedError<T, string>,
  setState: Dispatch<SetStateAction<MakeZodError<T> | undefined>>
) => void;

export const setErrors: SetErrors = (data, setState) => {
  return setState(data);
};

export const useError = <T>() => {
  return useState<MakeZodError<T>>();
}
