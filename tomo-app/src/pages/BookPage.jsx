import { useCallback } from "react";
import BackButton from "../components/UI/BackButton";
import Header from "../components/UI/Header";
import { useParams } from "react-router-dom";
import { fetchBookData } from "../services/books";
import { useFetchBook } from "../hooks/useFetchBook";
import ActiveButton from "../components/UI/ActiveButton";
import { Library } from "lucide-react";
import RatingStars from "../components/BookPage/RatingStars"
import Description from "../components/UI/Description";


export default function BookPage() {
    const { id } = useParams();
    const fetchFn = useCallback(() => fetchBookData(id), [id]);
    const { fetchedData: bookData, error, loading } = useFetchBook(fetchFn, '');

    if (!bookData) return <p>No data available.</p>;
    if (loading) return <div>Loading</div>;

    return (
        <>
            <Header />
            <main>
                <BackButton />
                <section className="flex flex-col md:flex-row px-24 w-full gap-12">
                    <div className="w-full sm:w-[70%] md:w-[30%] space-y-4 select-none">
                        <img
                            src={bookData.coverUrl}
                            alt="book cover"
                            className="w-full h-auto object-contain p-4"
                        />
                        <a
                            href={bookData.previewUrl || "#"}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full color-text border-2 border-gray-300 shadow-md py-2 rounded-xl text-lg font-medium text-center block hover:underline transition-all duration-200"
                        >
                            Preview
                        </a>
                    </div>

                    <div className="text-lg flex flex-col font-sans w-full md:w-[75%]">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-semibold">{bookData.title}</h1>
                            <p><span className="color-text font-semibold">Author:</span> {bookData.authors ?? 'N/A'}</p>
                            <p><span className="color-text font-semibold">Number of pages:</span> {bookData.numberOfPages ?? 'N/A'}</p>
                            <p><span className="color-text font-semibold">Published date:</span> {bookData.publishedDate}</p>

                            {bookData.avgRating && <RatingStars rating={bookData.avgRating} />}
                            <ActiveButton text='Add to library' Icon={Library} />
                        </div>
                        <div className="my-4">
                            <h2 className="text-xl mb-1 font-semibold color-text">Description</h2>
                            <Description text={bookData.description} />
                        </div>
                    </div>
                </section>
                <div className="px-24">
                    <h3 className="color-text font-semibold text-xl">Categories</h3>
                    {bookData.categories.join(', ')}
                </div>
            </main>
        </>

    )
}