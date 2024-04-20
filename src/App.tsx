import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";

import HomePage from "./pages/Home";
import NotesPage from "./pages/Notes";
import NotePage from "./pages/Note";
import ErrorPage from "./pages/error-page";
import { NoteProvider } from "./state";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:session/",
    element: <NotesPage />,
  },
  {
    path: "/:session/:id",
    element: <NotePage />,
  },
]);

function App() {
  return (
    <NoteProvider>
      <div className="App">
        <Header />
      </div>
      <RouterProvider router={router} />
    </NoteProvider>
  );
}

export default App;
