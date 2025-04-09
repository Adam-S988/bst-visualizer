import React from "react";
import axios from "axios";

const ProcessNumbers = ({ inputValue, onProcessed, onError }) => {
  const processNumbers = async () => {
    try {
      // Parse and validate the input
      const parsedNumbers = inputValue
        .split(",")
        .map((num) => parseInt(num.trim(), 10));
      const numbers = parsedNumbers.filter((num) => !isNaN(num));

      if (numbers.length === 0) {
        throw new Error("Please enter valid numbers");
      }

      console.log("Processing numbers:", numbers);

      const response = await axios.post(
        "http://localhost:8080/api/bst/process-numbers",
        { numbers }
      );

      console.log("Response from server:", response.data);

      if (response.data && response.data.treeJson) {
        onProcessed(response.data);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error processing numbers:", error);
      onError(error.message || "Failed to process numbers");
    }
  };

  return (
    <button onClick={processNumbers} className="process-button">
      Process Numbers
    </button>
  );
};

export default ProcessNumbers;
