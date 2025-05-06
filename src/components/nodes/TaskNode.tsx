import React from "react";
import { useCallback } from "react";
import { Handle, Position } from "@xyflow/react";
import { useAppDispatch } from "../../store/hooks";
import { updateLabel } from "../../store/nodesSlice";

interface TaskNodeProps {
  id: string;
  data: {
    label: string;
  };
}

export function TaskNode({ id, data }: TaskNodeProps) {
  const dispatch = useAppDispatch();

  const onChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(updateLabel({ nodesId: id, label: evt.target.value }));
    },
    [dispatch, id]
  );

  return (
    <div className="p-3 bg-white border border-gray-300 rounded-xl shadow-sm hover:shadow-md">
      <Handle
        type="target"
        position={Position.Top}
        className="!w-1/5 !bg-teal-500 !border-0"
      />

      <input
        id="text"
        name="text"
        onChange={onChange}
        value={data.label}
        className="border border-gray-300 rounded-md px-3 py-1 w-full focus:outline-none focus:border-blue-500"
      />

      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        className="!w-1/5 !bg-teal-700 !border-0"
      />
    </div>
  );
}
