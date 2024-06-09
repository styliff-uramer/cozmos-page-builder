import { create } from "zustand";

export enum SiteStatusType {
  Ready = "ready",
  Loading = "loading",
}

export interface StateStatusState {
  siteStatus: SiteStatusType;
  setSiteStatus: (siteStatus: SiteStatusType) => void;
  isDragging: null | number;
  setIsDragging: (isDragging: null | number) => void;
}

const useSiteStatusStore = create<StateStatusState>((set) => ({
  siteStatus: SiteStatusType.Ready,
  setSiteStatus: (siteStatus: SiteStatusType) => set({ siteStatus }),
  isDragging: null,
  setIsDragging: (isDragging: null | number) => set({ isDragging }),
}));

export default useSiteStatusStore;
