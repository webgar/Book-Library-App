import { BsBookmarkStar, BsBookmarkStarFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import {
	deleteBook,
	selectBooks,
	toggleFavorite,
} from '../../redux/slices/booksSlice'
import {
	selectAuthorFilter,
	selectOnlyFavoriteFilter,
	selectTitleFilter,
} from '../../redux/slices/filterSlice'
import './BookList.css'
const BookList = () => {
	const books = useSelector(selectBooks)
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
	const highlightMatch = (text, filter) => {
		if (!filter) return text

		const regex = new RegExp(`(${filter})`, 'gi')

		return text.split(regex).map((substring, i) => {
			if (substring.toLowerCase() === filter.toLowerCase()) {
				return (
					<span key={i} className='highlight'>
						{substring}
					</span>
				)
			}
			return substring
		})
	}
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
								{++index}. {highlightMatch(book.title, titleFilter)} by{' '}
								<strong>{highlightMatch(book.author, authorFilter)}</strong> (
								{book.source})
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
