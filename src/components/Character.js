import { useState } from "react";
import { useGetEpisodeForCharacterQuery } from "../redux/rickMortyApi";

export const Character = ({ 
  name, 
  species, 
  gender,  
  location, 
  status,
  episode,
  created
}) => {

  const [ clicked, setClicked ] = useState(false)

  let idsArr = episode.map(ep => Number(ep.slice(-2).replace('/', '')))
  let ids = idsArr.join(',')

  const { data: episodes, isFetching, isSuccess, isError, error } = useGetEpisodeForCharacterQuery(ids)


  // function episodeString (value) {
  //   if (value = 'name' && Array.isArray(episodes)) {
  //     return episodes.map(ep => ep.name).join(', ') 
  //   } else {
  //     return episodes.name
  //   } 
  //   if (value == 'episode' && Array.isArray(episodes)) {
  //     return episodes.map(ep => ep.episode).join(', ')
  //   } else {
  //     return episodes.episode
  //   }
  // }

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
    <div>
      <div>
        <p>Name: {name}, <span>Status: {status}</span></p>  
      </div>
      <div className={!clicked ? "d-none" : null}>
         <p>Species: {species}</p>
         <p>Gender: {gender}</p>
         <p>Location: {location.name}</p>
         <div>Episode(s):
           <div>series: {isSuccess ? episodesSeries() : null}</div>
           <div>title: {isSuccess ? episodesName() : null}</div>
         </div>
      </div>
      <button onClick={() => classToggle()}>{!clicked ? 'Show Info' : 'Hide Info'}</button>
    </div>
  )
}