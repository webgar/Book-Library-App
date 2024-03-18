import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './slices/booksSlice'
import errorReducer from './slices/errorSlice'
import filterReducer from './slices/filterSlice'

const store = configureStore({
	reducer: {
		books: booksReducer,
		filter: filterReducer,
		error: errorReducer,
	},
})
export default store
