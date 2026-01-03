export interface JwtDecoded {
  header: any;
  payload: any;
  signature: string;
  isExpired: boolean;
  issuedAt?: Date;
  expiresAt?: Date;
}
