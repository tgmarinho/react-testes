import React, { useState, FormEvent } from "react";

const Technologies: React.FC = () => {
  const [technologies, setTechnologies] = useState<string[]>(["React"]);
  const [newTech, setNewTech] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!newTech || technologies.includes(newTech)) return;

    setTechnologies([...technologies, newTech]);
    setNewTech("");
  }

  function handleDelete(tech: string) {
    setTechnologies(technologies.filter((techItem) => techItem !== tech));
  }

  return (
    <>
      <ul data-testid="ul-techs">
        {technologies.map((tech) => (
          <li data-testid={tech} key={tech}>
            {tech}
            {"  "}
            <button
              disabled={tech === "React"}
              data-testid={`${tech}-btn-delete`}
              type="button"
              onClick={() => handleDelete(tech)}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>

      <form data-testid="form-add-tech" onSubmit={handleSubmit}>
        <input
          data-testid="input-add-tech"
          type="text"
          value={newTech}
          onChange={(e) => setNewTech(e.target.value)}
        />
        <button type="submit">Salvar</button>
      </form>
    </>
  );
};

export default Technologies;
