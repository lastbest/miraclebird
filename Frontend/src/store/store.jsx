import { configureStore } from "@reduxjs/toolkit";
import areaReducer from "./area";
import landmarkReducer from "./landmark";

const store = configureStore({
  reducer: {
    area: areaReducer,
    landmark: landmarkReducer,
  },
});
//redux store
export default store;
