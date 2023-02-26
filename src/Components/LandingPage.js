import { UserContext } from "./UserContext"
import { useContext } from "react"
import { useState , useEffect } from "react"
import BooksCard from "./BooksCard"
import styled from "styled-components"

function LandingPage ({books , setBooks}) {
   const user = useContext(UserContext) 
   const [cards, setCards] = useState(undefined)

   useEffect(() => {
    fetch(`http://localhost:9292/books/toprated`).then(r => r.json()).then(data => setBooks(data))
   }, [])

   useEffect(() => {
    setCards(createCards(books))
   }, [books])

   function createCards (bookArr) {

     return (bookArr.map((book) => <BooksCard key={book.id} book={book} />))
   }

    return(
        <LandingContainer>
        {user ? <h1>WELCOME {user.name}</h1> : <h1>Welcome</h1>}
        {cards ? 
        <div>
            <h1>Top Ten Books</h1>
            <TopTenContainer>
                {cards} 
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