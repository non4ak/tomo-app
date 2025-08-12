import BackButton from "../components/UI/BackButton";
import Header from "../components/UI/Header";
import { useQuery, useMutation } from "@tanstack/react-query";
import BooksList from "../components/Library/BooksList";
import { fetchLibraryBooks, deleteBookFromLibary } from "../services/books";
import GoalSection from "../components/Library/GoalSection";
import { queryClient } from "../services/queryClient";
import { useState } from "react";
import Modal from "../components/UI/Modal";


export default function MyLibraryPage() {
    const [isDeleting, setIsDeleting] = useState(false);

	const { data, isPending, isError, error } = useQuery({
		queryKey: ["my-library-books"],
		queryFn: fetchLibraryBooks,
	});

    const { mutate } = useMutation({
        mutationFn: deleteBookFromLibary,
        onSuccess: () => queryClient.invalidateQueries(["my-library-books"]),
        onError: (err) => console.log('Failed to delete', err)
    })

    const handleDeleteBook = (bookId) => {
        mutate(bookId);
    }

    const handleStartDelete = () => {
        setIsDeleting(true);
    }

	return (
		<>
			<Header />
			<main>
				<BackButton />
				<section className="flex flex-col-reverse md:flex-row overflow">
					<BooksList books={data || []} onDelete={handleStartDelete} />
                    {/* <GoalSection /> */}
				</section>
			</main>
            {isDeleting && <Modal onDelete={handleDeleteBook} onClose={() => setIsDeleting(false)}/>}
		</>
	);
}
