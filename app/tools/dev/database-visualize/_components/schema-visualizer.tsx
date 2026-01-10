"use client";

import React, { useMemo, useEffect, useState, useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  Node,
  Edge,
  applyNodeChanges,
  applyEdgeChanges,
  OnNodesChange,
  OnEdgesChange,
} from "@xyflow/react";
import { Parser } from "@dbml/core";
import "@xyflow/react/dist/style.css";
import { TableNode } from "./table-node";
import { useDebounce } from "@/hooks/use-debounce";
import { useTheme } from "next-themes";
import SkeletonPanel from "@/components/shared/skeleton-panel";
import { getLayoutedElements } from "@/lib/dbml-utils";

const nodeTypes = { dbTable: TableNode };

interface SchemaVisualizerProps {
  dbmlString: string;
}

export default function SchemaVisualizer({
  dbmlString,
}: SchemaVisualizerProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 1. Manage nodes and edges in state so drag-and-drop works

  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const debounceDbml = useDebounce(dbmlString, 50);
  // 2. Handle Drag/Drop updates
  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  // 3. Update nodes only when DBML changes
  useEffect(() => {
    try {
      const parser = new Parser();
      const database = parser.parse(debounceDbml, "dbml");
      const currentSchema = database.schemas[0];

      //   console.log("Current Shceme", currentSchema.tables);
      if (!currentSchema) return;

      // Map DBML to React Flow Nodes
      const newNodes: Node[] = currentSchema.tables.map(
        (table: any, index: number) => {
          const columns = table.fields || [];

          return {
            id: table.name,
            type: "dbTable",
            // We only set position if the node doesn't exist yet
            position: { x: index * 350, y: 50 },
            data: {
              label: table.name,
              columns: columns.map((c: any) => ({
                name: c.name || "unknown",
                type: c.type?.type_name || "any",
              })),
            },
          };
        }
      );

      // Map DBML to React Flow Edges
      const newEdges: Edge[] = currentSchema.refs.map(
        (ref: any, index: number) => {
          const endpoint1 = ref.endpoints[0];
          const endpoint2 = ref.endpoints[1];

          const relation1 = endpoint1.relation;
          const relation2 = endpoint2.relation;

          const isOneToMany = relation1 === "1" && relation2 === "*";
          const isManyToOne = relation1 === "*" && relation2 === "1";
          const isManyToMany = relation1 === "*" && relation2 === "*";
          const isOneToOne = relation1 === "1" && relation2 === "1";

          // Determine arrow direction: always point toward the "many" side
          const sourceTable = isOneToMany
            ? endpoint1.tableName
            : endpoint2.tableName;
          const targetTable = isOneToMany
            ? endpoint2.tableName
            : endpoint1.tableName;

          const sourceHandle = isOneToMany
            ? `${endpoint1.fieldNames[0]}-source`
            : `${endpoint2.fieldNames[0]}-source`;
          const targetHandle = isOneToMany
            ? `${endpoint2.fieldNames[0]}-target`
            : `${endpoint1.fieldNames[0]}-target`;

          // Determine label
          const label = isManyToMany
            ? "M:M"
            : isOneToMany
            ? "1:M"
            : isManyToOne
            ? "M:1"
            : "1:1";

          return {
            id: `e-${index}`,
            source: sourceTable,
            target: targetTable,
            sourceHandle,
            targetHandle,
            animated: isManyToMany,
            markerEnd: {
              type: "arrowclosed",
              width: 20,
              height: 20,
              color: "#94a3b8",
            },
            style: {
              stroke: isManyToMany ? "#6366f1" : "#94a3b8",
              strokeWidth: 2,
            },
            label,
            labelStyle: { fill: "#94a3b8", fontWeight: 700, fontSize: 10 },
          };
        }
      );

      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(
          newNodes,
          newEdges,
          "LR" // Try 'TB' for a vertical hierarchy
        );

      // Merge logic: Keep existing positions if table names haven't changed
      setNodes(layoutedNodes);

      setEdges(layoutedEdges);
    } catch (e) {
      // Quietly fail while typing invalid DBML
    }
  }, [debounceDbml]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <SkeletonPanel />;

  return (
    <div className="w-full h-full border  bg-background text-foreground overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        // This class helps with some internal styling
        colorMode={resolvedTheme === "dark" ? "dark" : "light"}
      >
        <Background
          gap={20}
          /* Dynamic background dots based on theme */
          className="dark:bg-slate-950 bg-slate-50"
        />
        <Controls className="dark:bg-slate-900 dark:border-slate-800" />
      </ReactFlow>
    </div>
  );
}
