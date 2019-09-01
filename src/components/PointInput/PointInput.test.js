import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent, getByTestId, rerender } from "@testing-library/react";
import PointInput from "./PointInput";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<PointInput />, div);
  ReactDOM.unmountComponentAtNode(div);
});
