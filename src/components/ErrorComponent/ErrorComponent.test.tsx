import { render, screen } from "@testing-library/react";
import ErrorComponent from ".";

test("Error Component", () => {
  const text = "text";
  render(<ErrorComponent message={text} />);
  screen.getByText(text);
});
