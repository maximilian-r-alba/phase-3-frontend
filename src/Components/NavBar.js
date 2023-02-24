import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "./UserContext";
import LoginPage from "./LoginPage";
import styled from "styled-components";

function NavBar ({setUser , handleFormContainer}) {

    const user = useContext(UserContext)

    //user avatar still shows missing on logout
    function handleLogout (e){
        setUser(false)
        handleFormContainer(false)
    }

    function handleLogInForm(e){
        handleFormContainer(true, <LoginPage setUser={setUser} handleFormContainer={handleFormContainer}></LoginPage> )
    }

    return (
        <StyledNavBar>
            <NavLink className="home" to="/">Home</NavLink>
            <NavLink to="/books">Books</NavLink>
            {user ? <NavLink to="/profile">Profile</NavLink> : <></>}
            {!user ? <LogInBtn onClick={handleLogInForm}>Log In</LogInBtn> : <LogInBtn onClick={handleLogout}>Logout</LogInBtn>}
        </StyledNavBar>
    )
}

export default NavBar

const LogInBtn = styled.button`

height: 34px;
display: inline;
cursor: pointer;
`
const StyledNavBar = styled.nav`
margin-top: 50px;
margin-bottom: 30px;
*{
font-family: 'Courier New', Courier, monospace;
background: none;
border: none;
border-left: solid;
margin-right: 30px;
padding: 0px 10px 0px 10px;
font-size: 30px;
color: black;
}
a{
    box-sizing: border-box;
    width: 100px;
    text-decoration: none;
}
a.home{
    margin-left: 80px;
}
`