import React from 'react'
import { Link } from 'react-router-dom'
import Shelf from './Shelf'
import './App.css'

class BookShelf extends React.Component {

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf title={'Currently Reading'} libraryData={this.props.allBooksData} tag={'currentlyReading'} shelfing={this.props.reShelf} />
            <Shelf title={'Want to Read'} libraryData={this.props.allBooksData} tag={'wantToRead'} shelfing={this.props.reShelf} />
            <Shelf title={'Read'} libraryData={this.props.allBooksData} tag={'read'} shelfing={this.props.reShelf} />
          </div>
        </div>
        <Link className="open-search"
          to='/search'
        >Add a book</Link>
      </div>
    )
  }
}

export default BookShelf