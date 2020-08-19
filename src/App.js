import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      const repositories = response.data;

      setRepositories(repositories);
    })
  }, [])

  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories',{
    	title: "Desafio Conceito ReactJS",
	    url: "https://github.com/nivaldoandrade/desafio-conceitos-nodejs",
	    techs: ["Node.js", "React.js", "React Native"]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const newRepositories = repositories.filter(repository => {
      if(repository.id != id)
        return repository 
      });
      
    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
