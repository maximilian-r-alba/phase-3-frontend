import './BooksCard'
import BooksCard from './BooksCard'
import styled from 'styled-components'
function BookPage({books}){
   
    const bookCards = books.map((book) => 
        <BooksCard key = {book.id} book = {book} />
    )
    // const filtered = books.filter((book) => book.genre.toLowerCase() =='mythology').map((book) => <BooksCard key = {book.id} book = {book} />)

    return(<Container>
        {/* {filtered} */}
        {bookCards}
    </Container>
        
    )
}

export default BookPage

const Container = styled.div`
    display: flex;
    flex-wrap:wrap;
    justify-content: space-evenly;
    gap: 30px;
`