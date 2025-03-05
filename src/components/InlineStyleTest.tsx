"use client";

import React from "react";

const InlineStyleTest = () => {
  return (
    <div className="p-4 bg-surface-dark rounded-lg">
      <h2 className="text-white mb-4">Test Component</h2>
      <p style={{ color: "white", fontWeight: "bold" }}>
        This is a test paragraph with inline styles.
      </p>
      <div className="mt-4">
        <span style={{ color: "white !important" }}>
          This is a test span with !important.
        </span>
      </div>
    </div>
  );
};

export default InlineStyleTest;
