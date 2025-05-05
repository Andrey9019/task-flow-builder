import { loadFromLocalStorage } from "../utils/localStore";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Edge,
  EdgeChange,
  applyEdgeChanges,
  addEdge as addEdgeFn,
  Connection,
} from "@xyflow/react";

const { edges: loadedEdges } = loadFromLocalStorage();
const initialState: Edge[] = loadedEdges;

const edgesSlice = createSlice({
  name: "edges",
  initialState,
  reducers: {
    // встановлення звязків
    setInitialEdges: (_, action: PayloadAction<Edge[]>) => {
      return action.payload;
    },
    // оновлення звязків

    updateEdges: (state, action: PayloadAction<EdgeChange[]>) => {
      return applyEdgeChanges(action.payload, state);
    },
    // додати новий звязок

    addEdge: (state, action: PayloadAction<Connection>) => {
      return addEdgeFn(action.payload, state);
    },
  },
});

export const { setInitialEdges, updateEdges, addEdge } = edgesSlice.actions;
export default edgesSlice.reducer;
