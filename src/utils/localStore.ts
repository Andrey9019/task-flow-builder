// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveToLocalStorage = (nodes: any[], edges: any[]) => {
  localStorage.setItem("nodes", JSON.stringify(nodes ?? []));
  localStorage.setItem("edges", JSON.stringify(edges ?? []));
};

export const loadFromLocalStorage = () => {
  const nodes = JSON.parse(localStorage.getItem("nodes") || "[]");
  const edges = JSON.parse(localStorage.getItem("edges") || "[]");
  return { nodes, edges };
};
