// src/hooks/useLivePersonSdk.ts

import { useState, useEffect, useCallback } from 'react';

// Define the structure of lpTag and agentSDK for TypeScript
declare global {
  interface Window {
    lpTag: {
      agentSDK: {
        init: (config: { notificationCallback?: () => void }) => void;
        get: (path: string, success: (data: any) => void, error: (err: any) => void) => void;
      };
    };
  }
}

export function useLivePersonSdk() {
  const [isInitialized, setIsInitialized] = useState(false);

  // Effect to initialize the SDK once the component mounts
  useEffect(() => {
    // The SDK might take a moment to be available on the window object
    const initialize = () => {
      if (window.lpTag && window.lpTag.agentSDK) {
        try {
          window.lpTag.agentSDK.init({});
          setIsInitialized(true);
          console.log("Agent Widget SDK Initialized.");
        } catch (e) {
          console.error("Agent SDK initialization error:", e);
        }
      }
    };

    // Retry initialization a few times in case the script loads late
    const interval = setInterval(() => {
      if (window.lpTag?.agentSDK) {
        initialize();
        clearInterval(interval);
      }
    }, 500);

    const timeout = setTimeout(() => {
        clearInterval(interval);
        if(!isInitialized) {
            console.error("lpTag.agentSDK not available. Check if the SDK script is correctly loaded.");
        }
    }, 5000); // Stop trying after 5 seconds

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isInitialized]);

  /**
   * Retrieves the Conversation ID from the Agent Workspace SDK.
   * @returns {Promise<string>} The conversation ID.
   */
  const getConversationId = useCallback((): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!isInitialized) {
        return reject("Agent SDK not initialized.");
      }

      const pathToData = "chatInfo.rtSessionId";
      
      window.lpTag.agentSDK.get(
        pathToData,
        (data) => { // onSuccess
          if (data) {
            console.log("Successfully retrieved Conversation ID:", data);
            resolve(data);
          } else {
            reject("Conversation ID is not available.");
          }
        },
        (err) => { // onError
          console.error("Error retrieving Conversation ID:", err);
          reject("Error retrieving Conversation ID from SDK.");
        }
      );
    });
  }, [isInitialized]);

  return { isInitialized, getConversationId };
}
