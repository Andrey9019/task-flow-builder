import { useCallback, useEffect } from "react";
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
import "@xyflow/react/dist/style.css";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addNode, setInitialNodes, updatePosition } from "../store/nodesSlice";
import { setInitialEdges, updateEdges, addEdge } from "../store/edgesSlice";

import { nanoid } from "nanoid";
import { loadFromLocalStorage, saveToLocalStorage } from "../utils/localStore";

const nodeTypes = {
  taskNodes: TaskNode,
};

export default function FlowCanvas() {
  const nodes = useAppSelector((state) => state.nodes);
  const edges = useAppSelector((state) => state.edges);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const { nodes, edges } = loadFromLocalStorage();
    console.log(nodes, edges);
    dispatch(setInitialNodes(nodes));
    dispatch(setInitialEdges(edges));
  }, [dispatch]);

  useEffect(() => {
    saveToLocalStorage(nodes, edges);
  }, [nodes, edges]);

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

  return (
    <div className="w-full h-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <Controls />
        <Background gap={12} size={1} />
        <Panel position="top-center">
          <button onClick={handleAddNode} className="xy-theme__select">
            Add Task
          </button>
        </Panel>
      </ReactFlow>
    </div>
  );
}
