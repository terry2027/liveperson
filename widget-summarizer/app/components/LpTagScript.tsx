'use client';

import Script from "next/script";
import React from "react";

const LpTagScript: React.FC = () => {
  return (
    <Script
      src="https://lpcdn.lpsnmedia.net/webagent/client-SDK.min.js"
      strategy="beforeInteractive"
      onLoad={() => {
        window.dispatchEvent(new CustomEvent('lpTagLoaded'));
      }}
    />
  );
};

export default LpTagScript;
