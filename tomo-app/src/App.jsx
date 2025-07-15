import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import MainPage from './pages/MainPage';
import BookPage from './pages/BookPage';
import MyLibraryPage from './pages/MyLibraryPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />}/>
        <Route path="/book/:id" element={<BookPage />} />
        <Route path='/my-lib' element={<MyLibraryPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
