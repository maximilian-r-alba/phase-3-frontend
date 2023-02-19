import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "./UserContext";
import LoginPage from "./LoginPage";

function NavBar ({setUser, viewForm , setViewForm , setForm}) {

    const user = useContext(UserContext)

    function handleLogout (e){
        setUser(false)
        setViewForm(false)
    }

    function handleLogInForm(e){
        setViewForm(!viewForm)
        setForm(<LoginPage setUser={setUser} setViewForm={setViewForm}></LoginPage>)
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