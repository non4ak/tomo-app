require("dotenv").config();
const express = require("express");
const cors = require("cors");

const booksRouter = require("./routes/books");
const libraryRouter = require("./routes/library");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/books", booksRouter);
app.use("/my-library", libraryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
