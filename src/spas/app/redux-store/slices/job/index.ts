import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as selectors from "./job.selectors";
import { JobState } from "./job.interfaces";
import * as extraActions from "../../extra-actions";
import * as sagas from "./job.sagas";
import { ObjectIdFe } from "@/models/common/JsUtility";

const initialState: JobState = {
  list: [],
  editJobId: null,
};

export const jobStore = createSlice({
  name: "job",
  initialState,
  reducers: {
    setEditJobId: (state, action: PayloadAction<ObjectIdFe>) => {
      state.editJobId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(extraActions.postJobs.success, (state, action) => {
      state.list = state.list ?? [];
      state.list.push(action.payload.data.job);
    });
    builder.addCase(extraActions.getJobs.success, (state, action) => {
      state.list = action.payload.data.jobs;
    });
    builder.addCase(extraActions.patchJobsByJobId.success, (state, action) => {
      state.list = (state.list ?? []).map((job) =>
        job._id === action.payload.data.job._id ? action.payload.data.job : job,
      );
    });
    builder.addCase(extraActions.deleteJobsByJobId.success, (state, action) => {
      state.list = state.list.filter((job) => 
        job._id !== action.payload.prepareParams.jobId) ?? [];
    });
  },
});

export { selectors, sagas };
