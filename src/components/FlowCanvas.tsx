import { ReactFlow, Controls, Background, Panel, Node } from "@xyflow/react";

import { TaskNode } from "./nodes/TaskNode";

import "@xyflow/react/dist/style.css";

import { useAppSelector } from "../store/hooks";
import { RootState } from "../store";

import useFlowLocalHost from "../hooks/useFlowLocalHost";
import { useFlowAction } from "../hooks/useFlowAction";
import EditPanel from "./EditPanel";

const nodeTypes = {
  taskNodes: TaskNode,
};

export default function FlowCanvas() {
  const nodes = useAppSelector((state) => state.nodes);
  const edges = useAppSelector((state) => state.edges);

  const selectedNode = useAppSelector(
    (state: RootState) => state.selectedNode
  ) as Node | null;

  // хук який зберігає в localhost та витягує з localhost
  useFlowLocalHost();

  // хук повертає дії з node (додати нову , перенести , додати звязок між node)
  const {
    onConnect,
    onNodesChange,
    onEdgesChange,
    handleAddNode,
    onNodeClick,
  } = useFlowAction();

  return (
    <div className="w-full h-screen bg-teal-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
      >
        <Controls position="center-left" />
        <Background gap={12} size={1} />
        <Panel position="top-left">
          <button
            onClick={handleAddNode}
            className="cursor-pointer bg-white border border-gray-300 hover:border-gray-500 text-gray-800 hover:text-black font-medium px-10 py-4 rounded-xl shadow-sm hover:shadow transition duration-200"
          >
            Add Task
          </button>
        </Panel>

        {selectedNode && <EditPanel selectedNode={selectedNode} />}
      </ReactFlow>
    </div>
  );
}
