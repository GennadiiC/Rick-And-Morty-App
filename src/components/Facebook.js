import ReactFacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/rickMortySlice";
import { Link, useLocation } from 'react-router-dom';

export const Facebook = () => {

  const dispatch = useDispatch()
  const { users } = useSelector((state) => state.rickMorty)

  const location = useLocation()


  const [ state, setState ] = useState({
    isLogged: false,
    id: ''
  })

  const [ clicked, setClicked ] = useState(false)


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
      <div className="d-flex justify-content-around align-items-center w-50">
        <img className="img-fluid rounded float-start" src={user.userPicture} alt={user.name} />
        <h6 className="h6 me-2 ms-3">Welcome, {user.name}</h6>
        <Link 
          className="btn btn-outline-dark text-center me-2" 
          onClick={() => setClicked(!clicked)} 
          to={location.pathname === '/' ? '/likes' : '/'}>{location.pathname === '/' ? 'See liked' : 'Go to main'}</Link>
      </div>
    )
  } else {
    fbContent = (
      <ReactFacebookLogin
        size='small'
        appId="590001315795132"
        autoLoad={true}
        render={renderProps => (
          <button className="btn btn-outline-dark my-3" onClick={renderProps.onClick}>Login to Facebook<i className="fa-brands fa-facebook-square"></i></button>
        )}
        fields="name,email,picture"
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