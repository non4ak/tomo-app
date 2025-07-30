import { fetchBookBySubject } from "../../services/books.js";
import { useFetchBook } from "../../hooks/useFetchBook.js";
import BookCard from "../UI/BookCard.jsx";

export default function Highlights({ text }) {
    const { loading, fetchedData: suggestedBooks } = useFetchBook(fetchBookBySubject, []);

    console.log(loading)

    return (
        <section className="flex flex-col w-full px-12">
            <h3 className="text-2xl color-text font-sans tracking-wide">{text}</h3>
            <div className="flex p-4 gap-10 justify-center">
                {loading && suggestedBooks.length === 0 && <p className="text-xl">Loading...</p>}
                {!loading && suggestedBooks.length === 0 && <p className="text-xl">List is empty</p>}
                {suggestedBooks.length !== 0 && suggestedBooks.map((item, index) => (
                    <BookCard key={index} book={item} loading={loading}/>
                ))}
            </div>
        </section>
    )
}