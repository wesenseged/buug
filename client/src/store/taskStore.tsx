import { create } from "zustand";

interface TaskState {
  //current date
  currentDate: () => Date;

  // tomorrow date
  tomorrow: () => Date;

  // tag to select from project
  type: string;
  handleType: (stats: string) => void;

  activeTask: number;
  inactiveTask: number;

  handleTaskNumber: (hour: number) => void;
}

const useTaskStore = create<TaskState>()((set, get) => ({
  // current date
  currentDate: () => {
    const today = new Date();
    return today;
  },

  // Tomorrow Date
  tomorrow: () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d;
  },

  // tag to select from project
  type: "",
  handleType: (stats) => {
    set({ type: stats });
  },
  activeTask: 0,
  inactiveTask: 0,

  handleTaskNumber: (hour) => {
    if (hour >= 0) {
      set({ activeTask: get().activeTask++ });
    } else {
      set({ activeTask: get().inactiveTask++ });
    }
  },
}));

export default useTaskStore;
