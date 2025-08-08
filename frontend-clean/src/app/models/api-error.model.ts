export interface ApiError {
  message: string;
  status?: number;
  error?: string;
  timestamp?: string;
  path?: string;
}
