import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'
import Search from './Search'
import BookShelf from './BookShelf'
// import icons from '../icons'

class BooksApp extends React.Component {

state = {
  bookFiles:[]
}



getBooksData(){
  // setTimeout(() => {
    try {
      BooksAPI.getAll().then((books) => this.setState({
        bookFiles: books
      }));
      console.log('books called')
    } catch (error) {
      console.log(error)
    }
  // }, 1000)
}

  componentDidMount() {
    this.getBooksData();
  }

  handleChanger = async (book, shelfSelect, basket) => {
    try {
    const newShuffle = await BooksAPI.update(book, shelfSelect).then(function (data) {
      // console.log(data)
      return data;
    })
      const newBooks = basket.map(allBooks => {
        const foundID = newShuffle[shelfSelect].find(
          bookID => bookID === allBooks.id
        );
        if (foundID) {allBooks.shelf = shelfSelect;}
        return allBooks;
      });
      // this.setState({bookFiles: newBooks});
      this.getBooksData(); //Gettingh all books again after reshelfing instead of just passing newBooks(above) to state which doesn't work well on segue back from search as it sorts a new different 'basket', hiding those not belonging to the 3 main categories
      console.log('Done Reshelfing', newBooks)
    } catch (error) {
      console.log(error)
    }
  }
  

  render() {
    return (
      <div className="app">
      {/* {this.state.bookFiles.length > 0 && console.log('Show Library', this.state.bookFiles)} */} 
        {/* <Route exact path='/search' component={Search} /> */}
        <Route exact path='/search' render={() => (
        <Search allBooksData={this.state.bookFiles} reShelf={this.handleChanger}/>
        )} />
        <Route exact path='/' render={() => (
        <BookShelf allBooksData={this.state.bookFiles} reShelf={this.handleChanger}/>
        )} />
      </div>
    )
  }
}

export default BooksApp

