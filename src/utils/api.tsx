import type { Note, User } from "./types";

const { REACT_APP_API_URL } = process.env;

const API = {
  async createNote({
    sessionId,
    noteContent,
  }: {
    sessionId: string;
    noteContent: string;
  }): Promise<void> {
    const url = `${REACT_APP_API_URL}/${sessionId}/notes`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: noteContent,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to post note: ${response.statusText}`);
    }
  },

  async putNote({
    sessionId,
    noteId,
    noteContent,
  }: {
    sessionId: string;
    noteId: string;
    noteContent: string;
  }): Promise<void> {
    const url = `${REACT_APP_API_URL}/${sessionId}/notes/${noteId}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        noteId,
        body: noteContent,
      }),
    });
    if (!response.ok) {
      throw new Error(`Failed to update note: ${response.statusText}`);
    }
  },

  async getNotes(sessionId: string): Promise<Note[]> {
    const url = `${REACT_APP_API_URL}/${sessionId}/notes`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch notes: ${response.statusText}`);
    }
    const notes: Note[] = await response.json();
    return notes;
  },

  async getNoteById({
    sessionId,
    noteId,
  }: {
    sessionId: string;
    noteId: string;
  }): Promise<Note> {
    const url = `${REACT_APP_API_URL}/${sessionId}/notes/${noteId}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch note: ${response.statusText}`);
    }
    const note: Note = await response.json();
    return note;
  },

  async getUsers(): Promise<User[]> {
    const url = `${REACT_APP_API_URL}/users`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }
    const users: User[] = await response.json();
    return users;
  },
};

export default API;
