import {connect} from 'react-redux'
import React from 'react'

import PropTypes from 'prop-types'

import { allBooksSelector } from '../../reducers/books';
import AddBookCtA from '../ctas/AddBookCtA';
import ConfirmEmailMessage from '../messages/ConfirmEmailMessage'

const DashboardPage = ({isConfirmed, books}) => (
  <div>
  {!isConfirmed && <ConfirmEmailMessage />}
  { books.length === 0 && <AddBookCtA />}
  </div>
);

DashboardPage.propTypes ={
	isConfirmed:PropTypes.bool.isRequired,
	books : PropTypes.arrayOf(PropTypes.shape({
	  title : PropTypes.string.isRequired
	}).isRequired).isRequired
}

function mapStateToProps(state){
  return{
    isConfirmed: !!state.user.confirmed,
    books: allBooksSelector(state)
  }
}

export default connect(mapStateToProps)(DashboardPage);