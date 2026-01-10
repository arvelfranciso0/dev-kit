"use client";

import { Button } from "@/components/ui/button";
import { Download, Database as DbIcon } from "lucide-react";
import { exporter, Parser } from "@dbml/core";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ExportButtonProps {
  dbmlString: string;
}

export function ExportSqlButton({ dbmlString }: ExportButtonProps) {
  const handleExport = (dialect: "postgres" | "mysql" | "mssql") => {
    try {
      const sql = exporter.export(dbmlString, dialect);
      const blob = new Blob([sql], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `schema-${dialect}.sql`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex  items-center justify-between gap-2 font-bold  tracking-widest transition-all cursor-pointer"
        >
          <div className="flex items-center uppercase gap-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100">
            <Download size={12} />
            <span className="text-xs">Export</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleExport("postgres")}>
          PostgreSQL (.sql)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("mysql")}>
          MySQL (.sql)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("mssql")}>
          SQL Server (.sql)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
