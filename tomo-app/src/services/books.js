const fetchJson = async (url) => {
	const res = await fetch(url);
	if (!res.ok) throw new Error(`Failed to fetch ${url}`);
	return res.json();
};

export const fetchBooks = async () => {
	try {
		const resData = await fetchJson("http://localhost:3000/books");
		return resData || [];
	} catch (err) {
		console.log(err);
	}
};

export const fetchBookBySubject = async () => {
	const url = "http://localhost:3333/books/suggested-books";

	const response = await fetch(url);

	if (!response.ok) {
		throw new Error("Failed to fecth sugessted books");
	}

	const resData = await response.json();
	return resData || [];
};

export const searchForBook = async (input) => {
	const searchString = input.trim().replaceAll(" ", "+");
	const url = `https://openlibrary.org/search.json?q=${searchString}&limit=14`;

	try {
		const response = await fetch(url);
		const resData = await response.json();

		const result = resData.docs.map((item) => {
			const key = item.key.split("/").pop();
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
};

export const fetchBookData = async (bookId) => {
	const url = `http://localhost:3333/books/${bookId}`;

	try {
		return fetchJson(url);
	} catch (err) {
		console.log(err);
	}
};

export const fetchLibraryBooks = async () => {
	const url = `http://localhost:3333/my-library`;

	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error("Error fetching library");
		}

		const resData = await response.json();

		if (resData.length > 0) {
			const transformed = resData.map((item) => ({
				id: item.volume_id,
				coverUrl: item.coverUrl,
				title: item.title,
			}));
			return transformed;
		}
		return resData || [];
	} catch (err) {
		console.log(err);
	}
};

export const addBookToLibary = async ({ bookData, signal }) => {
	const url = `http://localhost:3333/my-library/add-book`;

	const bookToAdd = {
		title: bookData.title,
		volume_id: bookData.id,
		coverUrl: bookData.coverUrl,
	};

	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(bookToAdd),
		signal,
	});

	if (!response.ok) {
		throw new Error("Failed to add book to libary");
	}

	const resData = await response.json();
	return resData;
};

export const deleteBookFromLibary = async (bookId) => {
  const url = `http://localhost:3333/my-library/delete-book/${bookId}`;

  const response = await fetch(url, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete book");
  }

  const resData = await response.json();
  return resData;
};
