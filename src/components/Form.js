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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('name')} />
      </form>
      <div>
        {
          name === '' ? 
          <p>Enter name</p> :
          isFetching ? 
          <p>Loading...</p> :
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
            />
            
          ) :
          isError ?
          <p>Ops, {error.data.error.toLowerCase()}</p> :
          null
        }
      </div>
    </div>
  );
}