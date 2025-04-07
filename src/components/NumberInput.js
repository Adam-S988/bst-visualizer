import React, { useState } from "react";
import { processNumbers } from "../services/api";

const parseTreeJson = (jsonString) => {
  try {
    // If already an object, don't parse
    if (typeof jsonString === "object") return jsonString;

    const parsed = JSON.parse(jsonString);

    // Check if it's an empty object
    if (!parsed || Object.keys(parsed).length === 0) {
      console.error("Received empty JSON object", parsed);
      return null;
    }

    // Check if root exists
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

const NumberInput = ({ onBSTCreated }) => {
  const [input, setInput] = useState("4, 2, 7, 13");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const numbers = input.split(",").map((num) => parseInt(num.trim(), 10));

      // Filter out NaN values
      const validNumbers = numbers.filter((num) => !isNaN(num));

      if (validNumbers.length === 0) {
        throw new Error("Please enter valid numbers");
      }

      console.log("Submitting numbers:", validNumbers);

      const response = await processNumbers(validNumbers);
      console.log("Response data:", response.data);

      // Check if treeJson exists
      if (!response.data || !response.data.treeJson) {
        throw new Error("Server returned invalid response");
      }

      // Parse the tree JSON
      const parsedTree = parseTreeJson(response.data.treeJson);
      if (!parsedTree) {
        setError(
          "Server returned invalid tree data format. Check server logs for details."
        );
        onBSTCreated(null);
      } else {
        onBSTCreated({
          ...response.data,
          treeJson: JSON.stringify(parsedTree), // Ensure we're passing a string
        });
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "Failed to process numbers");
      onBSTCreated(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Enter Numbers</h2>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. 10, 5, 20, 3, 7, 15, 25"
        />
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Processing..." : "Submit"}
        </button>
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

export default NumberInput;
