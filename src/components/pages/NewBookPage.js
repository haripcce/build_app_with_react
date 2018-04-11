import { Segment } from 'semantic-ui-react';
import React, { Component } from 'react';

import BookForm from '../forms/BookForm';
import SearchBookForm from '../forms/SearchBookForm';

class NewBookPage extends Component {
   
   state ={
   	book:null
   }

   onBookSelect = book => this.setState({book});

   addBook = (data) => console.log(`loggin..${data.title}`);

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

export default NewBookPage;
