import * as a from './actionTypes.js'

export const addBook = newBook => {
	return {
		type: a.ADD_BOOK,
		payload: newBook,
	}
}
export const deleteBook = id => {
	return {
		type: a.DELETE_BOOK,
		payload: id,
	}
}
