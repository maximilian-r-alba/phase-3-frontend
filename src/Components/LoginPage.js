import {useState} from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import {FaWindowClose} from "react-icons/fa"

function LoginPage ({setUser  , handleFormContainer}) {

const [loginParameters, setLoginParameters] = useState({username: "brande", password: "yfoG"})
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
        handleFormContainer(false)
      }
    }

return (<>
   <FormDiv>
   <button onClick={(e) => handleFormContainer(false)}><FaWindowClose size={20} /></button>
        <p>Log In</p>
        
        <form onSubmit={handleOnSubmit}>
          <label>
            Username:
            <input type="text" name="username" value={loginParameters["username"]} onChange={handleChange}></input>
          </label>
          
          <label>
            Password:
          <input type="password" name="password" value={loginParameters["password"]} onChange={handleChange}></input>
          </label>

          <input className='submitBtn' type="submit" value = "Log in"></input>

        </form>
      </FormDiv>
    {isLoggedIn ? navigate("/") : <></>}
</>
)
}

export default LoginPage;

const FormDiv = styled.div `
button{
  color: red;
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  
}
p{
  font-size: 30px;
  text-align: center;
}
form{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

label{
  font-size: 20px;
  width: 200px;
}

input{
  margin-left: 10px;
}

input.submitBtn{
  align-self: left;
  width: 100px;
  height: 30px;
  font-size: 25px;
  background: none;
  border: none;
  text-decoration: underline;
  cursor: pointer;
}
`