export function formatJSON(val: string, indent: number = 2): string {
  if (!val) return "";
  try {
    const obj = JSON.parse(val);
    return JSON.stringify(obj, null, indent);
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export function minifyJSON(val: string): string {
  if (!val) return "";
  try {
    const obj = JSON.parse(val);
    return JSON.stringify(obj);
  } catch (e: any) {
    throw new Error(e.message);
  }
}
