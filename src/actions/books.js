import { BOOK_CREATED } from '../types';
import {normalize} from 'normalizr';
import { BOOKS_FETCHED } from '../types';
import { bookSchema } from '../schemas';
import api from '../api';


export const createBook = (data) => (dispatch) => 
api.books.create(data).then((book) => dispatch(bookCreated(normalize(book,bookSchema))));

export const fetchBooks = () => (dispatch) => 
api.books.fetchAll().then(books => dispatch(booksFetched(normalize(books,[bookSchema]))));

const booksFetched = (data) => ({
type : 	BOOKS_FETCHED,
data 
});

const bookCreated = (data) => ({
type : 	BOOK_CREATED,
data 
});

