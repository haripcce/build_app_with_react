import { Dropdown, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class SearchBookForm extends Component {
   state = {
   	query:'',
   	loading:false,
   	options:[],
   	books: {}
   }

	onChange = (e,data) => {
		this.setState({query:data.value});
		this.props.onBookSelect(this.state.books[data.value]);
	}
	onSearchChange = (e, data) => {
   		clearTimeout(this.timer);
   		this.setState({
   			query:data.searchQuery
   		});
   		this.timer = setTimeout(this.fetchOptions, 1000);
   }

   fetchOptions = () => {
   	//if(!this.state.query) return;
   	this.setState({loading:true});
   	axios.get(`/tasks?query=${this.state.query}`,
   		{headers: {
        "Authorization" : `Bearer  ${this.props.token}`
      }
    })
   	.then(res => res.data.books)
   	.then(books => {
   		const options = [];
   		const bookHash = [];
   		books.forEach(book => {
   			bookHash[book.goodreadsId] = book;
   			options.push({
   				key:book.goodreadsId,
   				value:book.goodreadsId,
   				text:book.title
   			});
   		});
   		this.setState({loading:false,options,books:bookHash})
   	} )
   }

    render() {
        return (
         <Form>
         	<Dropdown 
         	search
         	fluid
         	placeholder="search for a book by title"
         	value={this.state.query}
         	onSearchChange={this.onSearchChange}
         	options={this.state.options}
         	loading={this.state.loading}
         	onChange = {this.onChange}
         	 />
         </Form>   
        );
    }
}

function mapStateToProps(state){
return {
	token : state.user.token 
}
}

SearchBookForm.propTypes= {
	onBookSelect : PropTypes.func.isRequired
}

export default connect(mapStateToProps)(SearchBookForm);
