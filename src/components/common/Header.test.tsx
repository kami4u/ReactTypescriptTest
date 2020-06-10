import React from "react";
import { shallow, mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";

import Header from "./Header";

it("contains 3 navLinks via shallow", () => {
  const numLinks = shallow(<Header />).find("NavLink").length;
  expect(numLinks).toEqual(3);
});

it("contains 3 anchors via mount", () => {
  const numAnchors = mount(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  ).find("a").length;

  expect(numAnchors).toEqual(3);
});
