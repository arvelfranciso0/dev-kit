import dagre from "dagre";
import { Parser } from "@dbml/core";
import { Edge, Node } from "@xyflow/react";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 250;
const nodeHeight = 200;

type DBMLTable = {
  name: string;
  fields: any[];
};

export function parseDbmlToFlow(dbml: string): {
  nodes: Node[];
  edges: Edge[];
} {
  if (!dbml || !dbml.trim()) {
    console.log("Error");
    return { nodes: [], edges: [] };
  }

  try {
    const db = Parser.parse(dbml, "dbml") as any;
    const schema = db.schemas?.[0];
    if (!schema) return { nodes: [], edges: [] };

    const nodes: Node[] = schema.tables.map((table: any) => ({
      id: table.name,
      type: "databaseTable",
      data: {
        label: table.name,
        columns: (table.fields || []).map((col: any) => ({
          name: col.name,
          type: col.type?.type_name ?? "unknown",
          pk: col.pk || col.settings?.pk || false,
        })),
      },
      position: { x: 0, y: 0 },
    }));

    const edges: Edge[] =
      schema.refs?.map((ref: any, i: number) => {
        const [from, to] = ref.endpoints;
        return {
          id: `ref-${i}`,
          source: from.tableName,
          target: to.tableName,
          animated: true,
          style: { strokeWidth: 2 },
        };
      }) ?? [];

    return { nodes, edges };
  } catch (err: any) {
    // --- Fully safe error logging ---
    console.error("DBML parse error caught!");

    if (!err) {
      console.error("Error object is empty or null");
    } else if (typeof err === "string") {
      console.error("Error string:", err);
    } else if (err.message) {
      console.error("Error message:", err.message);
    } else if (err.diags && Array.isArray(err.diags)) {
      if (err.diags.length === 0) {
        console.error("Diagnostics array is empty");
      } else {
        err.diags.forEach((d: any, i: number) => {
          const line = d?.pos?.line ?? "?";
          const col = d?.pos?.col ?? "?";
          const msg = d?.msg ?? "No message";
          console.error(`Diag #${i}: Line ${line}, Col ${col} - ${msg}`);
        });
      }
    } else {
      console.error("Unknown error object:", JSON.stringify(err));
    }

    return { nodes: [], edges: [] };
  }
}

/* ------------------ DAGRE LAYOUT ------------------ */
export const getLayoutedElements = (
  nodes: any[],
  edges: any[],
  direction = "LR"
) => {
  // 'TB' (top to bottom) or 'LR' (left to right)
  dagreGraph.setGraph({ rankdir: direction, ranksep: 100, nodesep: 80 });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      // We shift the coordinates to align with React Flow's top-left anchoring
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
};
