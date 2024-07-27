import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as selectors from "./worker.selectors";
import { WorkerState } from "./worker.interfaces";
import * as extraActions from "../../extra-actions";
import * as sagas from "./worker.sagas";
import { ObjectIdFe } from "@/models/common/JsUtility";

const initialState: WorkerState = {
  list: [],
  editWorkerId: null,
  current: null,
};

export const workerStore = createSlice({
  name: "worker",
  initialState,
  reducers: {
    setEditWorkerId: (state, action: PayloadAction<ObjectIdFe>) => {
      state.editWorkerId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(extraActions.getWorkers.success, (state, action) => {
      state.list = action.payload.data.workers;
      console.log(action.payload.data.workers);
      console.log(action.payload);
    });
    builder.addCase(extraActions.postWorkers.success, (state, action) => {
      state.list = [...(state.list || []), action.payload.data.worker];
    });
    builder.addCase(
      extraActions.deleteWorkersByWorkerId.success,
      (state, action) => {
        state.list = (state.list ?? []).filter(
          (worker) => worker._id !== action.payload.prepareParams.workerId,
        );
      },
    );
    builder.addCase(
      extraActions.getWorkersByWorkerId.request,
      (state, action) => {
        state.current = null;
      },
    );
    builder.addCase(
      extraActions.getWorkersByWorkerId.success,
      (state, action) => {
        state.current = action.payload.data.worker;
      },
    );
    builder.addCase(
      extraActions.patchWorkersByWorkerId.success,
      (state, action) => {
        state.current = action.payload.data.worker;
      },
    );
  },
});

export { selectors, sagas };
