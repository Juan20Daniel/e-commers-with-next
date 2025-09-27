import { create } from 'zustand';

interface InitialState {
  isSideMenuOpen:boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
}

export const useSideMenuStore = create<InitialState>()((set) => ({
  isSideMenuOpen: false,
  openSideMenu:() => {
    set({isSideMenuOpen:true})
  },
  closeSideMenu: () => {
    set({isSideMenuOpen:false})
  }
}))