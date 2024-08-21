import React, { memo } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "@/spas/app/redux-store";
import App from "./App";
import { Helmet } from "react-helmet";

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<div />} persistor={persistor}>
        <Helmet>
          <title>Task Tracker</title>
        </Helmet>
        <App />
      </PersistGate>
    </Provider>
  );
};

export default memo(AppWrapper);
