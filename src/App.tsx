import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";

import HomePage from "./pages/Home";
import NotesPage from "./pages/Notes";
import NotePage from "./pages/Note";
import ErrorPage from "./pages/error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "notes",
    element: <NotesPage />,
  },
  {
    path: "notes/:id",
    element: <NotePage />,
  },
]);

function App() {
  return (
    <div>
      <div className="App">
        <Header />
      </div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
