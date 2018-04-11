import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { createBook } from '../../actions/books';
import BookForm from '../forms/BookForm';
import SearchBookForm from '../forms/SearchBookForm';

class NewBookPage extends Component {
   
   state ={
    book:null
   }

   onBookSelect = book => this.setState({book});

   addBook = (book) => this.props.createBook(book).then(() => this.props.history.push("/dashboard"));

   render() {
        return (
       <Segment>
          <h1>Add new book to your collection</h1>
          <SearchBookForm onBookSelect={this.onBookSelect} />
          {this.state.book && (<BookForm 
            submit={this.addBook}
            book={this.state.book}
             />)}
       </Segment>     
        );
    }
}

NewBookPage.propTypes= {
  createBook : PropTypes.func.isRequired,
  history : PropTypes.shape({
    push : PropTypes.func.isRequired
  })
}

export default connect(null,{createBook})(NewBookPage);