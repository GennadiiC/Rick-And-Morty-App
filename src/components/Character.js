import { useState } from "react";
import { likedChar } from "../redux/rickMortySlice";
import { useGetEpisodeForCharacterQuery } from "../redux/rickMortyApi";
import { useDispatch, useSelector } from "react-redux";
import { Facebook } from "./Facebook";

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

  const dispatch = useDispatch()
  const { users } = useSelector((state) => state.rickMorty)

  const [ clicked, setClicked ] = useState(false)
  const [ liked, setLiked ] = useState(false)

  // const [ likedCharacter, setLikedCharacter ] = useState({
  //   name: '',
  //   url: ''
  // })

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

  const user = users.find(usr => usr.isLogged === true)

  const likeToggle = () => {
    setLiked(!liked)
    
    dispatch(likedChar({ name, image, id: user.userID }))
  }



  const classToggle = () => {
    setClicked(!clicked)
  }

  return ( 
    <div className="d-flex justify-content-between my-2 rounded shadow">
      <div className="container">
        <img className="float-start rounded img-fluid my-3 me-3" src={image} alt={name} />
        <div className="mt-3">
          {console.log(users)}
          <h5>Name: <span className="sm">{name}</span>, Status: <span className="sm">{status}</span></h5>  
          <button className="btn my-3" onClick={() => classToggle()}>{!clicked ? 'Show Info' : 'Hide Info'}</button>
          <button className="btn" onClick={() => likeToggle()}>❤️ Like</button>
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