import { loadFromLocalStorage, saveToLocalStorage } from "../utils/localStore";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setInitialEdges } from "../store/edgesSlice";
import { useEffect } from "react";
import { setInitialNodes } from "../store/nodesSlice";

export default function useFlowLocalHost() {
  const nodes = useAppSelector((state) => state.nodes);
  const edges = useAppSelector((state) => state.edges);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const { nodes, edges } = loadFromLocalStorage();
    dispatch(setInitialNodes(nodes));
    dispatch(setInitialEdges(edges));
  }, [dispatch]);

  useEffect(() => {
    saveToLocalStorage(nodes, edges);
  }, [nodes, edges]);
}
