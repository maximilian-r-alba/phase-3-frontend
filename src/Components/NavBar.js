import { NavLink } from "react-router-dom";

function NavBar ({user, setUser}) {

    

    function handleLogout (e){
        setUser(false)
    }

    return (
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/books">Books</NavLink>
            {user ? <NavLink to="/profile">Profile</NavLink> : <></>}
            {!user ? <NavLink to="/login"> Log In</NavLink> : <button onClick={handleLogout}>Logout</button>}
        </nav>
    )
}

export default NavBar