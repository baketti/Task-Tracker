import { actions } from "@/spas/app/redux-store";
import { put, takeEvery } from "redux-saga/effects";
import { DialogTypes } from "@/spas/app/redux-store/slices/ui/ui.interfaces";

export function* uiSaga() {
  yield takeEvery(actions.postCustomers.success, function* () {
    yield put(
      actions.setDialogOpen({
        dialogType: DialogTypes.CREATE_CUSTOMER,
        open: false,
      }),
    );
  });
  yield takeEvery(actions.postProjects.success, function* () {
    yield put(
      actions.setDialogOpen({
        dialogType: DialogTypes.CREATE_PROJECT,
        open: false,
      }),
    );
  });
  yield takeEvery(actions.postWorkers.success, function* () {
    yield put(
      actions.setDialogOpen({
        dialogType: DialogTypes.CREATE_WORKER,
        open: false,
      }),
    );
  });
  yield takeEvery(actions.postJobs.success, function* () {
    yield put(
      actions.setDialogOpen({
        dialogType: DialogTypes.CREATE_JOB,
        open: false,
      }),
    );
  });
  yield takeEvery(actions.patchCustomersByCustomerId.success, function* () {
    yield put(
      actions.setDialogOpen({
        dialogType: DialogTypes.EDIT_CUSTOMER,
        open: false,
      }),
    );
  });
  yield takeEvery(actions.patchJobsByJobId.success, function* () {
    yield put(
      actions.setDialogOpen({
        dialogType: DialogTypes.EDIT_JOB,
        open: false,
      }),
    );
  });
  yield takeEvery(actions.patchWorkersByWorkerId.success, function* () {
    yield put(
      actions.setDialogOpen({
        dialogType: DialogTypes.EDIT_WORKER,
        open: false,
      }),
    );
    yield put(
      actions.setDialogOpen({
        dialogType: DialogTypes.ASSOCIATE_JOBS,
        open: false,
      }),
    );
  });
  yield takeEvery(actions.patchProjectsByProjectId.success, function* () {
    yield put(
      actions.setDialogOpen({
        dialogType: DialogTypes.EDIT_PROJECT,
        open: false,
      }),
    );
  });
}
