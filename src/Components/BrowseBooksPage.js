import './BooksCard'
import styled from 'styled-components'
import {useState , useEffect} from 'react'

function BrowseBooksPage({books , setBooks , createBookCards}){

    const [renderedCards, setRenderedCards] = useState(createBookCards(books))

    const [viewTitle, setViewTitle] = useState("Alphabetical")

    useEffect(() => {
        fetch("http://localhost:9292/books")
          .then(r => r.json())
          .then(data => setBooks(data))
      }, [])

      useEffect(() => {
        setViewTitle("Alphabetical")
        setRenderedCards(createBookCards(books))
      }, [books])

    function handleSort(e){
        const sortValue = e.target.value
        setViewTitle(sortValue)
        switch (sortValue) {
            case "Fiction":
                fetch("http://localhost:9292/books/genre/fiction")
                    .then(r => r.json())
                    .then(data => setRenderedCards(createBookCards(data)))
                break;

            case "Non-Fiction":
                fetch("http://localhost:9292/books/genre/nonfiction")
                    .then(r => r.json())
                    .then(data => setRenderedCards(createBookCards(data)))
                break;

            case "Author":
                fetch("http://localhost:9292/books/author/alphabetical")
                    .then(r => r.json())
                    .then(data => setRenderedCards(createBookCards(data)))
                break;

            case "Alphabetical":
                fetch("http://localhost:9292/books")
                    .then(r => r.json())
                    .then(data => setRenderedCards(createBookCards(data)))
                break;
        }
    }

    return(
    <>
        <FilterHeader>Filter By:</FilterHeader>

        <StyledSort>
            <button type = "button" value = "Alphabetical" onClick={handleSort}>Alphabetical</button>
            <button type = "button" value = "Fiction" onClick={handleSort}>Fiction</button>
            <button type = "button" value = "Non-Fiction" onClick={handleSort}>Non-Fiction</button>
            <button type = "button" value = "Author" onClick={handleSort}>Author</button>
        </StyledSort>

        <h1>{viewTitle}</h1>
    
        <Container>
            {renderedCards}
        </Container>
    </>
        
    )
}

export default BrowseBooksPage

const Container = styled.div`
    display: flex;
    flex-wrap:wrap;
    justify-content: space-evenly;
    gap: 30px;
`
const FilterHeader = styled.p`
text-align: center;
font-size: 25px;
`

const StyledSort = styled.div`
display: flex;
justify-content: center;
gap: 20px;
button{
    background: none;
    border: none;
    font-size: 18px;
    font-family: 'Courier New', Courier, monospace;
    cursor: pointer;
}

`