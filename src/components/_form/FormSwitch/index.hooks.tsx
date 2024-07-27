import { useFormContext } from "react-hook-form";
import useFormField from "@/hooks/useFormField";
import { useCallback } from "react";

export const useFormSwitch = (name: string) => {
  const { value, setValue, error } = useFormField<boolean>({ name });

  const handleChangeBool = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setValue(ev.target.checked);
    },
    [setValue],
  );

  return {
    value,
    handleChangeBool,
    error,
  };
};
