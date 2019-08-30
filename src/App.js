import React from "react";

import { PointProvider } from "./contexts/Points/PointProvider";
import RouteBuilder from "./components/RouteBuilder";

const App = () => {
  return (
    <PointProvider>
      <RouteBuilder />
    </PointProvider>
  );
};

export default App;
