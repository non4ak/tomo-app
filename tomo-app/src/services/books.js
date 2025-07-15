export const fetchBooks = async () => {
    try {
        const response = await fetch('http://localhost:3000/books');
        const resData = await response.json();
        return resData || [];
    } catch (err) {
        console.log(err);
    }
}

export const fetchBookBySubject = async () => {
    const url = `https://openlibrary.org/subjects/${'love'}.json?limit=8`;

    try {
        const response = await fetch(url);
        const resData = await response.json();

        const result = resData.works.map(item => {
            const key = item.key.split('/').pop();
            return {
                key,
                edition_key: item.cover_edition_key,
                title: item.title,
                coverUrl: item.cover_id
                    ? `https://covers.openlibrary.org/b/id/${item.cover_id}-M.jpg`
                    : null,
            }
        });

        return result;
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
        // const url = `https://openlibrary.org/works/${bookId}.json`;
        const url = `https://openlibrary.org/api/books?bibkeys=OLID:${bookId}&format=json&jscmd=data`;

        const response = await fetch(url);
        const resData = await response.json();
        
        const key = `OLID:${bookId}`;
        const bookData = resData[key];

        let author = bookData?.authors?.[0]?.name;

        console.log(url);

        // const authorKey = bookData?.authors?.[0]?.name;
        // if (authorKey) {
        //     const authorUrl = `https://openlibrary.org${authorKey}.json`;
        //     const authorResponse = await fetch(authorUrl);
        //     if (authorResponse.ok) {
        //         const authorData = await authorResponse.json();
        //         author = authorData?.personal_name;
        //     }
        // }

        return {
            work: bookData,
            author: author,
        };
    }
