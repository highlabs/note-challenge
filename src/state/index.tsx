import { createContext, FC, useState, ReactNode } from "react";
import { Note, User, NewNote, NoteParams } from "../utils/types";
import api from "../utils/api";

type NoteContextType = {
  notes: Note[];
  users: User[];
  setNotes: (notes: Note[]) => void;
  createNote: ({ sessionId, noteContent }: NewNote) => Promise<void>;
  loadNotes: (sessionId: string) => Promise<void>;
  loadNote: ({ sessionId, noteId }: NoteParams) => Promise<Note>;
  loadUsers: () => Promise<User[]>;
  putContent: ({
    sessionId,
    noteId,
    noteContent,
  }: {
    sessionId: string;
    noteId: string;
    noteContent: string;
  }) => Promise<void>;
};

const defaultState = {
  notes: [],
  users: [],
  setNotes: (notes: Note[]) => {},
  createNote: async () => {},
  loadNotes: async () => {},
  loadNote: async () => {
    throw new Error("loadNote function not implemented");
  },
  loadUsers: async () => {
    throw new Error("loadUsers function not implemented");
  },
  putContent: async () => {
    throw new Error("putContent function not implemented");
  },
};

const NoteContext = createContext<NoteContextType>(defaultState);

interface NoteProviderProps {
  children: ReactNode;
}

export const NoteProvider: FC<NoteProviderProps> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  const createNote = async ({ sessionId, noteContent }: NewNote) => {
    await api.createNote({
      sessionId,
      noteContent,
    });
  };

  const loadNotes = async (sessionId: string) => {
    const res = await api.getNotes(sessionId);
    const sort = res.sort((a, b) => b.id - a.id);
    setNotes(sort);
  };

  const loadNote = async ({
    sessionId,
    noteId,
  }: {
    sessionId: string;
    noteId: string;
  }) => {
    const res = await api.getNoteById({ sessionId, noteId });
    return res;
  };

  const loadUsers = async () => {
    const res = await api.getUsers();
    return res;
  };

  const putContent = async ({
    sessionId,
    noteId,
    noteContent,
  }: {
    sessionId: string;
    noteId: string;
    noteContent: string;
  }) => {
    await api.putNote({ sessionId, noteId, noteContent });
  };

  return (
    <NoteContext.Provider
      value={{
        ...defaultState,
        notes,
        setNotes,
        createNote,
        loadNotes,
        loadNote,
        loadUsers,
        putContent,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteContext;
