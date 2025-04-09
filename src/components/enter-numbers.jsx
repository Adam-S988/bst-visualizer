import React, { useState } from "react";
import ProcessNumbers from "./process-numbers";

const parseTreeJson = (jsonString) => {
  try {
    if (typeof jsonString === "object") return jsonString;

    const parsed = JSON.parse(jsonString);

    if (!parsed || Object.keys(parsed).length === 0) {
      console.error("Received empty JSON object", parsed);
      return null;
    }

    if (!parsed.root) {
      console.error("Missing root node in tree data", parsed);
      return null;
    }

    return parsed;
  } catch (err) {
    console.error("Error parsing tree JSON:", err, jsonString);
    return null;
  }
};

const EnterNumbers = ({ onBSTCreated }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    // Clear any previous errors when input changes
    if (error) setError(null);
  };

  const handleProcessed = (data) => {
    setLoading(false);

    const parsedTree = parseTreeJson(data.treeJson);
    if (!parsedTree) {
      setError("Server returned invalid tree data format");
      onBSTCreated(null);
    } else {
      onBSTCreated({
        ...data,
        treeJson: JSON.stringify(parsedTree),
      });
    }
  };

  const handleProcessError = (errorMsg) => {
    setLoading(false);
    setError(errorMsg);
    onBSTCreated(null);
  };

  return (
    <div>
      <h2>Enter Numbers</h2>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="e.g. 10, 5, 20, 3, 7, 15, 25"
        />
        <ProcessNumbers
          inputValue={input}
          onProcessed={handleProcessed}
          onError={handleProcessError}
        />
      </div>
      {error && (
        <div style={{ color: "red", marginTop: "10px" }}>Error: {error}</div>
      )}
      <div style={{ marginTop: "10px", color: "gray" }}>
        <small>
          Enter numbers separated by commas. These will be converted to a
          balanced Binary Search Tree.
        </small>
      </div>
    </div>
  );
};

export default EnterNumbers;
