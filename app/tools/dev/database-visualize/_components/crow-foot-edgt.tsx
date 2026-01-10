import { getBezierPath, Position, EdgeProps } from "@xyflow/react";
import { CSSProperties } from "react";
import React from "react";

interface CrowFootEdgeProps extends EdgeProps {
  markerStartType?: "one" | "many";
  markerEndType?: "one" | "many";
}
interface CrowFootEdgeProps {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  sourcePosition: Position;
  targetPosition: Position;
  style?: CSSProperties;
  markerStartType?: "one" | "many";
  markerEndType?: "one" | "many";
}

export const CrowFootEdge: React.FC<CrowFootEdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style,
  markerStartType = "one",
  markerEndType = "many",
}) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <>
      <defs>
        <marker
          id="crowfoot-many"
          markerWidth="12"
          markerHeight="12"
          refX="10"
          refY="6"
          orient="auto"
        >
          <path
            d="M0,1 L10,6 L0,11 M10,1 L10,11"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1.5"
          />
        </marker>
        <marker
          id="crowfoot-one"
          markerWidth="12"
          markerHeight="12"
          refX="5"
          refY="6"
          orient="auto"
        >
          <path d="M5,1 L5,11" fill="none" stroke="#94a3b8" strokeWidth="2" />
        </marker>
      </defs>

      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        style={style}
        markerStart={`url(#crowfoot-${markerStartType})`}
        markerEnd={`url(#crowfoot-${markerEndType})`}
      />
    </>
  );
};
