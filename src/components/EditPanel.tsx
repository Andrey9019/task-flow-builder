import { useEffect, useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { setSelectedNode } from "../store/selectedNodeSlice";
import { Panel, Node } from "@xyflow/react";
import { updateLabel } from "../store/nodesSlice";

interface EditPanelProps {
  selectedNode: Node | null;
}

export default function EditPanel({ selectedNode }: EditPanelProps) {
  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = useState<string>(
    selectedNode?.data?.label?.toString() || ""
  );

  useEffect(() => {
    setInputValue(selectedNode?.data?.label?.toString() || "");
  }, [selectedNode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (selectedNode) {
      dispatch(
        updateLabel({ nodesId: selectedNode.id, label: e.target.value })
      );
    }
  };

  return (
    <Panel
      position="top-right"
      className="border w-96 h-64 border-gray-200 bg-white shadow-md !m-8 p-6 flex flex-col rounded-2xl relative"
    >
      <h2 className="text-4xl font-semibold text-gray-700 text-center mb-2">
        Edit a task
      </h2>
      <button
        className="absolute bottom-3 right-3 bg-white border border-gray-300 hover:border-gray-500 text-gray-800 hover:text-black font-medium px-8 py-3 rounded-xl shadow-sm hover:shadow "
        onClick={() => dispatch(setSelectedNode(null))}
      >
        Close
      </button>

      <input
        type="text"
        onChange={handleInputChange}
        value={inputValue}
        className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:border-blue-500"
      />
    </Panel>
  );
}
