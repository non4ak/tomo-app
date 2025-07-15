import { useCallback } from "react";
import BackButton from "../components/BackButton";
import Header from "../components/Header";
import MainLayout from "../components/MainLayout";
import { useParams } from "react-router-dom";
import { fetchBookData } from "../services/books";
import { useFetchBook } from "../hooks/useFetchBook";


export default function BookPage() {
    const { id } = useParams();

    const fetchFn = useCallback(() => fetchBookData(id), [id]);

    const {fetchedData: bookData, error, loading} = useFetchBook(fetchFn, '');
    const coverId = Array.isArray(bookData?.work?.covers) ? bookData.work?.covers[0] : null;

    console.log(bookData);

    if (!bookData) return <p>No data available.</p>;
    if (loading) return <div>Loading</div>;

    return (
        <>
            <Header />
            <MainLayout>
                <BackButton />
                <section className="flex px-24 w-full gap-12">
                    <img 
                        src={bookData.work?.cover?.medium} 
                        alt="book cover"
                        className="w-64 h-auto object-contain"
                    />
                    <div>
                        <h1 className="text-2xl">{bookData.work.title}</h1>
                        <p className="text-xl">Author: {bookData.author ?? 'Unknown'}</p>
                        <p>Number of pages {bookData.work?.number_of_pages}</p>
                    </div>
                </section>
            </MainLayout>
        </>

    )
}