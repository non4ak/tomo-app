import BookCard from "../UI/BookCard"

export default function BooksList({ books, onDelete }) {
    return (
        <div className="flex gap-12 flex-wrap justify-center lg:justify-normal ">
            {books.length === 0 && <p>Your library is Empty</p>}
            {books.map(item => (
                <BookCard key={item.id} book={item} type="library" onDelete={onDelete} />
            ))}
        </div>
    )
}