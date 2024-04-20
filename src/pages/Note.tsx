import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router";
import Context from "../state";
import Textarea from "../components/Textarea";

interface RouteParams {
  [key: string]: string | undefined;
  id: string;
}

const Note = () => {
  const { id, session } = useParams<RouteParams>();
  const { loadNote } = useContext(Context);
  const [currentNote, setCurrentNote] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getCurrentNote();
  }, []);

  const getCurrentNote = async () => {
    if (!session?.length || !id?.length) return;

    const resNote = await loadNote({
      sessionId: session,
      noteId: id,
    });
    setCurrentNote(resNote.body);
    setLoading(false);
  };

  const saveNote = () => {
    console.log("save");
  };

  const handleChange = (value: string) => {
    setCurrentNote(value);
  };

  if (loading) return <p>Loading...</p>;
  return (
    <div className="container h-full flex flex-col">
      <form onSubmit={saveNote} className="flex flex-col h-full relative">
        <Textarea
          label="Add note"
          id="note"
          onChange={handleChange}
          value={currentNote}
          hideLabel
          noBorder
        />
        <div>
          <button className="bg-white border hover:bg-slate-300 text-black font-semibold py-2 px-4 rounded">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default Note;
