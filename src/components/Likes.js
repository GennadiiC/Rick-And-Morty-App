import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { disLikedChar } from "../redux/rickMortySlice";

export const Likes = () => {

  const dispatch = useDispatch()

  const { users } = useSelector((state) => state.rickMorty)

  const user = users.find(usr => usr.isLogged === true)

  const [ clicked, setClicked ] = useState(false)

  const classToggle = () => {
    setClicked(!clicked)
  }

  const dislikeToggle = (id) => {
    dispatch(disLikedChar({ charID: id }))
  }

  return (
    <div className="container">
      {console.log(user.likedCharacters)}
      { user !== undefined && user.likedCharacters.length > 0 ?
        user.likedCharacters.map((like, i) => 
          <div key={i} className="container w-50">
            <div className="d-flex justify-content-between my-2 rounded shadow">
              <div className="container">
                <img className="float-start rounded img-fluid my-3 me-3" src={like.image} alt={like.name} />
                <div className="mt-3">
                  
                  <h5>Name: <span className="sm">{like.name}</span>,</h5>
                  <h5>Status: <span className="sm">{like.status}</span></h5> 
                
                  <div className="d-flex flex-column align-items-center">
                    <button className="btn my-3 w-75" onClick={() => classToggle()}>{!clicked ? 'Show Info' : 'Hide Info'}</button>
                    <button className="btn my-3 w-50" onClick={() => dislikeToggle(like.id)}>{'💔 Dislike'}</button>
                  </div>
                  
                  <div className={!clicked ? "d-none" : null}>
                    <p><span className="fs-5">Species:</span> {like.species}</p>
                    <p><span className="fs-5">Gender:</span> {like.gender}</p>
                    <p><span className="fs-5">Location:</span> {like.location.name}</p>
                    <p><span className="fs-5">Created:</span> {like.created.slice(0, -14)}</p>
                    <div>
                      <p className="fs-5">Episode(s):</p>
                      <div>
                        <p className="ser">series:</p> 
                        <p>{like.series}</p>
                      </div>
                      <div>
                        <p className="ser">title:</p> 
                        <p>{like.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) :
        <p className="mt-4">No Liked Characters!</p>
      }
      
    </div>
  )
}