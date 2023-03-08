import { useEffect , useContext } from "react"
import { UserContext } from "./UserContext"
import styled from "styled-components"


function LandingPage ({books , setBooks , createBookCards}) {
   const user = useContext(UserContext) 

   useEffect(() => {
    fetch(`http://localhost:9292/books/toprated`)
    .then(r => r.json())
    .then(data => setBooks(data))
   }, [])

    return(
        <LandingContainer>
        {user ? <h1>WELCOME {user.name}</h1> : <h1>Welcome</h1>}
        {books ? 
        <div>
            <h1>Top Ten Books</h1>
            <TopTenContainer>
                {createBookCards(books)} 
            </TopTenContainer>
        </div>
        : <></>}
       </LandingContainer>
    )
}

export default LandingPage

const TopTenContainer = styled.div`
display: flex;
gap: 60px;
width: 50vw;
overflow: scroll;
overflow-y: hidden;
`
const LandingContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 100px;
`