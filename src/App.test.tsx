import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const headerName = screen.getByText(/Notes/i);
  expect(headerName).toBeInTheDocument();
});
