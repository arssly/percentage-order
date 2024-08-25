import { render, screen, fireEvent } from "@testing-library/react";
import { SwipeableTab } from ".";

test("SwipeableTabs", async () => {
  const firstTabContent = "firstTabContent";
  const secondTabContent = "secondTabContent";
  const tab1 = { title: "firstTab", element: <div>{firstTabContent}</div> };
  const tab2 = { title: "secondTab", element: <div>{secondTabContent}</div> };
  render(<SwipeableTab tabs={[tab1, tab2]} />);

  // expect both titles to be in the Doc
  expect(screen.queryByText(tab1.title)).toBeInTheDocument();
  expect(screen.queryByText(tab2.title)).toBeInTheDocument();

  // expect only the first tab to be in the Doc
  expect(screen.queryByText(firstTabContent)).toBeInTheDocument();
  expect(screen.queryByText(secondTabContent)).not.toBeInTheDocument();

  fireEvent.click(screen.getByText(tab2.title));
  // now expect only the second tab to be in the Doc
  expect(screen.queryByText(secondTabContent)).toBeInTheDocument();
  expect(screen.queryByText(firstTabContent)).not.toBeInTheDocument();
});
