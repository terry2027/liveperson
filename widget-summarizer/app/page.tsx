'use client'; // This is needed since useState is used
import { useState } from "react"; // Import useState
import GenerateSummary from "./components/GenerateSummary";
import SummaryWindow from "./components/SummaryWindow";
import { SummaryDataType } from "../types/global"; // Import SummaryDataType

export default function Home() {
  const [summaryData, setSummaryData] = useState<SummaryDataType>(null); // State to hold the data

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="font-bold">AI Summary Tool
      </h1>
      <GenerateSummary setSummaryData={setSummaryData} /> {/* Pass setter to GenerateSummary */}
      <SummaryWindow summaryData={summaryData} /> {/* Pass data to SummaryWindow */}
    </main>
  );
}
