import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import Context from "../state";

import NewNote from "../components/NewNote";

interface RouteParams {
  [key: string]: string | undefined;
  session: string;
}

const Notes = () => {
  const { notes, createNote } = useContext(Context);
  const { session } = useParams<RouteParams>();

  useEffect(() => {
    loadNotes();
  }, []);

  const addNote = (content: string) => {
    if (!session) {
      console.error("No session defined");
      return false;
    }

    if (!content.length) return false;

    createNote({
      sessionId: session,
      noteContent: content,
    });
  };

  const loadNotes = () => {
    if (notes.length === 0) {
      console.log("vazio");
    }
  };

  return (
    <div className="container">
      <h1 className="text-3xl mb-4">Your Notes</h1>
      <NewNote newNote={addNote} />
    </div>
  );
};

export default Notes;
