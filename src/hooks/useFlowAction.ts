import { useCallback } from "react";
import { updateEdges, addEdge } from "../store/edgesSlice";
import { addNode, updatePosition } from "../store/nodesSlice";
import { nanoid } from "nanoid";
import { Connection, Node, NodeChange, EdgeChange } from "@xyflow/react";
import { useAppDispatch } from "../store/hooks";
import { setSelectedNode } from "../store/selectedNodeSlice";

export const useFlowAction = () => {
  const dispatch = useAppDispatch();

  // додавання звязків
  const onConnect = useCallback(
    (params: Connection) => {
      dispatch(addEdge(params));
    },
    [dispatch]
  );

  // додавання нового node
  const handleAddNode = () => {
    const newNode: Node = {
      id: nanoid(),
      type: "taskNodes",
      data: { label: "New Task" },
      position: { x: 30, y: 30 },
    };
    dispatch(addNode(newNode));
  };

  // коли перетягую вузол — React Flow генерує NodeChange
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

  // при кліку на node зберігає його в Redux як selectedNode щоб зявилась зправа панель редагування інпуту.
  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      dispatch(setSelectedNode(node));
    },
    [dispatch]
  );

  // коли змінюється звязок оновлює Redux через updateEdges.
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      dispatch(updateEdges(changes));
    },
    [dispatch]
  );

  return {
    onConnect,
    handleAddNode,
    onNodeClick,
    onEdgesChange,
    onNodesChange,
  };
};
