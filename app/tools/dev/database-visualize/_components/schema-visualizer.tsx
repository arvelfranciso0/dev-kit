import { Parser } from "@dbml/core";
import DatabaseSchema from "./database-schema";
import { useCallback, useEffect, useState } from "react";
import {
  Background,
  Controls,
  Edge,
  Node,
  OnEdgesChange,
  OnNodesChange,
  ReactFlow,
  applyNodeChanges,
  MarkerType,
  BezierEdge,
  applyEdgeChanges,
} from "@xyflow/react";
import Table from "@dbml/core/types/model_structure/table";
import Field from "@dbml/core/types/model_structure/field";
import Ref from "@dbml/core/types/model_structure/ref";
import "@xyflow/react/dist/style.css";
import Database from "@dbml/core/types/model_structure/database";
import { getLayoutedElements } from "@/lib/dbml-utils";
import EnumValue from "@dbml/core/types/model_structure/enumValue";
import { useTheme } from "next-themes";
import SkeletonPanel from "@/components/shared/skeleton-panel";
import CustomEdge from "./custom-edge";
import SvgMarker from "./crow-foot-edgt";
import { getCrowFootMarker } from "@/lib/utils";

type SchemaVisualizerProps = {
  parsedDatabase?: Database;
};

const nodeTypes = {
  databaseSchema: DatabaseSchema,
};
const edgeTypes = {
  custom: CustomEdge,
};

export default function SchemaVisualizer({
  parsedDatabase,
}: SchemaVisualizerProps) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  useEffect(() => {
    if (!parsedDatabase) return;
    const schemas = parsedDatabase.schemas[0];

    if (!schemas) return;

    const newNodes: Node[] = schemas.tables.map(
      (table: Table, index: number) => {
        const fields = table.fields;
        console.log("Table :", table);
        return {
          id: table.name,
          position: { x: index * 350, y: 50 },
          type: "databaseSchema",
          data: {
            label: table.name,
            tableNote: table.note ?? "",
            schema: fields.map((field: Field, index: number) => {
              const enumValues = field._enum?.values;
              return {
                title: field.name,
                type: field.type.type_name,
                notNull: field.not_null || false,
                unique: field.unique || false,
                increment: field.increment || false,
                note: field.note ?? "",
                isForeignKey: field.endpoints && field.endpoints.length > 0,
                tooltip: {
                  default: field.dbdefault?.value,
                  enum: enumValues?.map((item: EnumValue) => item.name) ?? [],
                  isNullable: !field.not_null,
                  rawType: field.type.type_name.toUpperCase(),
                },
              };
            }),
          },
        };
      }
    );
    const newEdges: Edge[] = schemas.refs.map((ref: Ref, index: number) => {
      const [from, to] = ref.endpoints;

      console.log(
        `markerStart ${getCrowFootMarker(from.relation)} From: ${
          from.relation
        },  -  markerEnd : ${getCrowFootMarker(to.relation)} To : ${
          to.relation
        }`
      );
      return {
        id: `e-${index}`,
        source: from.tableName,
        target: to.tableName,
        sourceHandle: `${from.fieldNames[0]}-source`,
        targetHandle: `${to.fieldNames[0]}-target`,
        type: "custom",
        markerStart: getCrowFootMarker(from.relation),
        markerEnd: getCrowFootMarker(to.relation),
      };
    });

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      newNodes,
      newEdges,
      "LR"
    );
    setEdges(layoutedEdges);
    setNodes(layoutedNodes);
  }, [parsedDatabase]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <SkeletonPanel />;
  return (
    <div className="w-full h-full border  bg-background text-foreground overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        edgeTypes={edgeTypes}
        colorMode={resolvedTheme === "dark" ? "dark" : "light"}
        fitView
      >
        <SvgMarker />
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
