import { createContext, FC, useState, ReactNode } from "react";
import { Note, User, NewNote } from "../utils/types";
import api from "../utils/api";

type NoteContextType = {
  notes: Note[];
  users: User[];
  setNotes: (notes: Note[]) => void;
  createNote: ({ sessionId, noteContent }: NewNote) => Promise<void>;
};

const defaultState = {
  notes: [],
  users: [],
  setNotes: (notes: Note[]) => {},
  createNote: async ({ sessionId, noteContent }: NewNote) => {},
};

const NoteContext = createContext<NoteContextType>(defaultState);

interface NoteProviderProps {
  children: ReactNode;
}

export const NoteProvider: FC<NoteProviderProps> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  const createNote = async ({ sessionId, noteContent }: NewNote) => {
    try {
      await api.createNote({
        sessionId,
        noteContent,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <NoteContext.Provider
      value={{ ...defaultState, notes, setNotes, createNote }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteContext;
