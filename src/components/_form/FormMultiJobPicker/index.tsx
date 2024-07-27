import React, { memo } from "react";
import {
  Autocomplete,
  Box,
  Chip,
  FormHelperText,
  MenuItem,
  Stack,
  StackProps,
  TextField,
} from "@mui/material";

import {
  FormMultiAutocompleteOption,
  useFormMultiJobPicker,
} from "./index.hooks";
import { JobFe } from "@/models/client/JobFe";

type FormMultiJobPickerProps = {
  jobs: JobFe[];
  name?: string;
  label?: string;
  excludeSelected?: boolean;
} & StackProps;

export const FormMultiJobPicker = memo(
  ({
    jobs,
    name,
    label,
    excludeSelected = false,
    ...props
  }: FormMultiJobPickerProps) => {
    const {
      chipsIds,
      handleItemAdded,
      handleItemDeleted,
      error,
      jobsOptions,
      selectableJobsOptions,
    } = useFormMultiJobPicker(name, jobs, excludeSelected);

    return (
      <Stack {...props} flex={1}>
        <Autocomplete<FormMultiAutocompleteOption>
          fullWidth
          onChange={handleItemAdded}
          options={selectableJobsOptions}
          getOptionLabel={(option) => option.value}
          renderOption={(params, option) => (
            <MenuItem {...params}>{option.value}</MenuItem>
          )}
          renderInput={(params) => (
            <TextField {...params} label={label} sx={{ width: "100%" }} />
          )}
        />
        <Stack direction={"row"} flexWrap={"wrap"}>
          {chipsIds.map((chipId, index) => {
            const chip = jobsOptions.find((chip) => chip.id === chipId);
            return (
              <Box key={chip.value}>
                <Chip
                  label={chip.value}
                  onDelete={handleItemDeleted[index]}
                  sx={{
                    mr: 1,
                    mt: 1,
                  }}
                />
              </Box>
            );
          })}
        </Stack>
        {!!error ? <FormHelperText error>{error}</FormHelperText> : null}
      </Stack>
    );
  },
);
FormMultiJobPicker.displayName = "FormMultiJobPicker";
