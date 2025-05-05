import { useCallback, useEffect, useState } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  Panel,
  Connection,
  Node,
  NodeChange,
  EdgeChange,
} from "@xyflow/react";

import { TaskNode } from "./nodes/TaskNode";
import { nanoid } from "nanoid";
import "@xyflow/react/dist/style.css";

import {
  addNode,
  setInitialNodes,
  updateLabel,
  updatePosition,
} from "../store/nodesSlice";
import { setInitialEdges, updateEdges, addEdge } from "../store/edgesSlice";
import { setSelectedNode } from "../store/selectedNodeSlice";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RootState } from "../store";

import { loadFromLocalStorage, saveToLocalStorage } from "../utils/localStore";

const nodeTypes = {
  taskNodes: TaskNode,
};

export default function FlowCanvas() {
  const nodes = useAppSelector((state) => state.nodes);
  const edges = useAppSelector((state) => state.edges);

  const selectedNode = useAppSelector(
    (state: RootState) => state.selectedNode
  ) as Node | null;

  const [inputValue, setInputValue] = useState<string>(selectedNode?.data?.label?.toString() || "");

  const dispatch = useAppDispatch();

  useEffect(() => {
    const { nodes, edges } = loadFromLocalStorage();
    dispatch(setInitialNodes(nodes));
    dispatch(setInitialEdges(edges));
  }, [dispatch]);

  useEffect(() => {
    saveToLocalStorage(nodes, edges);
  }, [nodes, edges]);

  useEffect(() => {
    setInputValue(selectedNode?.data?.label?.toString() || "");
  }, [selectedNode]);

  const onConnect = useCallback(
    (params: Connection) => {
      dispatch(addEdge(params));
    },
    [dispatch]
  );

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      changes.forEach((change) => {
        if (change.type === "position" && change.position) {
          dispatch(
            updatePosition({ id: change.id, position: change.position })
          );
        }
      });
    },
    [dispatch]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      dispatch(updateEdges(changes));
    },
    [dispatch]
  );

  const handleAddNode = () => {
    const newNode: Node = {
      id: nanoid(),
      type: "taskNodes",
      data: { label: "New Task" },
      position: { x: 30, y: 30 },
    };
    dispatch(addNode(newNode));
  };

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      dispatch(setSelectedNode(node));
    },
    [dispatch]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (selectedNode) {
      dispatch(
        updateLabel({ nodesId: selectedNode.id, label: e.target.value })
      );
    }
  };

  return (
    <div className="w-full h-screen ">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
      >
        <Controls />
        <Background gap={12} size={1} />
        <Panel position="top-center">
          <button
            onClick={handleAddNode}
            className="xy-theme__select cursor-pointer"
          >
            Add Task
          </button>
        </Panel>

        {selectedNode && (
          <Panel
            position="top-right"
            className="border w-64 bg-gray-100 shadow-md m-5 p-4 h-48 flex flex-col rounded-3xl relative"
          >
            <h2 className="text-lg font-semibold text-center">Edit a task</h2>
            <button
              className="absolute bottom-3 right-3 text-gray-500 hover:text-black border rounded-full p-1"
              onClick={() => dispatch(setSelectedNode(null))}
            >
              Close
            </button>

            <input
              type="text"
              onChange={handleInputChange}
              value={inputValue}
              className="border px-2 py-1 rounded"
            />
          </Panel>
        )}
      </ReactFlow>
    </div>
  );
}
