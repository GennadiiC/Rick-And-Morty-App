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
    <div className="char">
      <div className="container">
        <img className="rounded float-start img-fluid" src={image} alt={name} />
        <div>
          <h5>Name: <span className="sm">{name}</span>, Status: <span className="sm">{status}</span></h5>  
          <button className="btn" onClick={() => classToggle()}>{!clicked ? 'Show Info' : 'Hide Info'}</button>
          <div className={!clicked ? "d-none" : null}>
            <p><span className="fs-5">Species:</span> {species}</p>
            <p><span className="fs-5">Gender:</span> {gender}</p>
            <p><span className="fs-5">Location:</span> {location.name}</p>
            <div><span className="fs-5">Episode(s):</span>
              <div>
                <span>series:</span> 
                <p>{isSuccess ? episodesSeries() : null}</p>
              </div>
              <div>
                <span>title:</span> 
                <p>{isSuccess ? episodesName() : null}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}