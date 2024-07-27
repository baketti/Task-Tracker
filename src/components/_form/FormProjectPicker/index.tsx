import React, { memo } from "react";
import { useFormProjectPicker } from "./index.hooks";
import { FormAutocomplete } from "@/components/_form/FormAutocomplete";

type FormProjectPickerProps = {
  name: string;
  label: string;
};

export const FormProjectPicker = memo(
  ({ name, label }: FormProjectPickerProps) => {
    const { projectsOptions } = useFormProjectPicker();

    return (
      <FormAutocomplete name={name} label={label} options={projectsOptions} />
    );
  },
);
FormProjectPicker.displayName = "FormProjectPicker";
