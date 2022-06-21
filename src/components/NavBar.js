import { Facebook } from "./Facebook"
import { Link } from 'react-router-dom'

export const NavBar = () => {
  return (
    <div className="p-5 sticky-top">
      <h1 className="h1 text-center">Rick and Morty Database</h1>
      <div className="d-flex p-2">
        <Facebook />
      </div>
    </div>
  )
}