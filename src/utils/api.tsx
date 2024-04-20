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
    const url = `${REACT_APP_API_URL}${sessionId}/notes`;
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
  async getNotes(sessionId: string): Promise<Note[]> {
    const url = `${REACT_APP_API_URL}${sessionId}/notes`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch notes: ${response.statusText}`);
    }
    const notes: Note[] = await response.json();
    return notes;
  },
};

export default API;
