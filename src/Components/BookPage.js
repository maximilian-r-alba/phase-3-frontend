import './BooksCard'
import BooksCard from './BooksCard'
import styled from 'styled-components'
import {useState} from 'react'
import { createPortal } from 'react-dom'

function BookPage({books}){
   
    const bookCards = createBookCards(books)

    const [renderedCards, setRenderedCards] = useState(bookCards)

    const [viewTitle, setViewTitle] = useState("Books")

    function createBookCards(bookArr){
        return bookArr.map((book) => <BooksCard key = {book.id} book={book} />)
    }

    function handleSort(e){
        const fictionValue = e.target.value
        setViewTitle(fictionValue)
        switch (fictionValue) {
            case "Fiction":
            // const fictionBooks = books.filter((book) => book["fiction?"])
            // setRenderedCards((createBookCards(fictionBooks)))

            fetch("http://localhost:9292/books/fiction")
            .then(r => r.json())
            .then(data => setRenderedCards(createBookCards(data)))

                break;

            case "Non-Fiction":
            // const nonfictionBooks = books.filter((book) => !book["fiction?"])
            // setRenderedCards((createBookCards(nonfictionBooks)))  
            
            
            fetch("http://localhost:9292/books/nonfiction")
            .then(r => r.json())
            .then(data => setRenderedCards(createBookCards(data)))

                break;

            case "Author":
                // const authorSortList = books.sort((a,b) => a.author.localeCompare(b.author))

                // setRenderedCards(createBookCards(authorSortList))

                fetch("http://localhost:9292/books/author/alphabetical")
                .then(r => r.json())
                .then(data => setRenderedCards(createBookCards(data)))

                break;

            case "Books":
                setRenderedCards(bookCards)
                break;

        }
    }

    return(
    <>
    <form>
        <input type = "button" value = "Books" onClick={handleSort}></input>
        <input type = "button" value = "Fiction" onClick={handleSort}></input>
        <input type = "button" value = "Non-Fiction" onClick={handleSort}></input>
        <input type = "button" value = "Author" onClick={handleSort}></input>
    </form>
   <h1>{viewTitle}</h1>
    <Container>
        {/* {filtered} */}
        {renderedCards}
    </Container>
    </>

        
    )
}

export default BookPage

const Container = styled.div`
    display: flex;
    flex-wrap:wrap;
    justify-content: space-evenly;
    gap: 30px;
`