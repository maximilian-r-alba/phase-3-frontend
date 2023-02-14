import { UserContext } from "./UserContext"
import { useContext } from "react"

function LandingPage () {
   const user = useContext(UserContext) 
    return(
        <>
        {user ? <h1>WELCOME {user.name}</h1> : <h1>WELCOME LANDING PAGE</h1>}
       </>
    )

   
}

export default LandingPage