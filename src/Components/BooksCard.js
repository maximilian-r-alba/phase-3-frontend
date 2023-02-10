import styled from "styled-components"
import { Link } from "react-router-dom"

function BooksCard ({book}){

    return (
        <Link to={`/books/${book.id}`}>
        <BookDiv id = {`book${book.id}`}>
            <h1>{book.title}</h1>
            <img src={`${book.cover_url}?random=${Math.floor(Math.random() * 50)}`}></img>
            <p>{book.author}</p>
        </BookDiv>
        </Link>
        
    )
}

export default BooksCard

const BookDiv = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width:200px;
height:300px;
font-size: small;
border: 5px solid black;
img{
    width: 145px;
    height: 215px;
}
h1{
    font-size: 20px;
    height:70px;
}
`