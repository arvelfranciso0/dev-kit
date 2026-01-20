import { memo } from "react";
import { Position } from "@xyflow/react";
import { LabeledHandle } from "@/components/labeled-handle";
import {
  DatabaseSchemaNode,
  DatabaseSchemaNodeHeader,
  DatabaseSchemaNodeBody,
  DatabaseSchemaTableRow,
  DatabaseSchemaTableCell,
} from "@/components/database-schema-node";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  KeyIcon,
  LinkIcon,
  InfoIcon,
  ShieldCheckIcon,
  ZapIcon,
} from "lucide-react";

export type DatabaseSchemaNodeData = {
  data: {
    label: string;
    tableNote?: string;
    schema: {
      title: string;
      type: string;
      pk: boolean;
      notNull: boolean;
      unique: boolean;
      increment: boolean;
      isForeignKey: boolean;
      note: string;
      tooltip: {
        default?: string;
        enum: string[];
        isNullable: boolean;
        rawType: string;
      };
    }[];
  };
};

const DatabaseSchema = memo(({ data }: DatabaseSchemaNodeData) => {
  return (
    <DatabaseSchemaNode className=" ">
      <DatabaseSchemaNodeHeader>
        <span className="text-sm font-bold">{data.label}</span>
        {data.tableNote && (
          <span className="text-[10px] font-normal opacity-70 line-clamp-1">
            {data.tableNote}
          </span>
        )}
      </DatabaseSchemaNodeHeader>

      <DatabaseSchemaNodeBody>
        {data.schema.map((entry) => (
          <DatabaseSchemaTableRow
            key={entry.title}
            className="group transition-colors"
          >
            {/* Left Cell: Handle + Field Name + PK Icon */}
            <DatabaseSchemaTableCell className="">
              <div className="flex items-center gap-1.5">
                <LabeledHandle
                  id={`${entry.title}-target`}
                  title={""} // Handle only
                  type="target"
                  position={Position.Left}
                  handleClassName="opacity-0 group-hover:opacity-100 w-1.5 h-1.5 bg-primary border-none"
                />
                <div className="flex items-center gap-1 ml-1">
                  {entry.pk && (
                    <KeyIcon className="w-3 h-3 text-yellow-500 fill-yellow-500/20" />
                  )}
                  {entry.isForeignKey && !entry.pk && (
                    <LinkIcon className="w-3 h-3 text-blue-400" />
                  )}
                  <span
                    className={`text-sm ${
                      entry.pk
                        ? "font-bold text-foreground"
                        : "font-medium text-muted-foreground"
                    }`}
                  >
                    {entry.title}
                    {entry.notNull && (
                      <span className="text-destructive ml-0.5">*</span>
                    )}
                  </span>
                </div>
              </div>
            </DatabaseSchemaTableCell>

            {/* Right Cell: Type + Tooltip Trigger */}
            <DatabaseSchemaTableCell className="pr-0 py-1 font-mono text-xs text-right uppercase tracking-tighter italic">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-help flex items-center justify-end gap-1.5 px-3">
                    <span className="opacity-60 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {entry.type}
                    </span>
                    <LabeledHandle
                      id={`${entry.title}-source`}
                      title={""}
                      type="source"
                      position={Position.Right}
                      className="p-0 border-none bg-transparent"
                      handleClassName="opacity-0 group-hover:opacity-100 w-1.5 h-1.5 bg-primary border-none"
                    />
                    {entry.note && (
                      <InfoIcon className="w-3 h-3 text-primary opacity-40 group-hover:opacity-100" />
                    )}
                  </div>
                </TooltipTrigger>

                <TooltipContent
                  side="right"
                  align="start"
                  className="w-60 p-0 overflow-hidden shadow-2xl border-zinc-800 bg-zinc-950 text-zinc-200"
                >
                  {/* Tooltip Header */}
                  <div className="bg-zinc-900 px-3 py-2.5">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[13px] font-bold text-white truncate">
                        {entry.title}
                      </span>
                      <code className="text-[10px] bg-zinc-800 px-1.5 py-0.5 rounded text-emerald-400 border border-emerald-500/20">
                        {entry.tooltip.rawType}
                      </code>
                    </div>
                    {entry.note && (
                      <p className="text-xs mt-1.5 text-zinc-400 leading-snug italic">
                        "{entry.note}"
                      </p>
                    )}
                  </div>

                  <Separator className="bg-zinc-800" />

                  <div className="p-2 grid grid-cols-2 gap-1">
                    <AttributeItem
                      icon={<ShieldCheckIcon className="w-3 h-3" />}
                      label="Unique"
                      active={entry.unique}
                    />
                    <AttributeItem
                      icon={<ZapIcon className="w-3 h-3" />}
                      label="Auto Inc"
                      active={entry.increment}
                    />
                  </div>

                  <Separator className="bg-zinc-800" />

                  {/* Enum Values */}
                  {entry.tooltip.enum.length > 0 && (
                    <>
                      <div className="px-3 py-1.5 text-sm font-bold text-zinc-500 uppercase bg-zinc-950">
                        Allowed Values
                      </div>
                      <ScrollArea
                        className={
                          entry.tooltip.enum.length > 5 ? "h-32" : "h-auto"
                        }
                      >
                        <div className="pb-2 px-1">
                          {entry.tooltip.enum.map((item, index) => (
                            <div
                              key={index}
                              className="px-2 py-1 flex items-center gap-2 hover:bg-zinc-900 rounded cursor-default"
                            >
                              <div className="h-1 w-1 rounded-full bg-emerald-500" />
                              <code className="text-xs font-mono text-emerald-400">
                                {item}
                              </code>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                      <Separator className="bg-zinc-800" />
                    </>
                  )}

                  {/* Detail Footer */}
                  <div className="p-3 space-y-2 bg-zinc-950 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Default Value</span>
                      <code className="text-amber-500 font-bold">
                        {entry.tooltip.default || "NULL"}
                      </code>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Nullable</span>
                      <span
                        className={
                          entry.tooltip.isNullable
                            ? "text-emerald-500"
                            : "text-destructive font-bold uppercase"
                        }
                      >
                        {entry.tooltip.isNullable ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </DatabaseSchemaTableCell>
          </DatabaseSchemaTableRow>
        ))}
      </DatabaseSchemaNodeBody>
    </DatabaseSchemaNode>
  );
});

const AttributeItem = ({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
}) => (
  <div
    className={`flex items-center gap-1.5 px-1.5 py-0.5 rounded ${
      active ? "text-white opacity-100" : "text-zinc-600 opacity-40"
    }`}
  >
    {icon}
    <span className="text-[10px] font-medium">{label}</span>
  </div>
);

export default DatabaseSchema;
