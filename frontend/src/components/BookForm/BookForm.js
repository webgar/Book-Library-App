import { useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import booksData from '../../data/books.json'
import { addBook, fetchBook } from '../../redux/slices/booksSlice'
import { setError } from '../../redux/slices/errorSlice'
import createBookWithId from '../../utils/createBookWithId'
import './BookForm.css'
const BookForm = () => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const dispatch = useDispatch()
	const handleSubmit = e => {
		e.preventDefault()
		if (title && author) {
			dispatch(addBook(createBookWithId({ title, author }, 'manual')))
			setTitle('')
			setAuthor('')
		} else {
			dispatch(setError('You must fill title and author!'))
		}
	}

	const handleAddRandomBook = () => {
		const randomIndex = Math.floor(Math.random() * booksData.length)
		const randomBook = booksData[randomIndex]
		const randomBookWithId = createBookWithId(randomBook, 'random')
		dispatch(addBook(randomBookWithId))
	}

	const handleAddRandomBookViaApi = async () => {
		try {
			setIsLoading(true)
			await dispatch(fetchBook('http://localhost:4000/random-book-delayed'))
		} finally {
			setIsLoading(false)
		}
	}
	return (
		<div className='app-block book-form'>
			<h2>Add a New Book</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor='title'>Title</label>
					<input
						type='text'
						id='title'
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor='author'>Author</label>
					<input
						type='text'
						id='author'
						value={author}
						onChange={e => setAuthor(e.target.value)}
					/>
				</div>
				<button type='submit'>Add Book</button>
				<button type='button' onClick={handleAddRandomBook}>
					Add Random
				</button>

				<button
					type='button'
					onClick={handleAddRandomBookViaApi}
					disabled={isLoading}
				>
					{isLoading ? (
						<>
							<span>Loading book...</span>
							<FaSpinner className='spinner' />
						</>
					) : (
						'Add random via API'
					)}
				</button>
			</form>
		</div>
	)
}

export default BookForm
