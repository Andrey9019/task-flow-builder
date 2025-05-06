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
  );
}
