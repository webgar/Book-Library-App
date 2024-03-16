import { BsBookmarkStar, BsBookmarkStarFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBook, toggleFavorite } from '../../redux/books/actionCreators'
import {
	selectAuthorFilter,
	selectTitleFilter,
	selectOnlyFavoriteFilter
} from '../../redux/slices/filterSlice'
import './BookList.css'
const BookList = () => {
	const books = useSelector(state => state.books)
	const titleFilter = useSelector(selectTitleFilter)
	const authorFilter = useSelector(selectAuthorFilter)
	const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter)
	const dispatch = useDispatch()
	const handleDeleteClick = id => {
		dispatch(deleteBook(id))
	}
	const handleToggleFavorite = id => {
		dispatch(toggleFavorite(id))
	}
	const filteredBooks = books.filter(book => {
		const matchesTitle = book.title
			.toLowerCase()
			.includes(titleFilter.toLowerCase())
		const matchesAuthor = book.author
			.toLowerCase()
			.includes(authorFilter.toLowerCase())
			const matchesFavorite = onlyFavoriteFilter ? book.isFavorite : true
		return matchesTitle && matchesAuthor && matchesFavorite
	})
	return (
		<div className='app-block book-list'>
			<h2>Book List</h2>
			{books.length === 0 ? (
				<p>No books available</p>
			) : (
				<ul>
					{filteredBooks.map((book, index) => (
						<li key={book.id}>
							<div className='book-info'>
								{++index}. {book.title} by <strong>{book.author}</strong>
							</div>
							<span onClick={() => handleToggleFavorite(book.id)}>
								{book.isFavorite ? (
									<BsBookmarkStarFill className='star-icon' />
								) : (
									<BsBookmarkStar className='star-icon' />
								)}
							</span>
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
