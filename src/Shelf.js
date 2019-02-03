import React from 'react'
// import { Link } from 'react-router-dom'
import './App.css'

class Shelf extends React.Component {

    state = { shelfChoice: ''}

    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.libraryData.filter((allBooks) => (
                            allBooks.shelf === this.props.tag)).map((filteredBook) => (
                                <li key={filteredBook.id}>
                                    <div className="book">
                                        <div className="book-top">
                                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + filteredBook.imageLinks.thumbnail + ')' }}></div>
                                            <div className="book-shelf-changer">
                                                <select onChange={(event) => this.props.shelfing(filteredBook, event.target.value, this.props.libraryData)} value={filteredBook.shelf}>
                                                    <option value="move" disabled>Move to...</option>
                                                    <option value="currentlyReading">Currently Reading</option>
                                                    <option value="wantToRead">Want to Read</option>
                                                    <option value="read">Read</option>
                                                    <option value="none">None</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="book-title">{filteredBook.title}</div>
                                        <div className="book-authors">{filteredBook.authors}</div>
                                    </div>
                                </li>
                            ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Shelf