import { fetchBookBySubject } from "../../services/books.js";
import BookCard from "../UI/BookCard.jsx";
import { useQuery } from "@tanstack/react-query";

export default function Highlights({ text }) {
    const { data: suggestedBooks = [], isPending, isError, error} = useQuery({
        queryKey: ['suggested-books'],
        queryFn: fetchBookBySubject
    })

    console.log(suggestedBooks);
    
    return (
        <section className="flex flex-col w-full px-12">
            <h3 className="text-2xl color-text font-sans tracking-wide">{text}</h3>
            <div className="flex p-4 gap-10 justify-center">
                {isPending && suggestedBooks.length === 0 && <p className="text-xl">Loading...</p>}
                {!isPending && suggestedBooks.length === 0 && <p className="text-xl">List is empty</p>}
                {suggestedBooks.length !== 0 && suggestedBooks.map((item, index) => (
                    <BookCard key={index} book={item}/>
                ))}
            </div>
        </section>
    )
}