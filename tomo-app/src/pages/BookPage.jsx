import { useCallback } from "react";
import BackButton from "../components/BackButton";
import Header from "../components/Header";
import MainLayout from "../components/MainLayout";
import { useParams } from "react-router-dom";
import { fetchBookData } from "../services/books";
import { useFetchBook } from "../hooks/useFetchBook";
import ActiveButton from "../components/ActiveButton";
import { Library } from "lucide-react";
import BookCard from "../components/BookCard";


export default function BookPage() {
    const { id } = useParams();

    const fetchFn = useCallback(() => fetchBookData(id), [id]);

    const { fetchedData: bookData, error, loading } = useFetchBook(fetchFn, '');

        console.log(bookData);

    const coverId = Array.isArray(bookData.coverIds) ? bookData.coverIds[0] : null;
    const previewUrl = Array.isArray(bookData.previewUrls) && bookData.previewUrls.length > 0
        ? bookData.previewUrls[0]?.preview_url ?? null
        : null;

    if (!bookData) return <p>No data available.</p>;
    if (loading) return <div>Loading</div>;

    return (
        <>
            <Header />
            <MainLayout>
                <BackButton />
                <section className="flex px-24 w-full gap-12">
                    <div className="w-[30%] space-y-4">
                        <img
                            src={`https://covers.openlibrary.org/b/id/${coverId}-M.jpg`}
                            alt="book cover"
                            className="w-full h-auto object-contain p-4"
                        />
                        <a
                            href={previewUrl || "#"}
                            className="w-full color-text border-2 border-gray-300 shadow-md py-2 rounded-xl text-lg font-medium text-center block hover:underline transition-all duration-200"
                        >
                            Preview
                        </a>
                    </div>


                    <div className="text-lg flex flex-col font-sans w-[75%]">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-semibold">{bookData.title}</h1>
                            <p><span className="color-text font-semibold">Author:</span> {bookData.authors ?? 'N/A'}</p>
                            <p><span className="color-text font-semibold">Number of pages:</span> {bookData.numberOfPages ?? 'N/A'}</p>
                            <p><span className="color-text font-semibold">Published date:</span> {bookData.publishDate}</p>
                            <ActiveButton text='Add to library' Icon={Library} />
                        </div>
                        <div className="my-4">
                            <h2 className="text-xl mb-1 font-semibold color-text">Description</h2>
                            <p>{bookData.description}</p>
                        </div>
                    </div>
                </section>
                <div>
                    {bookData.editions.map((item) => (
                        <BookCard key={item.isbn} book={item} />
                    ))}
                </div>
            </MainLayout>
        </>

    )
}