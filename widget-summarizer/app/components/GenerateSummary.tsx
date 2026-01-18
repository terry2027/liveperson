'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { SummaryDataType } from '../../types/global'; // Import SummaryDataType

// Define the props interface for GenerateSummary
interface GenerateSummaryProps {
  setSummaryData: React.Dispatch<React.SetStateAction<SummaryDataType>>;
}

// Define a placeholder for the path to data
// IMPORTANT: Replace 'some.path.to.data' with the actual path your SDK expects
const PATH_TO_DATA = 'some.path.to.data';

const GenerateSummary: React.FC<GenerateSummaryProps> = ({ setSummaryData }) => {
    const [sdkInitialized, setSdkInitialized] = useState(false);

    const initializeSdk = useCallback(async () => { // Made async
        if (sdkInitialized) {
            console.log("SDK already initialized.");
            return;
        }

        console.log("Attempting to initialize Agent Widget SDK...");
        if (typeof window.lpTag !== 'undefined' && window.lpTag.agentSDK) {
            try {
                window.lpTag.agentSDK.init({});
                setSdkInitialized(true);
                console.log("Agent Widget SDK Initialized.");

                // Now, call the function to get data
                console.log(`Attempting to get data from lpTag.agentSDK.get('${PATH_TO_DATA}')`);
                const data = await window.lpTag.agentSDK.get(PATH_TO_DATA);
                console.log("Data retrieved:", data);
                setSummaryData(data); // Update parent state with retrieved data
            } catch (error) {
                console.error("Error during SDK initialization or data retrieval:", error);
                setSummaryData({ error: (error as Error).message || "Failed to retrieve data" });
            }
        } else {
            console.error("lpTag.agentSDK not available. Check if the SDK script is correctly loaded and whitelisted.");
            setSummaryData({ error: "SDK not available" });
        }
    }, [sdkInitialized, setSummaryData]); // Add setSummaryData to dependencies

    useEffect(() => {
        const handleLpTagLoaded = () => {
            console.log("lpTagLoaded event received.");
            initializeSdk();
        };

        window.addEventListener('lpTagLoaded', handleLpTagLoaded);

        // Check if the script is already loaded when the component mounts
        if (typeof window.lpTag !== 'undefined' && window.lpTag.agentSDK) {
            setTimeout(() => {
                initializeSdk();
            }, 0);
        }

        return () => {
            window.removeEventListener('lpTagLoaded', handleLpTagLoaded);
        };
    }, [initializeSdk]);

    const handleGenerateSummary = () => {
        // Fallback to initialize on click if it hasn't been initialized yet.
        if (!sdkInitialized) {
            initializeSdk();
        }
        // You can add other logic here that should run on button click
        console.log("Generate Summary button clicked.");
    };

    return (
        <div className="flex justify-center items-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleGenerateSummary}>Generate Summary</button>
        </div>
    )
}

export default GenerateSummary;