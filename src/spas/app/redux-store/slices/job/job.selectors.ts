import { RootState } from "@/spas/app/redux-store";
import { createSelector } from "@reduxjs/toolkit";
import { JobFe } from "@/models/client/JobFe";
import { getProjectsList } from "../project/project.selectors";

export const getJobsList = createSelector(
  (state: RootState) => state?.job?.list ?? [],
  getProjectsList,
  (jobsList, projectsList) =>
    jobsList.map((job) => new JobFe(job, projectsList)),
);

export const getEditJobId = (state: RootState) => state?.job?.editJobId;
