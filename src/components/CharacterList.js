import { useState } from "react"
import { useGetAllCharactersQuery } from "../redux/rickMortyApi"
import { Character } from "./Character"

export function CharacterList () {

  const [ page, setPage ] = useState(1)

  const { data: characterList, isLoading, isFetching, isSuccess, isError, error } = useGetAllCharactersQuery(page)

  const flipPage = (delta) => {
    setPage(prevPage => prevPage += delta)
  }

  return (
    <div className='container w-50'>
      <h3 className='h3 text-center'>Complete List of Characters</h3>
      <p>Flip through the pages...</p>
      <div className="d-flex justify-content-between input-group input-group-sm">
        <button className="btn" onClick={() => flipPage(-1)}>Prev {page - 1}</button>
        Page {page}
        <button className="btn" onClick={() => flipPage(+1)}>Next {page + 1}</button>
      </div>
      {isSuccess ? console.log(characterList.info) : null}
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