import { useState } from "react";
import { likedChar, filterChar } from "../redux/rickMortySlice";
import { useGetEpisodeForCharacterQuery } from "../redux/rickMortyApi";
import { useDispatch, useSelector } from "react-redux";

export const Character = ({ 
  id,
  name, 
  species, 
  gender,  
  location, 
  status,
  episode,
  created, 
  image
}) => {

  const dispatch = useDispatch()
  const { users } = useSelector((state) => state.rickMorty)

  const [ clicked, setClicked ] = useState(false)
  const [ liked, setLiked ] = useState(false)
  const [ userLogged, setUserLogged ] = useState(false)

  let idsArr = episode.map(ep => Number(ep.slice(-2).replace('/', '')))
  let ids = idsArr.join(',')

  const { data: episodes, isSuccess } = useGetEpisodeForCharacterQuery(ids)

  const episodesName = () => {
    if (Array.isArray(episodes)) {
      return episodes.map(ep => ep.name).join(', ') 
    } else {
      return episodes.name
    }
  }

  let title = isSuccess ? episodesName() : null

  const episodesSeries = () => {
    if (Array.isArray(episodes)) {
      return episodes.map(ep => ep.episode).join(', ') 
    } else {
      return episodes.episode
    }
  }

  let series = isSuccess ? episodesSeries() : null

  const user = users.find(usr => usr.isLogged === true)

  const likeToggle = () => {
    setLiked(!liked)
    dispatch(likedChar({ 
      key: id + 1,
      id,
      name,
      species, 
      gender,
      location, 
      status,
      episode,
      created, 
      image, 
      episodes,
      user,
      title, 
      series
    }))
    console.log(id)
  }

  return ( 
    <div className="d-flex justify-content-between my-2 rounded shadow">
      <div className="container">
        <img className="float-start rounded img-fluid my-3 me-3" src={image} alt={name} />
        <div className="mt-3">
          <h5>Name: <span className="sm">{name}</span>, Status: <span className="sm">{status}</span></h5> 
          <div className="d-flex flex-column align-items-center">
            <button className="btn my-3 w-75" onClick={() => setClicked(!clicked)}>{!clicked ? 'Show Info' : 'Hide Info'}</button>
            <button className= { !user || liked ? 'd-none' : 'btn my-3 w-50' } onClick={() => likeToggle()}>❤️ Like</button>
          </div> 
          <div className={!clicked ? "d-none" : null}>
            <p><span className="fs-5">Species:</span> {species}</p>
            <p><span className="fs-5">Gender:</span> {gender}</p>
            <p><span className="fs-5">Location:</span> {location.name}</p>
            <p><span className="fs-5">Created:</span> {created.slice(0, -14)}</p>
            <div>
              <p className="fs-5">Episode(s):</p>
              <div>
                <p className="ser">series:</p> 
                <p>{series}</p>
              </div>
              <div>
                <p className="ser">title:</p> 
                <p>{title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}