export enum DialogTypes {
  ASSOCIATE_JOBS = "ASSOCIATE_JOBS",
  CREATE_CUSTOMER = "CREATE_CUSTOMER",
  CREATE_PROJECT = "CREATE_PROJECT",
  CREATE_WORKER = "CREATE_WORKER",
  CREATE_JOB = "CREATE_JOB",
  EDIT_CUSTOMER = "EDIT_CUSTOMER",
  EDIT_WORKER = "EDIT_WORKER",
  EDIT_JOB = "EDIT_JOB",
  EDIT_PROJECT = "EDIT_PROJECT",
}

//UI State ci dirà se il dialog di crezione del cliente dovrà essere mostrato o meno
export interface UiState {
  isDialogOpen: {
    [DialogTypes.ASSOCIATE_JOBS]: boolean;
    [DialogTypes.CREATE_CUSTOMER]: boolean;
    [DialogTypes.CREATE_PROJECT]: boolean;
    [DialogTypes.CREATE_WORKER]: boolean;
    [DialogTypes.CREATE_JOB]: boolean;
    [DialogTypes.EDIT_CUSTOMER]: boolean;
    [DialogTypes.EDIT_WORKER]: boolean;
    [DialogTypes.EDIT_JOB]: boolean;
    [DialogTypes.EDIT_PROJECT]: boolean;
  };
}
