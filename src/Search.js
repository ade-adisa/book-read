import React from 'react'
import './App.css'
import { Link } from 'react-router-dom'
// import Shelf from './Shelf'
import * as BooksAPI from './BooksAPI'

class Search extends React.Component {

  state = {
    query: '',
    searchResult: []
  }

  handleSearch = async (query) => {
    try {
      this.setState({ query: query.trim() })
      const result = query === ''
        ? []
        : await BooksAPI.search(query.trim())
      if (result.error) {
        this.setState({ searchResult: [] })
      } else {
        this.setState({ searchResult: result })
        console.log(result)
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {

    // const { query, searchResult } = this.state
    // const { searches } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          {/* {console.log(this.state)} */}
          {/* <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a> */}
          <Link className="close-search"
            to='/'
            replace={false}
          >Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={this.state.query}
              placeholder="Search by title or author"
              onChange={(event) => this.handleSearch(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchResult.length > 0 && this.state.searchResult.map((filteredBook) => {
              const foundShelf = this.props.allBooksData.find(searchItem => searchItem.id === filteredBook.id);
              console.log(foundShelf);
              if (foundShelf) { filteredBook.shelf = foundShelf.shelf } else { filteredBook.shelf = 'none' }
              return (
                <li key={filteredBook.id}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${filteredBook.imageLinks ? filteredBook.imageLinks.thumbnail : ""})` }}></div>
                      <div className="book-shelf-changer">
                        <select onChange={(event) => this.props.reShelf(filteredBook, event.target.value, this.state.searchResult)} value={filteredBook.shelf}>
                          <option value="move" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{filteredBook.title}</div>
                    <div className="book-authors">{filteredBook.authors ? filteredBook.authors : "Anon"}</div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search