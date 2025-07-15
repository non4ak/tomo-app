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
                coverUrl: item.cover_id ? `https://covers.openlibrary.org/b/id/${item.cover_id}-M.jpg` : null,
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

const getLegacyData = async (bookId) => {
    const url = `https://openlibrary.org/api/books?bibkeys=OLID:${bookId}&format=json&jscmd=data`;
    const json = await fetchJson(url);
    return json[`OLID:${bookId}`] || null;
};

const getBookData = async (bookId) => {
  const url = `https://openlibrary.org/books/${bookId}.json`;
  return fetchJson(url);
};

const getWorkData = async (workId) => {
    if (!workId) return null;
    const url = `https://openlibrary.org${workId}.json`;
    return fetchJson(url);
};

const getEditionsData = async (workId) => {
  if (!workId) return [];
  const url = `https://openlibrary.org${workId}/editions.json?limit=5`;
  const json = await fetchJson(url);
  return json.entries || [];
};


export const fetchBookData = async (bookId) => {
    const [bookData, legacyData] = await Promise.all([getBookData(bookId), getLegacyData(bookId)]);

    const workKey = bookData?.works?.[0]?.key;
    const [workData, editionsData] = await Promise.all([getWorkData(workKey), getEditionsData(workKey)]);    

    const authorName = legacyData?.authors?.[0]?.name || 'Unknown author';
    console.log(editionsData);

    const editions = editionsData.map(item => {
        const isbn = item?.isbn_13?.[0] || item?.isbn_10?.[0] || null;

        return {
            workKey: item?.works?.[0]?.key || null,
            edition_key: item?.key.split('/').pop(),
            isbn: isbn,
            title: item?.title || 'No title',
            coverUrl: isbn ? `https://covers.openlibrary.org/b/isbn/${isbn}-S.jpg` : null,
        }
    });

    return {
        title: bookData?.title || 'No title',
        authors: authorName,
        description: workData.description || 'No description available',
        numberOfPages: bookData?.number_of_pages || null,
        publishDate: bookData?.publish_date || null,
        coverIds: bookData?.covers || [],
        previewUrls: legacyData?.ebooks || [],
        editions: editions,
    };
};