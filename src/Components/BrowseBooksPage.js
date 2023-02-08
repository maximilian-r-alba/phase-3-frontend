import './BooksCard'
import BooksCard from './BooksCard'
import styled from 'styled-components'
import {useState , useEffect} from 'react'
import { createPortal } from 'react-dom'
import { NavLink } from "react-router-dom";

function BrowseBooksPage({books , setBooks}){

    
    useEffect(() => {
        fetch("http://localhost:9292/books")
          .then(r => r.json())
          .then(data => setBooks(data))
      }, [])

      useEffect(() => {
        setRenderedCards(createBookCards(books))
      }, [books])

      console.log('in browse', books)
     
    const [bookCards, setBookCards] = useState([])

    const [renderedCards, setRenderedCards] = useState(createBookCards(books))

    const [viewTitle, setViewTitle] = useState("Books")

    function createBookCards(bookArr){
        return bookArr.map((book) => <BooksCard key = {book.id} bookID={book.id} book={book} onClick={handleBookLink}/>)
    }

    function handleBookLink(e){
        console.log(e.target.bookID)
        // nest book card in nav link? or in a tag with href of /books/:id?
    }

    function handleSort(e){
        const fictionValue = e.target.value
        setViewTitle(fictionValue)
        switch (fictionValue) {
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

            case "Books":
                // setRenderedCards(bookCards)
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

export default BrowseBooksPage

const Container = styled.div`
    display: flex;
    flex-wrap:wrap;
    justify-content: space-evenly;
    gap: 30px;
`