import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Technologies from "../../pages/Technologies";

// Testando a página de tecnologias
describe("Testing Technologies Page", () => {
  // deve ser possível adicionar novas tecnologias
  it("should be able to add new technology", () => {
    render(<Technologies />);

    // exibe a DOM com highlight sintaxe
    screen.debug();

    const input = screen.getByTestId("input-add-tech");
    const form = screen.getByTestId("form-add-tech");

    userEvent.type(input, "React Native");
    fireEvent.submit(form);

    // se é truthy (verdadeiro), significa que o elemento existe na árvore
    expect(screen.getByTestId("React Native")).toBeTruthy();

    // A mesma coisa que o expect acima porém com má legibilidade e semântica.
    // expect(!!screen.getByTestId("React Native")).toBe(true);
  });

  // deve ser possível listar três
  it("should be able to list three techs", () => {
    // a primeira tecnologia é adicionada por padrão

    const { getByTestId } = render(<Technologies />);

    const input = getByTestId("input-add-tech");
    const form = getByTestId("form-add-tech");
    fireEvent.change(input, { target: { value: "React Native" } });
    fireEvent.submit(form);
    fireEvent.change(input, { target: { value: "Flutter" } });
    fireEvent.submit(form);

    const techList = getByTestId("ul-techs");
    expect(techList.children.length).toBe(3);
  });

  // Deve ser possível deletar uma técnologia
  it("should be able to delete one tech", () => {
    render(<Technologies />);

    const input = screen.getByTestId("input-add-tech");
    const form = screen.getByTestId("form-add-tech");

    userEvent.type(input, "React Native");
    fireEvent.submit(form);

    // toBeTruthy significa que o elemento existe na árvore
    expect(screen.getByTestId("React Native")).toBeTruthy();

    const itemButton = screen.getByTestId("React Native-btn-delete");
    userEvent.click(itemButton);

    expect(screen.queryByTestId("React Native")).toBeNull();
  });

  // Botão delete deve estar desabilidade apenas para a tecnologia React
  it("button delete should be disabled only for React technology", () => {
    render(<Technologies />);

    const button = screen.getByTestId("React-btn-delete");
    expect(button).toBeDisabled();
  });
});
