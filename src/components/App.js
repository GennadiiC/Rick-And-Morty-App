import { CharacterList } from './CharacterList';
import { NavBar } from './NavBar';
import { Form } from './Form';
import { useState } from 'react'

function App() { 

  const [ page, setPage ] = useState(1)

  const flipPage = (delta) => {
    setPage(prevPage => prevPage += delta)
  }

  return (
    <div className='container-fluid px-0'>
      <NavBar />
      <div className='container d-flex justify-content-between mt-5'>
        <Form 
          page={page}
        />
        <CharacterList 
          page={page}
          flipPage={flipPage} 
        />
      </div>
    </div>
  );
}

export default App;
