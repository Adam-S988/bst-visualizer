import React, { useEffect, useState } from "react";

const BSTVisualizer = ({ treeData }) => {
  const [formattedTree, setFormattedTree] = useState("");

  useEffect(() => {
    if (!treeData || !treeData.treeJson) {
      setFormattedTree("No valid tree data to display.");
      return;
    }

    try {
      const parsedJson =
        typeof treeData.treeJson === "string"
          ? JSON.parse(treeData.treeJson)
          : treeData.treeJson;

      setFormattedTree(JSON.stringify(parsedJson));
    } catch (err) {
      console.error("Failed to parse treeJson:", err);
      setFormattedTree("Error parsing tree data.");
    }
  }, [treeData]);

  return (
    <div
      style={{
        padding: "1rem",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
      }}
    >
      <h2>Binary Search Tree</h2>
      <pre
        style={{
          whiteSpace: "pre-wrap",
          fontFamily: "monospace",
          color: "#333",
        }}
      >
        {formattedTree}
      </pre>
    </div>
  );
};

export default BSTVisualizer;
