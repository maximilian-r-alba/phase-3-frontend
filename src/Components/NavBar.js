import { NavLink } from "react-router-dom";

function NavBar () {

    return (
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/login"> Log In</NavLink>
            <NavLink to="/books">Books</NavLink>
            <NavLink to="/profile">Profile</NavLink>
        </nav>
    )
}

export default NavBar