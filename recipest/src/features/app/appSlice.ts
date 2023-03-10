import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

// Define a type for the slice state
interface AppState {
  navbarIsOpen: boolean;
}

// Define the initial state using that type
const initialState: AppState = {
  navbarIsOpen: false,
};

export const appSlice = createSlice({
  name: "app",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    openNavbar: (state) => {
      state.navbarIsOpen = true;
    },
    closeNavbar: (state) => {
      state.navbarIsOpen = false;
    },
  },
});

export const { openNavbar, closeNavbar } = appSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default appSlice.reducer;
