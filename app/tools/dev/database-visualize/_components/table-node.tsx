"use client";

import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

// Define the shape of our column data
interface Column {
  name: string;
  type: string;
}

export const TableNode = memo(
  ({ data }: { data: { label: string; columns: Column[] } }) => {
    return (
      <Card className="min-w-70 shadow-md border-2 border-border bg-popover hover:border-amber-500 hover:shadow-lg">
        <CardHeader className="p-3 border-b bg-muted/30">
          <CardTitle className="text-sm font-bold flex justify-between items-center">
            {data.label}
            <span className="text-[10px] text-muted-foreground font-mono px-1.5 py-0.5 rounded border bg-background">
              TABLE
            </span>
          </CardTitle>
        </CardHeader>

        <Table className="overflow-visible">
          <TableBody>
            {data.columns?.map((col) => (
              <TableRow
                key={col.name}
                className="relative  h-9 hover:bg-transparent border-none"
              >
                {/* Move Handles inside the first and last cells or a dedicated narrow cell */}
                <TableCell className="relative py-1 px-3 text-xs font-medium">
                  {/* Handle is now inside a TD, which is valid HTML */}
                  <Handle
                    type="target"
                    position={Position.Left}
                    id={`${col.name}-target`}
                    className="w-2 h-2 bg-primary! border-2 border-background"
                  />
                  {col.name}
                </TableCell>

                <TableCell className="relative text-sm text-muted-foreground text-right font-mono">
                  {col.type}
                  <Handle
                    type="source"
                    position={Position.Right}
                    id={`${col.name}-source`}
                    className="w-2 h-2 bg-primary! border-2 border-background"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    );
  }
);

TableNode.displayName = "TableNode";
