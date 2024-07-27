import { useSelector } from "react-redux";
import { selectors } from "@/spas/app/redux-store";
import { useMemo } from "react";

export const useFormWorkerPicker = () => {
  const workers = useSelector(selectors.getWorkersList);
  const workersOptions = useMemo(
    () =>
      workers.map((worker) => ({
        id: worker.id,
        value: worker.fullName,
      })),
    [workers],
  );

  return { workersOptions };
};
