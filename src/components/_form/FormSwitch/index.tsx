import React, { memo } from "react";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Switch,
  SwitchProps,
} from "@mui/material";
import { useFormSwitch } from "@/components/_form/FormSwitch/index.hooks";

type FormSwitchProps = {
  name: string;
  label: string;
  checkedLabel?: string;
} & SwitchProps;

export const FormSwitch = memo(
  ({ name, label, checkedLabel, sx, ...props }: FormSwitchProps) => {
    const { value, handleChangeBool, error } = useFormSwitch(name);

    return (
      <FormControl error={!!error} component="fieldset">
        <FormControlLabel
          sx={{ m: 0, justifyContent: "flex-end" }}
          control={
            <Switch
              sx={[
                {
                  ml: 1,
                },
                ...(Array.isArray(sx) ? sx : [sx]),
              ]}
              {...props}
              name={name}
              checked={value}
              onChange={handleChangeBool}
            />
          }
          label={value ? checkedLabel ?? label : label}
          labelPlacement="start"
        />
        {!!error && <FormHelperText error>{error}</FormHelperText>}
      </FormControl>
    );
  },
);

FormSwitch.displayName = "FormSwitch";
