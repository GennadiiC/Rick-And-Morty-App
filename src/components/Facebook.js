import ReactFacebookLogin from "react-facebook-login";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/rickMortySlice";
import { Link } from 'react-router-dom';

export const Facebook = () => {

  const dispatch = useDispatch()
  const { users } = useSelector((state) => state.rickMorty)


  const [ state, setState ] = useState({
    isLogged: false,
    id: ''
  })


  const componentClicked = () => {
    console.log('clicked')
  }


  const responseFacebook = (response) => {

    dispatch(addUser({ 
      isLogged: true,
      userName: response.name, 
      userID: response.userID, 
      userEmail: response.email, 
      userPicture: response.picture.data.url
    }))

    setState(prev => ({
      ...prev,
      isLogged: true,
      id: response.userID
    }))
     
  }


  const user = users.find(usr => usr.userID === state.id)

  let fbContent;

  if (state.isLogged) {
    fbContent = (
      <div>
        <img src={user.userPicture} alt={user.name} />
        <h6>Welcome, {user.name}</h6>
        <Link to='/likes'>See liked collection</Link>
      </div>
    )
  } else {
    fbContent = (
      <ReactFacebookLogin
        size='small'
        appId="590001315795132"
        autoLoad={true}
        fields="name,email,picture"
        onClick={componentClicked}
        callback={responseFacebook} 
      />
    )
  }

  return (
    <>
      {fbContent}
    </>
  )
}