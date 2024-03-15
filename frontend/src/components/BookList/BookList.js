import { useDispatch, useSelector } from 'react-redux'
import { deleteBook } from '../../redux/books/actionCreators'
import './BookList.css'
const BookList = () => {
	const books = useSelector(state => state.books)
	const dispatch = useDispatch()
	const handleDeleteClick = id => {
		dispatch(deleteBook(id))
	}
	return (
		<div className='app-block book-list'>
			<h2>Book List</h2>
			{books.length === 0 ? (
				<p>No books available</p>
			) : (
				<ul>
					{books.map((book, index) => (
						<li key={book.id}>
							<div className='book-info'>
								{++index}. {book.title} by <strong>{book.author}</strong>
							</div>
							<button
								onClick={() => handleDeleteClick(book.id)}
								className='book-actions'
							>
								Delete
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default BookList
