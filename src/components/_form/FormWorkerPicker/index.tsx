import React, { memo } from "react";
import { useFormWorkerPicker } from "./index.hooks";
import { FormAutocomplete } from "@/components/_form/FormAutocomplete";

type workerOption = {
  id: string;
  value: string;
};

type FormWorkerPickerProps = {
  name: string;
  label?: string;
};

export const FormWorkerPicker = memo(
  ({ name, label }: FormWorkerPickerProps) => {
    const { workersOptions } = useFormWorkerPicker();

    return (
      <FormAutocomplete name={name} label={label} options={workersOptions} />
    );
  },
);
FormWorkerPicker.displayName = "FormWorkerPicker";
