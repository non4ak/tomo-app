const express = require('express');
const app = express();

const cors = require('cors');
const PORT = 3000;

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

const books = [
    {
        title: "The Divine Comedy",
        author: "Dante Alighieri",
        year: 1320
    },
    {
        title: "1984",
        author: "George Orwell",
        year: 1949
    },
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        year: 1960
    },
    {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        year: 1813
    },
    {
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        year: 1951
    }
];


app.get('/books', (req, res) => {
    res.json(books);
})


app.listen(PORT, () => {
  console.log(`SUCESS`);
});