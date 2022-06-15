import { useState } from "react";
import { useGetEpisodeForCharacterQuery } from "../redux/rickMortyApi";

export const Character = ({ 
  name, 
  species, 
  gender,  
  location, 
  status,
  episode,
  created, 
  image
}) => {

  const [ clicked, setClicked ] = useState(false)

  let idsArr = episode.map(ep => Number(ep.slice(-2).replace('/', '')))
  let ids = idsArr.join(',')

  const { data: episodes, isFetching, isSuccess, isError, error } = useGetEpisodeForCharacterQuery(ids)

  const episodesName = () => {
    if (Array.isArray(episodes)) {
      return episodes.map(ep => ep.name).join(', ') 
    } else {
      return episodes.name
    }
  }

  const episodesSeries = () => {
    if (Array.isArray(episodes)) {
      return episodes.map(ep => ep.episode).join(', ') 
    } else {
      return episodes.episode
    }
  }



  const classToggle = () => {
    setClicked(!clicked)
  }

  return ( 
    <div className="d-flex justify-content-between my-2 rounded shadow">
      <div className="container">
        <img className="float-start rounded img-fluid my-3 me-3" src={image} alt={name} />
        <div className="mt-3">
          <h5>Name: <span className="sm">{name}</span>, Status: <span className="sm">{status}</span></h5>  
          <button className="btn my-3" onClick={() => classToggle()}>{!clicked ? 'Show Info' : 'Hide Info'}</button>
          <div className={!clicked ? "d-none" : null}>
            <p><span className="fs-5">Species:</span> {species}</p>
            <p><span className="fs-5">Gender:</span> {gender}</p>
            <p><span className="fs-5">Location:</span> {location.name}</p>
            <p><span className="fs-5">Created:</span> {created.slice(0, -14)}</p>
            <div>
              <p className="fs-5">Episode(s):</p>
              <div>
                <p className="ser">series:</p> 
                <p>{isSuccess ? episodesSeries() : null}</p>
              </div>
              <div>
                <p className="ser">title:</p> 
                <p>{isSuccess ? episodesName() : null}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}