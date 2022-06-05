/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Logger {
  log: (value: any) => void;
  info: (value: any) => void;
  success: (value: any) => void;
  error: (value: any) => void;
}
