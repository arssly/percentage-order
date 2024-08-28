import { render, screen } from "@testing-library/react";
import FullLoading from ".";

test("Loading Component", () => {
  render(<FullLoading />);
  screen.getByText("Loading");
});
