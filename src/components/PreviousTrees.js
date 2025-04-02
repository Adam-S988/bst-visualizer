import React, { useEffect, useState } from "react";
import { getPreviousTrees } from "../services/api";

const PreviousTrees = () => {
  const [trees, setTrees] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getPreviousTrees();
      setTrees(response.data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2>Previous Trees</h2>
      <ul>
        {trees.map((tree, index) => (
          <li key={index}>Numbers: {tree.numbers.join(", ")}</li>
        ))}
      </ul>
    </div>
  );
};

export default PreviousTrees;
