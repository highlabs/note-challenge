export interface Note {
  id: string;
  body: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface NewNote {
  sessionId: string;
  noteContent: string;
}
