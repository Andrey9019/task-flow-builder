import { loadFromLocalStorage } from "../utils/localStore";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Node, XYPosition } from "@xyflow/react";

interface UpdateLabel {
  nodesId: string;
  label: string;
}

const { nodes: loadedNodes } = loadFromLocalStorage();
const initialState: Node[] = loadedNodes;

export const nodesSlice = createSlice({
  name: "nodes",
  initialState,
  reducers: {
    setInitialNodes: (_, action: PayloadAction<Node[]>) => {
      return action.payload;
    },

    updateLabel: (state, action: PayloadAction<UpdateLabel>) => {
      const { nodesId, label } = action.payload;
      const node = state.find((node) => node.id === nodesId);
      if (node) {
        node.data = {
          ...node.data,
          label: label,
        };
      }
    },

    updatePosition: (
      state,
      action: PayloadAction<{ id: string; position: XYPosition }>
    ) => {
      const { id, position } = action.payload;
      const node = state.find((node) => node.id === id);
      if (node) {
        node.position = position;
      }
    },

    addNode: (state, action: PayloadAction<Node>) => {
      state.push(action.payload);
    },
  },
});

export const { updateLabel, addNode, updatePosition, setInitialNodes } =
  nodesSlice.actions;
export default nodesSlice.reducer;
