import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./pages/MainPage";
import BookPage, { loader as bookFetchLoader } from "./pages/BookPage";
import MyLibraryPage from "./pages/MyLibraryPage";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./services/queryClient";
import LibraryBookPage from "./pages/LibraryBookPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
    },
    {
      path: "/book/:id",
      element: <BookPage />,
      loader: bookFetchLoader,
    },
    {
      path: "/my-lib",
      element: <MyLibraryPage />,
    },
    {
      path: "my-lib/book/:id",
      element: <LibraryBookPage />,
    }
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
  
}

export default App;
