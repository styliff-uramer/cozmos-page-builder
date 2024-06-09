import { create } from "zustand";

export enum SiteStatusType {
  Ready = "ready",
  Loading = "loading",
}

export interface StateStatusState {
  siteStatus: SiteStatusType;
  setSiteStatus: (siteStatus: SiteStatusType) => void;
}

const useSiteStatusStore = create<StateStatusState>((set) => ({
  siteStatus: SiteStatusType.Ready,
  setSiteStatus: (siteStatus: SiteStatusType) => set({ siteStatus }),
}));

export default useSiteStatusStore;
