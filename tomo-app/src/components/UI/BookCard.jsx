import { useNavigate } from 'react-router-dom';

export default function BookCard({ book, type = 'small' }) {
    const navigate = useNavigate();
    const size = type === 'small' ? 'w-26' : 'w-32';

    return (
        <div onClick={() => navigate(`/book/${book.id}`)} className={`${size} group relative cursor-pointer flex`} >
            <img
                src={book.coverUrl}
                alt={`${book.title} book cover`}
                className="w-full h-auto object-cover rounded transition-opacity duration-300 group-hover:opacity-50"
            />
            <p className="text-xs sm:text-sm bg-black bg-opacity-60 text-white w-full pb-2 p-2 text-left font-bold absolute bottom-0 left-0 opacity-0 group-hover:opacity-70 transition-opacity duration-300">{book.title}</p>
        </div>
    )
}