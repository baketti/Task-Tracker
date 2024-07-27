import React, { memo } from "react";
import AppSpa from "@/spas/app";

type AppProps = {};

const App = memo(({}: AppProps) => {
  return <AppSpa />;
});
App.displayName = "App";

export default App;
