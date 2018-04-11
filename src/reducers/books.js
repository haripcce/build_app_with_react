import {createSelector} from 'reselect';

import { BOOKS_FETCHED, BOOK_CREATED } from '../types';

export default function books(state = {}, action = {}){
	switch(action.type){
		case BOOK_CREATED:
		case BOOKS_FETCHED:
		return  {...state, ...action.data.entities.books};

		default: return state;
	}
}

//selectors
export const booksSelector = state => state.books

export const allBooksSelector = createSelector(
booksSelector,
booksHash => Object.values(booksHash)
);