import { InsertNote } from "@/types/note";
import { ChangeEvent } from "react";
import { create } from "zustand";

interface NoteState {
  // Save Notes from tanstack query
  notes: InsertNote | null;
  setNote: (full: InsertNote) => void;

  // Write Note Body
  writeNote: string;
  setWrite: (title: string) => void;

  // Create Note Title
  writeTitle: string;
  handleTitle: (e: ChangeEvent<HTMLInputElement>) => void;

  // Toggle full-screen
  noteFullScreen: boolean;
  handleNoteFullScreen: (full: boolean) => void;

  // get currentDate
  currentDate: () => string;

  // Download markdown file
  handleDownload: () => void;
}

const useNoteStore = create<NoteState>()((set, get) => ({
  // Save Notes from tanstack query
  notes: null,
  setNote: (full) => {
    set({ notes: full });
  },

  // Toggle full-screen
  noteFullScreen: false,
  handleNoteFullScreen: (full) => {
    set({ noteFullScreen: full });
  },

  // Write Note Body
  setWrite: (data) => {
    set({ writeNote: data });
  },
  writeNote: "",

  // Create Note Title
  writeTitle: "",
  handleTitle: (e) => {
    const note = e.target.value;
    set({ writeTitle: note });
  },

  // get currentDate
  currentDate: () => {
    const today = new Date();
    return today.toDateString();
  },

  // Download markdown file
  handleDownload: () => {
    // Create a Blob with the markdown content
    const blob = new Blob([get().writeNote], { type: "text/markdown" });
    // Generate a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.md"; // Filename for the downloaded file
    document.body.appendChild(a);
    a.click(); // Trigger the download
    document.body.removeChild(a); // Remove the anchor element
    URL.revokeObjectURL(url); // Free up memory
  },
}));

export default useNoteStore;
