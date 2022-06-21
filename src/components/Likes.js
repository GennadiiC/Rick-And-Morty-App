import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Character } from "./Character";

export const Likes = () => {

  const { users } = useSelector((state) => state.rickMorty)

  const user = users.find(usr => usr.isLogged === true)

  return (
    <div className="container">
      {console.log(user.likedCharacters)}
      { user !== undefined && user.likedCharacters.length > 0 ?
        user.likedCharacters.map(like => 
          <Character 
            key={like.id}
            name={like.name}
            species={like.species}
            gender={like.gender}
            location={like.location}
            status={like.status}
            episode={like.episode}
            created={like.created}
            image={like.image}
          />
        ) :
        <p>No Liked Characters!</p>
      }
      
    </div>
  )
}