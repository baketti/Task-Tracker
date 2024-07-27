import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as selectors from "./ui.selectors";
import { DialogTypes, UiState } from "./ui.interfaces";
import * as sagas from "./ui.sagas";

const initialState: UiState = {
  isDialogOpen: {
    [DialogTypes.ASSOCIATE_JOBS]: false,
    [DialogTypes.CREATE_CUSTOMER]: false,
    [DialogTypes.CREATE_PROJECT]: false,
    [DialogTypes.CREATE_WORKER]: false,
    [DialogTypes.CREATE_JOB]: false,
    [DialogTypes.EDIT_CUSTOMER]: false,
    [DialogTypes.EDIT_WORKER]: false,
    [DialogTypes.EDIT_JOB]: false,
    [DialogTypes.EDIT_PROJECT]: false,
  },
};

export const uiStore = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setDialogOpen: (
      state,
      action: PayloadAction<{
        dialogType: DialogTypes;
        open: boolean;
      }>,
    ) => {
      state.isDialogOpen = {
        ...(state.isDialogOpen ?? initialState.isDialogOpen),
        [action.payload.dialogType]: action.payload.open,
      };
    },
  },
});

export { selectors, sagas };
