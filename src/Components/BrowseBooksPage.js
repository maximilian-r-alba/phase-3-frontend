import './BooksCard'
import BooksCard from './BooksCard'
import styled from 'styled-components'
import {useState , useEffect} from 'react'
import { createPortal } from 'react-dom'
import { NavLink } from "react-router-dom";

function BrowseBooksPage({books , setBooks}){

    const [renderedCards, setRenderedCards] = useState(createBookCards(books))

    const [viewTitle, setViewTitle] = useState("Books")

    useEffect(() => {
        fetch("http://localhost:9292/books")
          .then(r => r.json())
          .then(data => setBooks(data))
      }, [])

      useEffect(() => {
        setViewTitle("Books")
        setRenderedCards(createBookCards(books))
      }, [books])



    function createBookCards(bookArr){
        return bookArr.map((book) => <BooksCard key = {book.id} book={book} handleBookLink={handleBookLink}/>)
    }

    function handleBookLink(e){
        console.log(e.target)
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
                fetch("http://localhost:9292/books")
                    .then(r => r.json())
                    .then(data => setRenderedCards(createBookCards(data)))
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