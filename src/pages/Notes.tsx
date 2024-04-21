import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import type { Params } from "react-router-dom";

import Context from "../state";

import NoteCard from "../components/NoteCard";
import NewNote from "../components/NewNote";

const Notes = () => {
  const { notes, createNote, loadNotes } = useContext(Context);
  const { session } = useParams<Params>();

  useEffect(() => {
    getNotes();
  }, []);

  const addNote = async (content: string) => {
    if (!session) {
      console.error("No session defined");
      return false;
    }

    if (!content.length) return false;

    await createNote({
      sessionId: session,
      noteContent: content,
    });
    getNotes();
  };

  const getNotes = () => {
    if (!session?.length) return false;
    loadNotes(session);
  };

  return (
    <div className="container">
      <h1 className="text-3xl mb-4">Your Notes</h1>
      <NewNote newNote={addNote} />
      <div className="my-4 grid-cols-1 grid gap-4 md:grid-cols-3">
        {notes?.map((item) => (
          <NoteCard
            key={item.id}
            body={item.body}
            link={`/${session}/${item.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Notes;
