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
    <div className="p-2 border">
      <Handle type="target" position={Position.Top} />
      <div>
        <input
          id="text"
          name="text"
          onChange={onChange}
          value={data.label}
          className="border px-2 py-1 rounded"
        />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" className="" />
    </div>
  );
}
