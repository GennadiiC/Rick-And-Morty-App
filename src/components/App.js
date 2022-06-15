import { CharacterList } from './CharacterList';
import { Form } from './Form';

function App() { 
  return (
    <div className='container d-flex justify-content-between'>
      <Form />
      <CharacterList />
    </div>
  );
}

export default App;
