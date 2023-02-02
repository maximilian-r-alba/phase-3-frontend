import {useState, useEffect} from "react";

function BrowseBooksPage(){

    const [allBooks, setAllBooks] = useState([])
    
    useEffect(() => {
        fetch('http://localhost:9292/books')
            .then(r => r.json())
            .then(data => setAllBooks(data))
    }, [])

    return (
        <h1>SHOW BOOKS HERE</h1>
    )
}