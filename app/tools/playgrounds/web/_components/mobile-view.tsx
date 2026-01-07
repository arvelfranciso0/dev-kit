import { ActionPanel } from "@/components/shared/action-panel";
import { CodeEditor } from "@/components/shared/code-mirror";
import { PlaygroundProps } from "@/types/playground";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code2, FileCode, Layout, Type } from "lucide-react";
import PreviewArea from "./preview-area";

export default function MobileViewPlayground({
  html,
  css,
  js,
  srcDoc,
  setHtml,
  setCss,
  setJs,
  previewRef,
  isFullscreen,
  toggleFullscreen,
  handleReset,
}: PlaygroundProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:hidden">
      <div className="lg:col-span-4 space-y-6">
        <ActionPanel
          label="Editor"
          icon={<Code2 size={14} />}
          onReset={handleReset}
        >
          <div className="w-full h-160 flex flex-col rounded-b-2xl overflow-hidden ">
            <Tabs
              defaultValue="html"
              className="flex-1 flex flex-col overflow-hidden"
            >
              <div className="px-4 py-2 border-b  flex items-center justify-between shrink-0">
                <TabsList className="bg-transparent border-none gap-4">
                  <TabsTrigger
                    value="html"
                    className="text-zinc-400 data-[state=active]:text-amber-500"
                  >
                    <FileCode size={14} className="mr-2" /> HTML
                  </TabsTrigger>
                  <TabsTrigger
                    value="css"
                    className="text-zinc-400 data-[state=active]:text-sky-500"
                  >
                    <Layout size={14} className="mr-2" /> CSS
                  </TabsTrigger>
                  <TabsTrigger
                    value="js"
                    className="text-zinc-400 data-[state=active]:text-yellow-400"
                  >
                    <Type size={14} className="mr-2" /> JS
                  </TabsTrigger>
                </TabsList>
              </div>
              <div className="flex-1 overflow-hidden">
                <TabsContent
                  value="html"
                  className="h-full m-0 data-[state=active]:flex flex-col overflow-hidden"
                >
                  <CodeEditor
                    value={html}
                    onChange={(value) => setHtml(value)}
                    containerClassName="h-full flex-1"
                    editable
                    mode={"html"}
                  />
                </TabsContent>
                <TabsContent
                  value="css"
                  className="h-full m-0 data-[state=active]:flex flex-col overflow-hidden"
                >
                  <CodeEditor
                    value={css}
                    onChange={(value) => setCss(value)}
                    containerClassName="h-full flex-1"
                    editable
                    mode={"css"}
                  />
                </TabsContent>
                <TabsContent
                  value="js"
                  className="h-full m-0 data-[state=active]:flex flex-col overflow-hidden"
                >
                  <CodeEditor
                    value={js}
                    onChange={(value) => setJs(value)}
                    containerClassName="h-full flex-1"
                    editable
                    mode={"javascript"}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </ActionPanel>
      </div>
      <PreviewArea srcDoc={srcDoc} isMobile={true} />
    </div>
  );
}
