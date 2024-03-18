import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import createBookWithId from '../../utils/createBookWithId'
// import { setError } from './errorSlice'

const initialState = []

// export const fetchBook = createAsyncThunk(
// 	'books/fetchBook',
// 	async (url, thunkAPI) => {
// 		try {
// 			const res = await axios.get(url)
// 			return res.data
// 		} catch (error) {
// 			thunkAPI.dispatch(setError(error.message))
// 			// OPTION 1
// 			return thunkAPI.rejectWithValue(error)
// 			// // OPTION 2
// 			// throw error
// 		}
// 	}
// )

const booksSlice = createSlice({
	name: 'books',
	initialState,
	reducers: {
		addBook: (state, action) => {
			state.push(action.payload)
		},
		deleteBook: (state, action) => {
			return state.filter(book => book.id !== action.payload)
		},
		toggleFavorite: (state, action) => {
			state.forEach(book => {
				if (book.id === action.payload) {
					book.isFavorite = !book.isFavorite
				}
			})
		},
	},
	// 	// OPTION 1
	// 	extraReducers: {
	// 		[fetchBook.pending]: state => {
	// 			state.isLoadingViaAPI = true
	// 		},
	// 		[fetchBook.fulfilled]: (state, action) => {
	// 			state.isLoadingViaAPI = false
	// 			if (action?.payload?.title && action?.payload?.author) {
	// 				state.books.push(createBookWithId(action.payload, 'API'))
	// 			}
	// 		},
	// 		[fetchBook.rejected]: state => {
	// 			state.isLoadingViaAPI = false
	// 		},
	// 	},
	// // OPTION 2
	// extraReducers: (builder) => {
	//     builder.addCase(fetchBook.pending, (state) => {
	//         state.isLoadingViaAPI = true;
	//     });
	//     builder.addCase(fetchBook.fulfilled, (state, action) => {
	//         state.isLoadingViaAPI = false;
	//         if (action.payload.title && action.payload.author) {
	//             state.books.push(createBookWithID(action.payload, 'API'));
	//         }
	//     });
	//     builder.addCase(fetchBook.rejected, (state) => {
	//         state.isLoadingViaAPI = false;
	//     });
	// },
})
export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions

export const thunkFunction = async (dispatch, getState) => {
	try {
		const res = await axios.get('http://localhost:4000/random-book')
		if (res.data && res.data.title && res.data.author) {
			dispatch(addBook(createBookWithId(res.data, 'API')))
		}
	} catch (error) {
		console.log('Error fetching random book', error)
	}
}


export const selectBooks = state => state.books
export const selectIsLoadingViaAPI = state => state.isLoadingViaAPI

export default booksSlice.reducer