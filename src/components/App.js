import { CharacterList } from './CharacterList';
import { NavBar } from './NavBar';
import { Form } from './Form';
import { Likes } from './Likes';
import { Routes, Route } from 'react-router-dom';

function App() { 

  return (
    <div className='container-fluid px-0'>
      <NavBar />
      <Routes>
        <Route path='/' element=
        {
          <div className='container d-flex justify-content-between mt-5'>
            <Form />
            <CharacterList />
          </div>
        }
        />
        <Route path='likes' element={<Likes />} />
      </Routes>
    </div>
  );
}

export default App;
