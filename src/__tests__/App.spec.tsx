import { render, screen } from "@testing-library/react";

import React from "react";
import App from "../App";

describe("Testing App.jsx", () => {
  // Deve ser possível exibir o elemento h1 na página
  it("should be able to show the h1 element", () => {
    render(<App />);
    const h1Element = screen.getByText(/bem vindo ao teste/i);

    expect(h1Element).toBeInTheDocument();
  });
});
