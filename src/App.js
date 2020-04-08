import React, {useEffect,useState} from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      title:"Desafio React JS",
      url:"www.rocketseat.com.br",
      techs:['node','react js', 'react native'],
    })
    console.log(response.data);
    
    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    try{
      await api.delete(`/repositories/${id}`);
      setRepositories(repositories.filter(repository => repository.id !== id));
    } catch{
      alert(" Dont have this repository")
    }
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repository => {
        return <li key={repository.id}>
        {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>;
        })}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
