"use client";

import React, { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Textarea } from "@/components/ui/textarea";
import SchemaVisualizer from "./_components/schema-visualizer";
import { ExportSqlButton } from "./_components/export-sql-button";
import { ToolHeader } from "@/components/shared/tool-header";
import { BookOpen, CodeXml, Database as DBIcon } from "lucide-react";
import { CodeEditor } from "@/components/shared/code-mirror";
import { ActionPanel } from "@/components/shared/action-panel";
import { InfoSection } from "@/components/shared/info-section";
import { Parser } from "@dbml/core";
import Database from "@dbml/core/types/model_structure/database";

const INITIAL_DBML = `Table users {
  id integer [primary key]
  username varchar
  role varchar
  created_at timestamp
}

Table posts {
  id integer [primary key]
  title varchar
  body text [note: 'Content of the post']
  user_id integer [not null]
  status varchar
  created_at timestamp
}

Ref user_posts: posts.user_id > users.id
`;

export default function DBVisualizer() {
  const [dbml, setDbml] = useState(INITIAL_DBML);
  const [parsedDbml, setParsedDbml] = useState<Database>();

  useEffect(() => {
    try {
      const parser = new Parser();
      const database = parser.parse(dbml, "dbml");
      setParsedDbml(database);
    } catch (error) {
      console.log("Error", error);
    }
  }, [dbml]);

  return (
    <div className=" p-4 lg:p-8 space-y-4 w-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <ToolHeader
          title="DBML Visualizer"
          subtitle="Two-side GFM Editor"
          icon={<BookOpen />}
        />
      </div>

      <ResizablePanelGroup orientation="horizontal" className="grow">
        {/* Left Side: Editor */}
        <ResizablePanel defaultSize={30} minSize={20}>
          <ActionPanel
            label="DBML Input"
            variant="input"
            copyValue={dbml}
            headers={<ExportSqlButton dbmlString={dbml} />}
          >
            <CodeEditor
              editable
              value={dbml}
              onChange={(value) => setDbml(value)}
              className="h-174"
              mode={"sql"}
            />
          </ActionPanel>
        </ResizablePanel>

        <ResizableHandle withHandle className="border border-r-zinc-800" />

        {/* Right Side: Canvas Viewer */}
        <ResizablePanel defaultSize={70}>
          <SchemaVisualizer parsedDatabase={parsedDbml} />
        </ResizablePanel>
      </ResizablePanelGroup>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 border-t border-zinc-100 dark:border-zinc-800 pt-12">
        <InfoSection
          title="Interactive Schema Mapping"
          icon={DBIcon}
          description="Transform DBML syntax into interactive, draggable entity-relationship diagrams. Visualize table structures, primary keys, and complex foreign key constraints through a dynamic canvas that automatically manages layout and relationships."
        />
        <InfoSection
          title="Multi-Dialect SQL Export"
          icon={CodeXml}
          description="Bridge the gap between design and production. Convert your visualized schema into production-ready SQL statements for PostgreSQL, MySQL, or SQL Server with a single click, ensuring schema consistency across your entire development pipeline."
        />
      </div>
    </div>
  );
}
