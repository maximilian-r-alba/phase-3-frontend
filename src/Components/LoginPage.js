import {useState} from "react"
import { Navigate } from "react-router-dom"

function LoginPage ({setUser}) {


const [loginParameters, setLoginParameters] = useState({username: "maricruz", password: "OGNuQjT"})
const [isLoggedIn, setIsLoggedIn] = useState(false)

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
      
      //potentially use .find method if you can gurantee no duplicate usernames in database
      const matchedUserName = usersArray.filter((user) => user.username == loginParameters.username)[0]

      const authPassword = matchedUserName.password == loginParameters.password
      
      if (authPassword){
        setUser({name: matchedUserName.name, avatar_url: matchedUserName.avatar_url, id: matchedUserName.id})
        setIsLoggedIn(true)
      }
    }

return (<>
   <div>
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

          <input type="submit" value = "Log in"></input>

        </form>
      </div>
    {isLoggedIn ? <Navigate to="/" /> : <></>}
</>
)
}

export default LoginPage;