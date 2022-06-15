import { useForm } from 'react-hook-form';
import { useGetCharacterByNameQuery } from '../redux/rickMortyApi';
import { useState } from 'react';
import { Character } from './Character';

export function Form () {

  const { register, handleSubmit, reset } = useForm();
  const [ name, setName ] = useState('')

  const { data: character, isFetching, isSuccess, isError, error } = useGetCharacterByNameQuery(name);



  const onSubmit = (value) => {
    setName(value.name)
    reset();
  }


  return (
    <div className='container w-50'>
      {/* <div>
        {
          name === '' ? 
          <p>Enter name</p> :
          isFetching ? 
          <p>Loading...</p> :
          isSuccess ? 
          <p>Look what I found:</p> :
          isError ?
          <p>Ops, {error.data.error.toLowerCase()}!</p> :
          null
        }
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('name')} />
        </form>
      </div> */}
      {
        name === '' ? 
        <p>Enter name</p> :
        isFetching ? 
        <p>Loading...</p> :
        isSuccess ? 
        <p>Look what I found:</p> :
        isError ?
        <p>Ops, {error.data.error.toLowerCase()}!</p> :
        null
      }
      <div className='input-group'>
        <input className="form-control" {...register('name')} aria-label="Text input with dropdown button" />
        <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Options</button>
        <ul className="dropdown-menu dropdown-menu-end">
          <li><a className="dropdown-item" href="#">Start</a></li>
          <li><a className="dropdown-item" href="#">Reset</a></li>
        </ul>
      </div>
      <div>
        { 
          name === '' ? 
          null :
          isSuccess ? 
          character.results.map(item => 
            <Character 
              key={item.id}
              name={item.name}
              status={item.status}
              species={item.species}
              gender={item.gender}
              location={item.location}
              episode={item.episode}
              created={item.created}
              image={item.image}
            />
            
          ) :
          null
        }
      </div>
    </div>
  );
}