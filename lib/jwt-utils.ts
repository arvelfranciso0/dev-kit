import { JwtDecoded } from "@/types/jwt";

export function decodeJwt(token: string): JwtDecoded | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const base64UrlToObj = (str: string) => {
      const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(atob(base64));
    };

    const header = base64UrlToObj(parts[0]);
    const payload = base64UrlToObj(parts[1]);
    const signature = parts[2];

    const now = Math.floor(Date.now() / 1000);
    const isExpired = payload.exp ? payload.exp < now : false;

    return {
      header,
      payload,
      signature,
      isExpired,
      issuedAt: payload.iat ? new Date(payload.iat * 1000) : undefined,
      expiresAt: payload.exp ? new Date(payload.exp * 1000) : undefined,
    };
  } catch (e) {
    return null;
  }
}
