import { create } from "zustand";
import * as THREE from "three";

export enum MediaType {
  Image = "image",
  Video = "video",
}

export interface Item {
  id: number;
  position: THREE.Vector3;
  rotation: THREE.Vector3;
  texture: THREE.Texture;
  type: MediaType;
  aspectRatio: number;
  filter: number;
}

export interface PageBuilderState {
  items: Item[];
  removeById: (id: number) => void;
  addItem: (item: Item) => void;
  clearAll: () => void;
  editItem: (item: Item) => void;
  populateFromStorage: (items: Item[]) => void;
}

const usePageBuilderStore = create<PageBuilderState>((set) => ({
  items: [],
  editItem: (item: Item) =>
    set((state) => ({
      items: state.items.map((i) => (i.id === item.id ? item : i)),
    })),
  addItem: (item: Item) => set((state) => ({ items: [...state.items, item] })),
  removeById: (id: number) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  clearAll: () => set({ items: [] }),
  populateFromStorage: (items: Item[]) => {
    if (items) {
      set({ items });
    }
  },
}));

export default usePageBuilderStore;
