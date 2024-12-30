import { create } from "zustand";

interface Font {
  value: string;
  label: string;
}

interface MainState {
  loading: boolean;
  isLoading: () => void;

  // Choose Options
  selectedTab: string;
  handleTab: (name: string) => void;

  // Close and Open Sidebar
  toggleMenu: boolean;
  handleToggle: () => void;

  // Fonts
  font: Font;
  handleFont: (value: string, label: string) => void;

  // Forground color
  forgColor: string;
  handleColor: (color: string) => void;

  // Dark and Light Theme
  toggleDark: boolean;
  handleDark: (theme: boolean) => void;

  // Amharic or English language
  toggleLanguage: boolean;
  handleLanguage: (lang: string) => void;
}

const useMainStore = create<MainState>()((set) => ({
  loading: true,
  isLoading: () => set({ loading: false }),

  // Choose Options
  selectedTab: "Tab",
  handleTab: (name) => {
    set({ selectedTab: name });
  },

  // Close and Open Sidebar
  toggleMenu: false,
  handleToggle: () => {
    set((state) => ({ toggleMenu: !state.toggleMenu }));
  },

  // Font
  font: { value: "font-Roboto", label: "Roboto" },
  handleFont: (value, label) => {
    set({ font: { value, label } });
  },

  // Forground color
  forgColor: "bg-[#5a189a]",
  handleColor: (color) => {
    set({ forgColor: color });
  },

  // Dark and Light Theme
  toggleDark: true,
  handleDark: (theme) => {
    set({ toggleDark: theme });
  },

  // Amharic or English language
  toggleLanguage: true,
  handleLanguage: (lang) => {
    if (lang == "English") {
      set({ toggleLanguage: true });
    }
    if (lang == "Amharic") {
      set({ toggleLanguage: false });
    }
  },
}));

export default useMainStore;
