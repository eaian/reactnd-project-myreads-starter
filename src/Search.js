import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom'
import Books from './Books'

class Search extends Component {
    state = {
    search: '',
      searchedBooks: []
  }

    updateSearch = (search) => {
      this.setState({search: search })
      this.showResults(search)
    }

showResults = (search) => {
  if(search) {
		BooksAPI.search(search).then((searchedBooks) => {
      if(searchedBooks.error) {
        this.setState({ searchedBooks: []})
      }else{
        this.setState({searchedBooks:searchedBooks, search:search})
      }
    })
  }else{
    this.setState({ searchedBooks: []})
  }
}

  render() {
    return (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search" >Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"
onChange={(event) => this.updateSearch(event.target.value)}/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
    {this.state.searchedBooks.map(searchedBook => {

      let value = "none";
     this.props.books.map(books => (
      books.id === searchedBook.id ?
      value = books.shelf : ''

    )); 
 return (<li key={searchedBook.id}>
         <Books
            book={searchedBook}
            currentShelf={value}
            changeShelf={this.props.changeShelf}
          />
      </li>
      )
		})
	}
					</ol>
            </div>
          </div>
        )   
  }
}

export default Search

