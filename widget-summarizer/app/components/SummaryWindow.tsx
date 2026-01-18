'use client';
import React from 'react';

// Define the props interface for SummaryWindow
interface SummaryWindowProps {
  summaryData: string; // Using 'any' for flexibility, can be refined later
}

const SummaryWindow: React.FC<SummaryWindowProps> = ({ summaryData }) => {
  return (
    <main>
        <h1>This is a summary window</h1>
        <div id="response-window">
          {summaryData ? (
            // Display data, format it nicely if it's an object
            summaryData.error ? (
              <p className="text-red-500">Error: {summaryData.error}</p>
            ) : (
              <pre>{JSON.stringify(summaryData, null, 2)}</pre>
            )
          ) : (
            <p>No summary data yet. Click Generate Summary to retrieve data.</p>
          )}
        </div>
    </main>
  )
}

export default SummaryWindow