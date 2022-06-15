import { CharacterList } from './CharacterList';
import { NavBar } from './NavBar';
import { Form } from './Form';

function App() { 
  return (
    <div className='container-fluid px-0'>
      <NavBar />
      <div className='container d-flex justify-content-between'>
        <Form />
        <CharacterList />
      </div>
    </div>
  );
}

export default App;
