import { createSlice } from "@reduxjs/toolkit";
import { Node } from "@xyflow/react";

const initialState: Node | null = null;

export const selectedNodeSlice = createSlice({
  name: "selectedNode",
  initialState,
  reducers: {
    setSelectedNode: (_, action) => {
      return action.payload;
    },
  },
});

export const { setSelectedNode } = selectedNodeSlice.actions;
export default selectedNodeSlice.reducer;
