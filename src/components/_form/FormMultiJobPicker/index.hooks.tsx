import { useCallback, useMemo } from "react";
import useFormField from "@/hooks/useFormField";
import { JobFe } from "@/models/client/JobFe";

export type FormMultiAutocompleteOption = {
  id: string;
  value: string;
};

export const useFormMultiJobPicker = (
  name: string,
  jobs: JobFe[],
  excludeSelected: boolean,
) => {
  const { value, setValue, error } = useFormField<string[]>({ name });
  const chipsIds = useMemo(() => value ?? [], [value]);

  const handleItemDeleted = useMemo(
    () =>
      chipsIds?.map((_item, index) => () => {
        const array = [...chipsIds];
        array.splice(index, 1);
        setValue(array);
      }),
    [chipsIds, setValue],
  );

  const handleItemAdded = useCallback(
    (ev, chip: FormMultiAutocompleteOption) => {
      if (chip) {
        if (!chipsIds.includes(chip.id)) {
          setValue([...chipsIds, chip.id]);
        }
      }
    },
    [chipsIds, setValue],
  );

  const jobsOptions = useMemo(
    () =>
      jobs.map((job) => ({
        id: job._id,
        value: !!job.project?.name
          ? `${job.project?.name} - ${job.name}`
          : job.name,
      })),
    [jobs],
  );

  const selectableJobsOptions = useMemo(
    () =>
      jobsOptions
        .filter((option) =>
          excludeSelected
            ? !value?.some((selected) => selected === option.id)
            : true,
        )
        .sort((a, b) => a.value.localeCompare(b.value)),
    [jobsOptions, excludeSelected, value],
  );

  return {
    chipsIds,
    handleItemAdded,
    handleItemDeleted,
    error,
    jobsOptions,
    selectableJobsOptions,
  };
};
