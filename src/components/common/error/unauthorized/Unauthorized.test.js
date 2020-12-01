import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import Unauthorized from "./Unauthorized";

describe("Unauthorized", () => {
  it("runs snapshot test", () => {
    const renderer = new ShallowRenderer();
    const result = renderer.render(<Unauthorized/>);
    expect(result).toMatchSnapshot();
  });
});

