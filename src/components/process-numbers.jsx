import React, { useState } from "react";
import axios from "axios";

const ProcessNumbers = ({ inputValue, onProcessed, onError }) => {
  const [loading, setLoading] = useState(false);

  const processNumbers = async () => {
    setLoading(true);
    try {
      const parsedNumbers = inputValue
        .split(",")
        .map((num) => num.trim())
        .filter((num) => num !== "")
        .map((num) => parseInt(num, 10))
        .filter((num) => !isNaN(num));
      const numbers = parsedNumbers.filter((num) => !isNaN(num));

      if (numbers.length === 0) {
        throw new Error("Please enter valid numbers");
      }

      const response = await axios.post(
        "http://localhost:8080/api/bst/process-numbers",
        { numbers }
      );

      if (response.data && response.data.treeJson) {
        onProcessed(response.data);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      onError(error.message || "Failed to process numbers");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={processNumbers}
      className="process-button"
      disabled={loading}
    >
      {loading ? "Processing..." : "Process Numbers"}
    </button>
  );
};

export default ProcessNumbers;
