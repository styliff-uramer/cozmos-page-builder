import { create } from "zustand";
// import { PageBuilderState, Item, MediaType } from "../types";
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
}

export interface PageBuilderState {
  items: Item[];
  removeById: (id: number) => void;
  addItem: (item: Item) => void;
  clearAll: () => void;
  editItem: (item: Item) => void;
}

// MediaType
const usePageBuilderStore = create<PageBuilderState>((set) => ({
  items: [
    {
      id: 1717795165069,
      position: new THREE.Vector3(0, 0, 0),
      rotation: new THREE.Vector3(0, 0, 0),
      type: MediaType.Image,
      texture: new THREE.TextureLoader().load("https://picsum.photos/200/300"),
      aspectRatio: 0.6666666666666666,
    },
  ],
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
}));

export default usePageBuilderStore;
