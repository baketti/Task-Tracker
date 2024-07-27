import { WorkerFe } from "@/models/client/WorkerFe";
import { RootState } from "@/spas/app/redux-store";
import { createSelector } from "@reduxjs/toolkit";

export const getWorkersList = createSelector(
  (state: RootState) => state?.worker?.list,
  (workers) => workers.map((worker) => new WorkerFe(worker)),
);

export const getEditWorkerId = (state: RootState) => state.worker.editWorkerId;

export const getCurrentWorker = createSelector(
  (state: RootState) => state?.worker?.current ?? null,
  (worker) => (worker ? new WorkerFe(worker) : null),
);
