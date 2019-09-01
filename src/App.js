import React from "react";

import { Store } from "./store/provider";
import RouteBuilder from "./components/RouteBuilder";

const App = () => {
  return (
    <Store>
      <RouteBuilder />
    </Store>
  );
};

export default App;
