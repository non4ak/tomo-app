const fetchJson = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}`);
    return res.json();
};

export const fetchBooks = async () => {
    try {
        const resData = await fetchJson('http://localhost:3000/books');
        return resData || [];
    } catch (err) {
        console.log(err);
    }
}

export const fetchBookBySubject = async () => {
    const url = 'http://localhost:3333/suggested-books';

    try {
        return fetchJson(url);
    } catch (err) {
        console.log(err);
    }
}

export const searchForBook = async (input) => {
    const searchString = input.trim().replaceAll(" ", "+");
    const url = `https://openlibrary.org/search.json?q=${searchString}&limit=14`;

    try {
        const response = await fetch(url);
        const resData = await response.json();

        const result = resData.docs.map(item => {
            const key = item.key.split('/').pop();
            return {
                key,
                edition_key: item.cover_edition_key,
                title: item.title,
                author: item.author_name,
                coverUrl: item.cover_i
                    ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`
                    : null,
            };
        });
        return result || [];
    } catch (err) {
        console.log(err);
    }
}


export const fetchBookData = async (bookId) => {
    const url = `http://localhost:3333/book/${bookId}`;
    
    try {
        return fetchJson(url);
    } catch (err) {
        console.log(err);
    }
};