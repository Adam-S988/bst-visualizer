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
    <div className="enter-numbers-container">
      <h2 className="section-title"></h2>
      <div className="input-wrapper">
        <input
          className="number-input"
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
      {error && <div className="error-message">⚠️ {error}</div>}
      <p className="input-hint">
        <small>
          Enter numbers separated by commas. These will be converted into a
          balanced Binary Search Tree.
        </small>
      </p>
    </div>
  );
};

export default EnterNumbers;
