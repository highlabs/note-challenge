import { useEffect, useContext, useState, useRef, KeyboardEvent } from "react";
import { useParams } from "react-router";
import type { User } from "../utils/types";
import Context from "../state";
import Textarea from "../components/Textarea";
import useCaretPosition from "../utils/useCaretPosition";
import Mentions from "../components/Mentions";
interface RouteParams {
  [key: string]: string | undefined;
  id: string;
}

const Note = () => {
  const { id, session } = useParams<RouteParams>();
  const { loadNote, loadUsers } = useContext(Context);
  const [currentNote, setCurrentNote] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [showMentions, setShowMetions] = useState<boolean>(false);
  const [persons, setPersons] = useState<User[]>([]);
  const [mention, setMention] = useState<string>("");
  const [mentionStart, setMentionStart] = useState<number | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { caretPosition, getCaretPosition } = useCaretPosition(inputRef);

  useEffect(() => {
    getCurrentNote();
    getPossiblyMentions();
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

  const getPossiblyMentions = async () => {
    if (!session?.length || !id?.length) return;

    const resUsers = await loadUsers();
    setPersons(resUsers);
  };

  const saveNote = () => {
    console.log("save");
  };

  const handleChange = (value: string) => {
    setCurrentNote(value);

    if (!value.length) return;
    handleMentions(value);
  };

  const handleMentions = (value: string) => {
    if (!inputRef.current) return;
    const start = inputRef.current.selectionStart;
    const end = inputRef.current.selectionEnd;
    const currentChar = value.charAt(start - 1);

    if (currentChar === " ") {
      setShowMetions(false);
      setMention("");
      return;
    }

    if (currentChar === "@") {
      setMentionStart(start);
      getCaretPosition();
      setMention("");
      setShowMetions(true);
    }

    if (mentionStart === null) return;

    setMention(value.substring(mentionStart, end));
  };

  const handleKeyup = (event: KeyboardEvent) => {
    const keyEvents = [
      "ArrowLeft",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown",
      "ArrowLeft",
      "Escape",
      "Enter",
    ];
    const isNotAChar = keyEvents.includes(event.code);
    if (isNotAChar) {
      setMention("");
      setShowMetions(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container h-full flex flex-col">
      <form onSubmit={saveNote} className="flex flex-col h-full relative">
        {showMentions && (
          <Mentions
            position={caretPosition}
            mention={mention}
            persons={persons}
          />
        )}

        <Textarea
          label="Add note"
          id="note"
          onChange={handleChange}
          value={currentNote}
          hideLabel
          noBorder
          ref={inputRef}
          onKeyUp={handleKeyup}
        />
      </form>
    </div>
  );
};

export default Note;
