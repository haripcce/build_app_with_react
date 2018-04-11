import { Button, Form, Grid, Segment } from 'semantic-ui-react';
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import InlineError from '../messages/InlineError';

class BookForm extends Component {
	state = {
	data:{
		goodreadsId : this.props.book.goodreadsId,
		title : this.props.book.title,
		pages : this.props.book.pages,
		authors : this.props.book.authors
	},
	loading:false,
	errors : {}
	}

	onChange = e => {
		const newInput = Object.assign({},
  		this.state.data, {[e.target.id]: e.target.value});
  		
    	this.setState({
      	data: newInput
    	});
	}
	onChangeNumber = e => {
		const newInput = Object.assign({},
  		this.state.data, {[e.target.id]: parseInt(e.target.value,10)});
  		
    	this.setState({
      	data: newInput
    	});
	}
	onSubmit = (e) => {
		e.preventDefault();
		const errors = 	this.validate(this.state.data);
		this.setState({errors})
			if(Object.keys(errors).length === 0){
			this.setState({loading:true});
			this.props.submit(this.state.data);
			}
	}

	validate = (data) => {
		const errors = {};
		if(!data.title) errors.title = "cant be blank";
		if(!data.authors) errors.authors = "cant be blank";
		if(!data.pages) errors.pages = "cant be blank";
		
		return errors;
	}
	componentWillReceiveProps(props) {
		this.setState({
			data:{
				goodreadsId : props.book.goodreadsId,
				title : props.book.title,
				pages : props.book.pages,
				authors : props.book.authors
				}
		});
	}
    render() {
    	const {loading , errors, data} = this.state;
        return (
        <div>
        <Segment>
	        <Form onSubmit={this.onSubmit} loading={loading}>
	        <Grid column={1}>
		        <Grid.Row>
		        	 <Grid.Column>
		        	<Form.Field error={!!errors.title} >
		        							<label htmlFor="title">Book Title</label>
		        							<input 
		        							placeholder='New password' 
		        							id="title" 
		        							type="text" 
		        							name="title"
		        							value={data.title}
		        							onChange={this.onChange} />
		        			     {errors.title && <InlineError text={errors.title} />} 
		        	</Form.Field>
		        	<Form.Field error={!!errors.authors} >
		        							<label htmlFor="authors">Authors</label>
		        							<input 
		        							placeholder='Authors' 
		        							id="authors" 
		        							type="text" 
		        							name="authors"
		        							value={data.authors}
		        							onChange={this.onChange} />
		        			     {errors.authors && <InlineError text={errors.authors} />} 
		        	</Form.Field>
		        	<Form.Field error={!!errors.pages} >
		        							<label htmlFor="pages">Pages</label>
		        							<input 
		        							placeholder='pages' 
		        							id="pages" 
		        							type="number" 
		        							name="pages"
		        							value={data.pages}
		        							onChange={this.onChangeNumber} />
		        			     {errors.pages && <InlineError text={errors.pages} />} 
		        			    </Form.Field>
		        	 </Grid.Column>
		        </Grid.Row>
		        <Grid.Row>
		        <Grid.Column>
		        <Button primary>Submit</Button>
		        </Grid.Column>
		        	
		        </Grid.Row>
		        </Grid>
			</Form>	
        </Segment>

		</div>
        );
    }
}

BookForm.propTypes= {
	submit: PropTypes.func.isRequired,
	book : PropTypes.shape({
		goodreadsId : PropTypes.number.isRequired,
		title : PropTypes.string.isRequired,
		pages : PropTypes.number.isRequired,
		authors : PropTypes.string.isRequired
	}).isRequired
}

export default BookForm;
