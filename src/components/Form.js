import { useForm } from 'react-hook-form';
import { useGetCharacterByNameQuery, useGetAllNamesQuery } from '../redux/rickMortyApi';
import { useState } from 'react';
import { Character } from './Character';


export function Form () {

  const { register, handleSubmit, reset } = useForm();
  const [ name, setName ] = useState('')

  const { data: character, isFetching, isSuccess, isError, error } = useGetCharacterByNameQuery(name);
  const { data: allNames, isSuccess: namesSuccess } = useGetAllNamesQuery()

  const onSubmit = (value) => {
    setName(value.name);
    reset();
  }

  return (
    <div className='container-fluid'>
      <h3 className='h3 text-center my-4'>Find your character</h3>
      {
        name === '' ? 
        <p className="my-3">Enter name...</p> :
        isFetching ? 
        <p className="my-3">Loading...</p> :
        isSuccess ? 
        <p className="my-3">Look what I found:</p> :
        isError ?
        <p className="my-3">Ops, {error.data.error.toLowerCase()}!</p> :
        null
      }
      <form className='input-group input-group-sm my-4' onSubmit={handleSubmit(onSubmit)}>
        <input 
          className="form-control" 
          list="datalistOptions" 
          id="exampleDataList" 
          {...register('name')} 
          aria-label="Text input with dropdown button" 
          autoComplete="off" 
        />
        <datalist className='datalist' id="datalistOptions">
          { 
            namesSuccess ? allNames.map(char => 
              <option key={char.id} value={char.name} />
            ) : null
          }
        </datalist>
        <button className="btn" type="button" onClick={handleSubmit(onSubmit)}>Start/Reset</button>
      </form>
      <div>
        { 
          name === '' ? 
          null :
          isSuccess ? 
          character.results.map(item => 
            <Character 
              id={item.id}
              key={item.id + 1}
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