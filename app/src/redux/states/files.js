import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedFile: null,
  files: [],
};
export const filesSlice = createSlice({
  name: "files",
  initialState: initialState,
  reducers: {
    reset: () => ({ ...initialState }),
    setSelectedFile: (state, action) => {
      state.selectedFile = action.payload;
    },
    clearSelectedFile: (state) => {
      state.selectedFile = null;
    },
    addFile: (state, action) => {
      return {
        ...state.selectedFile,
        files: [...state.files, ...action.payload],
      };
    },
  },
});
export const { addFile, setSelectedFile, clearSelectedFile, reset } =
  filesSlice.actions;

export default filesSlice.reducer;
