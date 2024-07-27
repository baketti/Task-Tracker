import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as selectors from "./project.selectors";
import { ProjectState } from "./project.interfaces";
import * as extraActions from "../../extra-actions";
import * as sagas from "./project.sagas";
import { ObjectIdFe } from "@/models/common/JsUtility";

const initialState: ProjectState = {
  list: [],
  editProjectId: null,
};

export const projectStore = createSlice({
  name: "project",
  initialState,
  reducers: {
    setEditProjectId: (state, action: PayloadAction<ObjectIdFe>) => {
      state.editProjectId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(extraActions.postProjects.success, (state, action) => {
      state.list = state.list ?? [];
      state.list.push(action.payload.data.project);
    });
    builder.addCase(extraActions.getProjects.success, (state, action) => {
      state.list = action.payload.data.projects;
    });

    builder.addCase(
      extraActions.patchProjectsByProjectId.success,
      (state, action) => {
        state.list = (state.list ?? []).map((project) =>
          project._id === action.payload.data.project._id
            ? action.payload.data.project
            : project,
        );
      },
    );
    builder.addCase(
      extraActions.deleteProjectsByProjectId.success,
      (state, action) => {
        state.list = (state.list ?? []).filter(
          (project) => project._id !== action.payload.prepareParams.projectId,
        );
      },
    );
  },
});
export { selectors, sagas };
