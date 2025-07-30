require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.GOOGLE_BOOKS_API_KEY

app.use(cors());

app.get('/suggested-books', async (req, res) => {
    const subject = req.query.subject || 'Classics';

    if (!subject) {
        return res.status(400).json({ error: 'Missing subject query parameter' });
    }

    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(subject)}&country=${'UA'}&maxResults=8&printType=books&key=${API_KEY}`);
        const resData = await response.json();

        const result = resData.items?.map(item => {
            return {
                id: item.id,
                title: item.volumeInfo.title || 'No title',
                coverUrl: item.volumeInfo.imageLinks.thumbnail || null
            }
        })

        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to fetch books' });
    }
})

const stripTags = (html) => {
    return html.replace(/<[^>]*>/g, '').trim();
};

app.get('/book/:id', async (req, res) => {
    const bookId = req.params.id;

    if (!bookId) {
        res.status(400).json({ error: 'Failed to fetch book. Missing id' })
    }

    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}?key=${API_KEY}`);
        const resData = await response.json();

        const rawDescription = resData.volumeInfo.description || 'No description';
        const description = stripTags(rawDescription);

        const result = {
            id: resData.id,
            title: resData.volumeInfo.title || 'No title',
            authors: resData.volumeInfo.authors || 'N/A',
            avgRating: resData.volumeInfo.averageRating || null,
            categories: resData.volumeInfo.categories || [],
            description: description,
            numberOfPages: resData.volumeInfo.pageCount || null,
            publishedDate: resData.volumeInfo.publishedDate || 'Unknown',
            coverUrl: resData.volumeInfo.imageLinks.thumbnail || null,
            previewUrl: resData.volumeInfo.previewLink || null
        }

        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to fetch book' })
    }
})

app.listen(PORT, () => {
    console.log('SUCESS', PORT);
})