import { useSelector } from "react-redux";
import { selectors } from "@/spas/app/redux-store";
import { useMemo } from "react";

export const useFormProjectPicker = () => {
  const projects = useSelector(selectors.getProjectsList);
  const projectsOptions = useMemo(
    () =>
      projects.map((p) => ({
        id: p._id,
        value: p.name,
      })),
    [projects],
  );
  return { projectsOptions };
};
