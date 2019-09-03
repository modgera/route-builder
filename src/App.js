import React from "react";

import { Store } from "./store/provider";
import RouteBuilder from "./components/RouteBuilder";

import YMaps from "./components/Draft/YMaps";

const App = () => {
  // return (
  //   <Store>
  //     <RouteBuilder />
  //   </Store>
  // );
  return <YMaps />;
};

export default App;
