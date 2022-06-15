import { useForm } from 'react-hook-form';
import { useGetCharacterByNameQuery } from '../redux/rickMortyApi';
import { useState } from 'react';
import { Character } from './Character';

export function Form () {

  const { register, handleSubmit, reset } = useForm();
  const [ name, setName ] = useState('')

  const { data: character, isFetching, isSuccess, isError, error } = useGetCharacterByNameQuery(name);

  const onSubmit = (value) => {
    setName(value.name);
    reset();
  }


  return (
    <div className='container w-50'>
      <h3 className='h3 text-center'>Find your character</h3>
      {
        name === '' ? 
        <p>Enter name...</p> :
        isFetching ? 
        <p>Loading...</p> :
        isSuccess ? 
        <p>Look what I found:</p> :
        isError ?
        <p>Ops, {error.data.error.toLowerCase()}!</p> :
        null
      }
      <form className='input-group input-group-sm'>
        <input className="form-control" {...register('name')} aria-label="Text input with dropdown button" />
        <button className="btn" type="button" onClick={handleSubmit(onSubmit)}>Start/Reset</button>
      </form>
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