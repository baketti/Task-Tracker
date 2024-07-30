import { WorkerFe } from "@/models/client/WorkerFe";
import { RootState } from "@/spas/app/redux-store";
import { createSelector } from "@reduxjs/toolkit";
import { getJobsList } from "../job/job.selectors";

export const getWorkersList = createSelector(
  (state: RootState) => state?.worker?.list,
  (workers) => workers.map((worker) => new WorkerFe(worker)),
);

export const getEditWorkerId = (state: RootState) => state.worker.editWorkerId;

export const getCurrentWorker = createSelector(
  (state: RootState) => state?.worker?.current ?? null,
  getJobsList,
  (worker,jobsList) => {
    const currentWorker = worker ? new WorkerFe(worker) : null;
    if(currentWorker){
      let jobs = currentWorker.enabledJobIds.filter((jobId) => {
        return (jobsList.find((job) => job?._id === jobId) || null) !== null
      })
      currentWorker.enabledJobIds = jobs;
    }
    return currentWorker ?? null;
  },
);

