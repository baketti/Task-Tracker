import * as extraActions from "../extra-actions";
import * as ajax from "./ajax";
import * as feedback from "./feedback";
import * as user from "./user";
import * as ui from "./ui";
import * as customer from "./customer";
import * as project from "./project";
import * as worker from "./worker";
import * as job from "./job";

export const reducers = {
  ajax: ajax.ajaxStore.reducer,
  feedback: feedback.feedbackStore.reducer,
  user: user.userStore.reducer,
  ui: ui.uiStore.reducer,
  customer: customer.customerStore.reducer,
  project: project.projectStore.reducer,
  worker: worker.workerStore.reducer,
  job: job.jobStore.reducer,
};

export const actions = {
  ...extraActions,
  ...ajax.ajaxStore.actions,
  ...feedback.feedbackStore.actions,
  ...user.userStore.actions,
  ...ui.uiStore.actions,
  ...customer.customerStore.actions,
  ...project.projectStore.actions,
  ...worker.workerStore.actions,
  ...job.jobStore.actions,
};

export const selectors = {
  ...ajax.selectors,
  ...feedback.selectors,
  ...user.selectors,
  ...ui.selectors,
  ...customer.selectors,
  ...project.selectors,
  ...worker.selectors,
  ...job.selectors,
};

export const sagas = [
  ...Object.values(ajax.sagas),
  ...Object.values(feedback.sagas),
  ...Object.values(user.sagas),
  ...Object.values(ui.sagas),
  ...Object.values(customer.sagas),
  ...Object.values(project.sagas),
  ...Object.values(worker.sagas),
  ...Object.values(job.sagas),
];
