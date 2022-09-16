import { createSlice } from "@reduxjs/toolkit";
import { nice } from "d3";

export const areaSlice = createSlice({
  name: "area",
  initialState: { value: { name: null } },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { login } = areaSlice.actions;
export default areaSlice.reducer;
