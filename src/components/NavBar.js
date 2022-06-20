import { Facebook } from "./Facebook"

export const NavBar = () => {
  return (
    <div className="p-5 sticky-top">
      <h1 className="h1 text-center">Rick and Morty Database</h1>
      <Facebook />
    </div>
  )
}