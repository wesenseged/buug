import { create } from "zustand";
import { ChangeEvent } from "react";

interface ProjectState {
  currentDate: () => string;
  // Search
  search: string;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;

  status: string;
  handleStatus: (stats: string) => void;

  date: Date | null;
  handleDate: (day: Date) => void;

  viewType: string;
  handleView: (view: string) => void;

  open: boolean;
  setOpen: (value: boolean) => void;
}

const useProjectStore = create<ProjectState>()((set) => ({
  // current date
  currentDate: () => {
    const today = new Date();
    return today.toDateString();
  },

  // Status Picker
  status: "In Work",

  handleStatus: (stats) => {
    set({ status: stats.toUpperCase() });
  },

  // Day/Month Picker
  date: null,
  handleDate: (day) => {
    set({ date: day });
  },

  // Search
  search: "",
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => {
    set({ search: e.target.value });
  },
  viewType: "table",
  handleView: (view) => {
    set({ viewType: view });
  },

  open: false,
  setOpen: (value: boolean) => {
    set({ open: value });
  },
}));

export default useProjectStore;
