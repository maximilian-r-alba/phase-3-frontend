
function BooksCard ({book}){

    return (
        <div>
            <h1>{book.title}</h1>
            <p>{book.author}</p>
            <img src={book.cover_url}></img>
        </div>
        
    )
}

export default BooksCard