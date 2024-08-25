import { render, screen } from "@testing-library/react";
import DefaultContainer from "./";

test("default container", () => {
  const text = "text";
  render(
    <DefaultContainer>
      <h1>{text}</h1>
    </DefaultContainer>,
  );
  expect(screen.getByRole("heading")).toHaveTextContent(text);
});
