import React, { useState, useEffect } from "react";
import axios from "axios";

const PreviousTrees = () => {
  const [trees, setTrees] = useState([]);
  const [selectedTree, setSelectedTree] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/bst/previous-trees")
      .then((response) => {
        console.log("Fetched previous trees:", response.data);
        const parsedTrees = response.data.map((tree) => ({
          ...tree,
          treeJson: JSON.parse(tree.treeJson),
        }));
        setTrees(parsedTrees);
      })
      .catch((error) => {
        console.error("Error fetching tree data:", error);
      });
  }, []);

  const handleTreeSelect = (treeId) => {
    const tree = trees.find((tree) => tree.id === treeId);
    console.log("Selected Tree:", tree);
    setSelectedTree(tree);
  };

  return (
    <div>
      <h2>Previous Trees</h2>
      <ul>
        {trees.map((tree) => (
          <li key={tree.id} onClick={() => handleTreeSelect(tree.id)}>
            <button> Tree {tree.id} </button>
          </li>
        ))}
      </ul>

      {selectedTree && (
        <div>
          <h3>Selected Tree:</h3>
          <pre>{JSON.stringify(selectedTree.treeJson, null, 2)}</pre>{" "}
        </div>
      )}
    </div>
  );
};

export default PreviousTrees;
