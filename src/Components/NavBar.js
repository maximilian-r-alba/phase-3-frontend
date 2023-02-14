import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "./UserContext";

function NavBar ({setUser, setViewLoginForm}) {

    const user = useContext(UserContext)

    function handleLogout (e){
        setUser(false)
    }

    function handleLogInForm(e){
        setViewLoginForm(true)
    }

    return (
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/books">Books</NavLink>
            {user ? <NavLink to="/profile">Profile</NavLink> : <></>}
            {!user ? <button onClick={handleLogInForm}>Log In</button> : <button onClick={handleLogout}>Logout</button>}
        </nav>
    )
}

export default NavBar