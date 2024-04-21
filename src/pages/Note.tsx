import { useEffect, useContext, useState, useRef, KeyboardEvent } from "react";
import { useParams } from "react-router";
import type { User } from "../utils/types";
import Context from "../state";
import Textarea from "../components/Textarea";
import useCaretPosition from "../utils/useCaretPosition";
import Mentions from "../components/Mentions";
import useDebounce from "../utils/useDebounce";
interface RouteParams {
  [key: string]: string | undefined;
  id: string;
}

const Note = () => {
  const { id, session } = useParams<RouteParams>();
  const { loadNote, loadUsers, putContent } = useContext(Context);
  const [currentNote, setCurrentNote] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [showMentions, setShowMetions] = useState<boolean>(false);
  const [persons, setPersons] = useState<User[]>([]);
  const [mention, setMention] = useState<string>("");
  const [mentionStart, setMentionStart] = useState<number | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { caretPosition, getCaretPosition } = useCaretPosition(inputRef);
  const deboucedNote = useDebounce(currentNote, 3000);

  useEffect(() => {
    getCurrentNote();
    getPossiblyMentions();
  }, []);

  useEffect(() => saveNote(), [deboucedNote]);

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
    if (!session?.length || !id?.length) return;
    putContent({
      sessionId: session,
      noteContent: currentNote,
      noteId: id,
    });
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
      closeMentionDropdown();
      return;
    }

    if (currentChar === "@") {
      getCaretPosition();
      setMentionStart(start);
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
      closeMentionDropdown();
    }
  };

  const closeMentionDropdown = () => {
    setMention("");
    setShowMetions(false);
    setMentionStart(null);
  };

  const handleMention = (handle: string) => {
    if (mentionStart) {
      setCurrentNote(
        currentNote.slice(0, mentionStart) +
          handle +
          currentNote.slice(mentionStart + mention.length)
      );
      closeMentionDropdown();
    }
  };

  if (loading) return <p>Loading...</p>;

  const textWithMentions = currentNote
    .split(/(@[^\s]+)/)
    .map((part, index) =>
      part.startsWith("@") ? <span key={index}>{part}</span> : part
    );
  return (
    <div className="container h-full flex flex-col">
      <form onSubmit={saveNote} className="flex flex-col h-full relative opa">
        {showMentions && (
          <Mentions
            position={caretPosition}
            mention={mention}
            persons={persons}
            handleMention={handleMention}
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
          className="z-10 p-0 bg-transparent text-transparent caret-black"
        />
        <div
          className="absolute inset-0 z-0 parsed-text"
          style={{
            whiteSpace: "preserve",
          }}
        >
          {textWithMentions}
        </div>
      </form>
    </div>
  );
};

export default Note;
