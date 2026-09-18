export type TResponseCode =
  | "SUCCESS"
  | "VALIDATION_ERROR"
  | "INTERNAL_SERVER_ERROR"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND";

export interface IImage {
  path: string;
  public_id: string;
}
