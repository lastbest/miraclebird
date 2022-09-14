import { configureStore } from "@reduxjs/toolkit";
import areaReducer from "./area";
const store = configureStore({
  reducer: {
    area: areaReducer,
  },
});
//redux store
export default store;
