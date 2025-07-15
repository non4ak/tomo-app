import { useEffect, useState } from "react";

export const useFetchBook = (fetchFn, init) => {
    const [fetchedData, setFetchedData] = useState(init);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState();

    useEffect(() => {
        async function fetchData() {
            setLoading(true);

            try {
                const data = await fetchFn();
                setFetchedData(data);
            } catch (err) {
                console.log(err);
                setError({ message: err.message || 'Failed to fetch data'});
            }

            setLoading(false);
        }

        fetchData();
    }, [fetchFn]);

    return {
        loading, 
        error, 
        setFetchedData, 
        fetchedData,
    }
}



