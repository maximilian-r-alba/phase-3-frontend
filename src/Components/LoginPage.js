import {useState} from "react"
import { useNavigate } from "react-router-dom"
import { createPortal } from "react-dom"
import styled from "styled-components"


function LoginPage ({setUser  , setViewForm}) {

const [loginParameters, setLoginParameters] = useState({username: "corinne", password: "LvLjhU"})
const [isLoggedIn, setIsLoggedIn] = useState(false)
const navigate = useNavigate()

function handleChange (e) {
      const key = e.target.name
      const value = e.target.value
    
      setLoginParameters({...loginParameters, [key]: value})
    }
    
function handleOnSubmit (e) {
      e.preventDefault()

      fetch("http://localhost:9292/users")
        .then(r => r.json())
        .then(data => authUserLogin(data))
        setLoginParameters({username:"", password:""})
        
    }

     function authUserLogin (usersArray) {
     
      const matchedUser = usersArray.filter((user) => user.username === loginParameters.username)[0]

      const authPassword = matchedUser.password === loginParameters.password
      
      if (authPassword){
        setUser({name: matchedUser.name, avatar_url: matchedUser.avatar_url, id: matchedUser.id, bio: matchedUser.bio})
        setIsLoggedIn(true)
        setViewForm(false)
      }
    }
  function closeLogin(){
    setViewForm(false)
  }

return (<>
   <FormDiv>
        <p>Log In</p>
        <button onClick={closeLogin}>X</button>
        <form onSubmit={handleOnSubmit}>
          <label>
            Username:
            <input type="text" name="username" value={loginParameters["username"]} onChange={handleChange}></input>
          </label>
          
          <label>
            Password:
          <input type="password" name="password" value={loginParameters["password"]} onChange={handleChange}></input>
          </label>

          <input type="submit" value = "Log in"></input>

        </form>
      </FormDiv>
    {isLoggedIn ? navigate("/") : <></>}
</>
)
}

export default LoginPage;

const FormDiv = styled.div `
position: fixed;
top: 15vh;
left: 25vw;
border: solid;
height: 10vh;
width: 50vw;
opacity: 1;
background-color: white;
`