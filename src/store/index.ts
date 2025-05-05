import { configureStore } from "@reduxjs/toolkit";
import nodesSlice from "./nodesSlice";
import edgesSlice from "./edgesSlice";
import selectedNodeSlice from "./selectedNodeSlice";

export const store = configureStore({
  reducer: {
    nodes: nodesSlice,
    edges: edgesSlice,
    selectedNode: selectedNodeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
