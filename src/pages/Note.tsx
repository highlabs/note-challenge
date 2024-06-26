import { useEffect, useContext, useState, useRef, KeyboardEvent } from "react";
import { useParams } from "react-router";
import type { Params } from "react-router-dom";
import type { User } from "../utils/types";
import Context from "../state";
import Textarea from "../components/Textarea";
import useCaretPosition from "../utils/useCaretPosition";
import Mentions from "../components/Mentions";

const Note = () => {
  const { id, session } = useParams<Params>();
  const { loadNote, loadUsers, putContent } = useContext(Context);
  const [currentNote, setCurrentNote] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [showMentions, setShowMetions] = useState<boolean>(false);
  const [persons, setPersons] = useState<User[]>([]);
  const [mention, setMention] = useState<string>("");
  const [mentionStart, setMentionStart] = useState<number | null>(null);
  const [dummyHeight, setDummyHeight] = useState<number | undefined>(undefined);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const dummyTextRef = useRef<HTMLDivElement>(null);
  const { caretPosition, getCaretPosition } = useCaretPosition(inputRef);

  useEffect(() => {
    getCurrentNote();
    getPossiblyMentions();
  }, []);

  useEffect(() => {
    const saveCurrentNote = setTimeout(() => {
      saveNote();
    }, 1000);
    return () => clearTimeout(saveCurrentNote);
  }, [currentNote]);

  useEffect(() => {
    setDummyHeight(dummyTextRef.current?.clientHeight);
  }, [dummyTextRef.current?.clientHeight]);

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

  const saveNote = async () => {
    if (!session?.length || !id?.length) return;
    setIsSaving(true);
    await putContent({
      sessionId: session,
      noteContent: currentNote,
      noteId: id,
    });
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
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

  const textWithMentions = () => {
    const parsedText = currentNote.split(/(@[^\s]+)/).map((part, index) => {
      if (part.startsWith("@")) {
        const personExist = persons.find(
          (person) => person.first_name === part.replace("@", "")
        );
        if (personExist) {
          return <span key={index}>{part}</span>;
        }
        return part;
      }
      return part;
    });
    return parsedText;
  };

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
        <div className="flex-grow absolute w-full h-full">
          <Textarea
            label="Add note"
            id="note"
            onChange={handleChange}
            value={currentNote}
            hideLabel
            noBorder
            ref={inputRef}
            onKeyUp={handleKeyup}
            className="z-10 bg-transparent text-transparent caret-black absolute inset-0 overflow-hidden p-0"
            style={{
              height: `${dummyHeight}px`,
            }}
            onClick={closeMentionDropdown}
          />
        </div>
        <div
          className="z-0 parsed-text min-h-24"
          style={{
            whiteSpace: "preserve",
          }}
          ref={dummyTextRef}
        >
          {textWithMentions()}
        </div>
      </form>
      {isSaving && (
        <div className="fixed py-2 px-4 bottom-4 right-4 bg-white z-20 border rounded">
          <p>Saving...</p>
        </div>
      )}
    </div>
  );
};

export default Note;
