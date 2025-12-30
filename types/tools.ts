export interface Tool {
  title: string;
  desc: string;
  href: string;
  icon: React.ReactNode;
  status: "ready" | "soon" | string;
}
