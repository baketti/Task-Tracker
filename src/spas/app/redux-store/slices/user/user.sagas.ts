import { actions } from "@/spas/app/redux-store";
import { put, takeEvery } from "redux-saga/effects";
import domNavigation from "@/models/client/DomNavigation";

export function* userSaga() {
  yield takeEvery(actions.postSessions.success, function* () {
    yield put(actions.getUsersMe.request({}));
    yield put(actions.getCustomers.request({}));
    domNavigation.navigate(`/${domNavigation.locale}/app`);
  });
  yield takeEvery(actions.deleteSessions.success, function* () {
    domNavigation.navigate(`/${domNavigation.locale}/app/authentication/login`);
  });
  yield takeEvery(actions.postUsers.success, function* () {
    domNavigation.navigate(`/${domNavigation.locale}/app/authentication/login`);
  });
}
