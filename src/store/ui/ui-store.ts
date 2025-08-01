import { create } from 'zustand';

interface InitialState {
  isSideMenuOpen:boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
}

export const useUiStore = create<InitialState>()((set) => ({
  isSideMenuOpen: false,
  openSideMenu:() => {
    set({isSideMenuOpen:true})
  },
  closeSideMenu: () => {
    set({isSideMenuOpen:false})
  }
}))