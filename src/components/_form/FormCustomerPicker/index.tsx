import React, { memo } from "react";
import { useFormCustomerPicker } from "./index.hooks";
import { FormAutocomplete } from "@/components/_form/FormAutocomplete";

type FormCustomerPickerProps = {
  name: string;
  label?: string;
};

export const FormCustomerPicker = memo(
  <T extends any>({ name, label }: FormCustomerPickerProps) => {
    const { customerOptions } = useFormCustomerPicker();

    return (
      <FormAutocomplete name={name} label={label} options={customerOptions} />
    );
  },
);
FormCustomerPicker.displayName = "FormCustomerPicker";
