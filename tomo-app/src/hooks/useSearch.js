import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";
import { searchForBook } from "../services/books";

export const useSearch = (value = '', delay = 300) => {
    const [searchTerm, setSearchTerm] = useState(value);
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const debouncedSearchTerm = useDebounce(searchTerm, delay);

    useEffect(() => {
        const trimmedTerm = debouncedSearchTerm.trim();

        const search = async () => {
            setLoading(true);
            setError(null);

            try {
                const result = await searchForBook(trimmedTerm);
                if (!Array.isArray(result)) {
                    setSearchResult([])
                } else {
                    setSearchResult(result);
                }
            } catch (err) {
                setError('ERROR WHILE SEARCHING');
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        if (trimmedTerm !== '') {
            search();
        }
    }, [debouncedSearchTerm]);

    return {
        searchTerm,
        searchResult,
        setSearchTerm,
        loading,
        error
    }
}