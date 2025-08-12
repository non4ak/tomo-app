import { Link } from "react-router-dom";
import { Star, X } from "lucide-react";

export default function BookCard({ book, type = "small" }) {
	const size = type === "small" ? "w-26" : "w-32";

	if (type === "library") {
		return (
			<div className="w-48 group relative cursor-pointer flex select-none">
				<Link to={`book/${book.id}`}>
					<img
						src={book.coverUrl}
						alt={`${book.title} book cover`}
						className="w-48 max-h-[290px] border-gray-200 border object-cover rounded transition-opacity duration-300 group-hover:opacity-60"
					/>
					<p className="text-xs sm:text-sm md:text-lg w-full p-2 text-center font-semibold">
						{book.title}
					</p>
				</Link>
				<button className="absolute top-2 left-2 p-1 rounded-full bg-white bg-opacity-75 transition-all duration-200">
					<Star
						size={20}
						className={`transition-colors duration-200`}
					/>
				</button>
			</div>
		);
	}

	return (
		<Link to={`/book/${book.id}`}>
			<div className={`${size} group relative cursor-pointer flex`}>
				<img
					src={book.coverUrl}
					alt={`${book.title} book cover`}
					className="w-full h-auto object-cover rounded transition-opacity duration-300 group-hover:opacity-50"
				/>
				<p className="text-xs sm:text-sm bg-black bg-opacity-60 text-white w-full pb-2 p-2 text-left font-bold absolute bottom-0 left-0 opacity-0 group-hover:opacity-70 transition-opacity duration-300">
					{book.title}
				</p>
			</div>
		</Link>
	);
}
