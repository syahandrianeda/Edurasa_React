// uiPreferenceSlice.ts

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UIPreferenceState {
  sabtuLibur: boolean;
  name:'isSabtuLibur',
  loaded:boolean
}

const initialState: UIPreferenceState = {
  sabtuLibur: true,
  name:'isSabtuLibur',
  loaded:true
};

const uiPreferenceSlice = createSlice({
  name: 'uiPreference',
  initialState,
  reducers: {
    setSabtuLibur(state, action: PayloadAction<boolean>) {
      state.sabtuLibur = action.payload;
    }
  }
});

export const { setSabtuLibur } = uiPreferenceSlice.actions;
export default uiPreferenceSlice.reducer;
