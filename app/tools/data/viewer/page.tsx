"use client";

import { useState, useMemo } from "react";
import { ToolHeader } from "@/components/shared/tool-header";
import { ActionPanel } from "@/components/shared/action-panel";
import {
  Eye,
  Table,
  TreeDeciduous,
  Info,
  Network,
  SearchCode,
  FileJson,
} from "lucide-react";
import { JsonView, defaultStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import { InfoSection } from "@/components/shared/info-section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DataTable from "./_components/data-table";
import { Textarea } from "@/components/ui/textarea";
import { CodeEditor } from "@/components/shared/code-mirror";

export default function DataViewer() {
  const [input, setInput] = useState("");
  const [viewMode, setViewMode] = useState("tree");

  const parsedData = useMemo(() => {
    try {
      return input ? JSON.parse(input) : null;
    } catch (e) {
      return { error: "Invalid JSON format" };
    }
  }, [input]);

  const isArrayOfObjects =
    Array.isArray(parsedData) &&
    parsedData.length > 0 &&
    typeof parsedData[0] === "object";

  // If user is on table mode but data changes to something non-tabular, switch back to tree
  const activeTab =
    viewMode === "table" && !isArrayOfObjects ? "tree" : viewMode;

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <ToolHeader
          title="Data Viewer"
          subtitle="Interactive Dataset Exploration"
          icon={<Eye />}
        />

        <Tabs value={activeTab} onValueChange={setViewMode} className="w-auto">
          <TabsList className="grid w-full grid-cols-2 h-11 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-1">
            <TabsTrigger
              value="tree"
              className="text-[10px] font-bold uppercase tracking-widest gap-2"
            >
              <TreeDeciduous size={14} /> Tree
            </TabsTrigger>
            <TabsTrigger
              value="table"
              disabled={!isArrayOfObjects}
              className="text-[10px] font-bold uppercase tracking-widest gap-2"
            >
              <Table size={14} /> Table
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* INPUT SOURCE */}
        <div className="lg:col-span-1">
          <ActionPanel
            label="Raw JSON Source"
            icon={<FileJson size={14} />}
            onReset={() => setInput("")}
            count={input.length}
          >
            <CodeEditor
              value={input}
              onChange={(e) => setInput(e)}
              containerClassName="h-162.5"
              editable
            />
          </ActionPanel>
        </div>

        {/* INTERACTIVE VIEWER */}
        <div className="lg:col-span-2">
          <ActionPanel
            icon={
              activeTab === "tree" ? (
                <TreeDeciduous size={14} />
              ) : (
                <Table size={14} />
              )
            }
            variant={"output"}
            label={`${activeTab.toUpperCase()} INSPECTOR`}
            headers={
              parsedData &&
              !parsedData.error && (
                <div className="flex gap-4 text-[10px] font-mono text-zinc-500">
                  <span>
                    Type: {Array.isArray(parsedData) ? "Array" : "Object"}
                  </span>
                  <span>
                    Size: {new TextEncoder().encode(input).length} bytes
                  </span>
                </div>
              )
            }
          >
            <div className="flex-1 overflow-auto p-4 h-162.5">
              {!parsedData ? (
                <div className="h-full flex items-center justify-center text-zinc-300 dark:text-zinc-800 italic text-sm">
                  Awaiting data input...
                </div>
              ) : parsedData?.error ? (
                <div className="h-full flex flex-col items-center justify-center text-rose-500 gap-2 opacity-50">
                  <Info size={24} />
                  <span className="text-[10px] font-bold uppercase tracking-tighter">
                    {parsedData.error}
                  </span>
                </div>
              ) : (
                <div className="h-full">
                  {activeTab === "tree" ? (
                    <div className="font-mono text-sm ">
                      <JsonView
                        data={parsedData}
                        shouldExpandNode={(level) => level < 2}
                        style={defaultStyles}
                      />
                    </div>
                  ) : (
                    <DataTable data={parsedData} />
                  )}
                </div>
              )}
            </div>
          </ActionPanel>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 border-t border-zinc-100 dark:border-zinc-800 pt-12">
        <InfoSection
          title="Visual Hierarchy"
          icon={SearchCode}
          description="Transform dense, minified JSON strings into a clean, collapsible tree structure. This interactive visualization allows you to quickly scan keys and values while maintaining a clear sense of data nesting and depth."
        />
        <InfoSection
          title="Schema Exploration"
          icon={Network}
          description="Designed for high-performance data navigation, the viewer helps you explore complex object schemas without getting lost. Instantly identify data types—such as arrays, booleans, and nulls—through syntax-aware color coding."
        />
      </div>
    </div>
  );
}
