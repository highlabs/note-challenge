export interface Note {
  id: string;
  body: string;
}

export interface NoteParams {
  sessionId: string;
  noteId: string;
}

export interface User {
  birthdate: number;
  email: string;
  first_name: string;
  gender: string;
  last_name: string;
  phone_number: string;
  title: string;
  username: string;
  location: {
    city: string;
    postcode: number;
    state: string;
    street: string;
  };
}

export interface NewNote {
  sessionId: string;
  noteContent: string;
}
