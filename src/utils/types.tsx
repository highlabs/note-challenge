export interface Note {
  id: string;
  content: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface NewNote {
  sessionId: string;
  noteId: string;
  noteContent: string;
}
