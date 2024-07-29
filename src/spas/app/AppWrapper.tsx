import React, { memo, useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "@/spas/app/redux-store";
import App from "./App";

const AppWrapper = () => {
  
  useEffect(() => {
    document.title = 'Task Tracker';
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<div />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

export default memo(AppWrapper);
