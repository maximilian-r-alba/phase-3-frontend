import styled from "styled-components"

function BooksCard ({book}){

    return (
        <BookDiv>
            <h1>{book.name}</h1>
            <img src={`${book.cover_url}`}></img>
            <p>{book.author}</p>
        </BookDiv>
        
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