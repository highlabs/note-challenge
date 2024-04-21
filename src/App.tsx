import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";

import HomePage from "./pages/Home";
import NotesPage from "./pages/Notes";
import NotePage from "./pages/Note";
import ErrorPage from "./pages/error-page";
import { NoteProvider } from "./state";

const RootLayout = () => (
  <div className="w-full h-full flex flex-col flex-grow overflow-hidden">
    <Header />
    <main role="main" className="w-full h-full flex-grow p-3 overflow-auto">
      <Outlet />
    </main>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
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
    ],
  },
]);

function App() {
  return (
    <NoteProvider>
      <RouterProvider router={router} />
    </NoteProvider>
  );
}

export default App;
