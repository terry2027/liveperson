declare global {
  interface Window {
    lpTag: {
      agentSDK: {
        init: (options?: Record<string, unknown>) => void;
        get: (path: string) => Promise<SummaryDataType>;
      };
    };
  }
}

export type SummaryDataType = {
  error?: string;
  data?: string;
} | null;

