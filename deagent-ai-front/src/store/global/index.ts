import { create } from "zustand";

const initState = {
  initState: {},
  storeInitState: (val: any) => {},
};

export const useGlobalStore = create<typeof initState>((set: any) => ({
  initState: {},
  storeInitState: (initState: any) => set({ initState }),
}));
