import { useState, FormEvent, FC } from "react";
import Textarea from "./Textarea";
import Card from "./Card";
interface CreateNote {
  newNote: (value: string) => void;
}

const NewNote: FC<CreateNote> = ({ newNote }) => {
  const [note, setNote] = useState<string>("");

  const addNote = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    newNote(note);
    setNote("");
  };

  return (
    <Card>
      <div>
        <form onSubmit={addNote}>
          <Textarea
            label="Add note"
            id="note"
            onChange={setNote}
            value={note}
          />
          <button className="bg-white border hover:bg-slate-300 text-black font-semibold py-2 px-4 rounded">
            Add
          </button>
        </form>
      </div>
    </Card>
  );
};

export default NewNote;
