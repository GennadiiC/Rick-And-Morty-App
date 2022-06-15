import { useState } from "react"
import { useGetAllCharactersQuery } from "../redux/rickMortyApi"
import { Character } from "./Character"

export function CharacterList () {

  const [ page, setPage ] = useState('1')

  const { data: characterList, isLoading, isFetching, isSuccess, isError, error } = useGetAllCharactersQuery(page)

  return (
    <div className='container w-50'>
      {/* {isSuccess ? console.log(characterList.results) : null} */}
      { 
        isFetching ? 
        <p>Loading...</p> :
        isSuccess ?
        characterList.results.map(char => 
          <Character 
            key={char.id}
            name={char.name}
            species={char.species}
            gender={char.gender}
            location={char.location}
            status={char.status}
            episode={char.episode}
            created={char.created}
            image={char.image}
          />
        ) :
        isError ? 
        <p>Check your network...</p> :
        null
      }
    </div>
  )
}