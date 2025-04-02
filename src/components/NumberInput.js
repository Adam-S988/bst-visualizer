import React, { useState } from "react";
import { processNumbers } from "../services/api";

const NumberInput = ({ onBSTCreated }) => {
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const numbers = input.split(",").map((num) => parseInt(num.trim(), 10));
    const response = await processNumbers(numbers);
    onBSTCreated(response.data);
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
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default NumberInput;
