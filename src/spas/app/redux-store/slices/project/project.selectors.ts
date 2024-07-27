import { ProjectFe } from "@/models/client/ProjectFe";
import { RootState } from "@/spas/app/redux-store";
import { createSelector } from "@reduxjs/toolkit";
import { getCustomersList } from "../customer/customer.selectors";

export const getProjectsList = createSelector(
  (state: RootState) => state.project.list ?? [],
  getCustomersList,
  (projects, customers) =>
    projects.map((project) => new ProjectFe(project, customers)),
);

export const getEditProjectId = (state: RootState) =>
  state?.project?.editProjectId;
