import { useState } from "react"
import { useGetAllCharactersByPageQuery } from "../redux/rickMortyApi"
import { Character } from "./Character"
import { useSelector, useDispatch } from "react-redux"
import { flipPage } from "../redux/rickMortySlice"

export function CharacterList () {

  const page = useSelector((state) => state.rickMorty.page)
  const dispatch = useDispatch()

  const { data: characterList, isLoading, isSuccess, isError, error } = useGetAllCharactersByPageQuery(page)

  return (
    <div className='container w-50'>
      <h3 className='h3 text-center my-4'>Browse List of Characters</h3>
      <p className="my-3">Flip through the pages... each page displays 20 characters</p>
      <div className="d-flex justify-content-between input-group input-group-sm my-4">
        <button className={page === 1 ? "btn disabled" : "btn"} onClick={() => dispatch(flipPage(-1))}>Prev: {page === 1 ? '' : page - 1}</button>
        <span className="sm my-auto mx-auto">Page {page}</span>
        <button className={page === 42 ? "btn disabled" : "btn"} onClick={() => dispatch(flipPage(+1))}>Next: {page === 42 ? '' : page + 1}</button>
      </div>
      { 
        isLoading ? 
        <p>Loading...</p> :
        isSuccess ?
        characterList.results.map(char => 
          <Character 
            key={char.id + 1}
            id={char.id}
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
        <p>Oops, {error.data.error.toLowerCase()}</p> :
        null
      }
    </div>
  )
}