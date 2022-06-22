import { Facebook } from "./Facebook"

export const NavBar = () => {
  return (
    <div className="d-flex justify-content-between align-items-center p-3 sticky-top">
      <h1 className="h1 w-50">Rick and Morty Database</h1>
      
      <Facebook />
  
    </div>
  )
}