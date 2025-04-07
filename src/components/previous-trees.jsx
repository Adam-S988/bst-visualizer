import React, { useState, useEffect } from "react";
import axios from "axios";

const PreviousTrees = () => {
  const [trees, setTrees] = useState([]);
  const [selectedTree, setSelectedTree] = useState(null);

  useEffect(() => {
    // Fetch previous trees from the backend
    axios
      .get("http://localhost:8080/api/bst/previous-trees")
      .then((response) => {
        console.log("Fetched previous trees:", response.data);
        // Assuming the backend returns an array of trees with treeJson as a string, so we parse it here
        const parsedTrees = response.data.map((tree) => ({
          ...tree,
          treeJson: JSON.parse(tree.treeJson), // Parse the treeJson string into an object
        }));
        setTrees(parsedTrees); // Store the fetched trees in state
      })
      .catch((error) => {
        console.error("Error fetching tree data:", error);
      });
  }, []);

  const handleTreeSelect = (treeId) => {
    const tree = trees.find((tree) => tree.id === treeId); // Find the tree by ID
    console.log("Selected Tree:", tree); // Log selected tree to debug
    setSelectedTree(tree); // Set the selected tree for visualization
  };

  return (
    <div>
      <h2>Previous Trees</h2>
      <ul>
        {trees.map((tree) => (
          <li key={tree.id} onClick={() => handleTreeSelect(tree.id)}>
            Tree {tree.id}
          </li>
        ))}
      </ul>

      {selectedTree && (
        <div>
          <h3>Selected Tree:</h3>
          <pre>{JSON.stringify(selectedTree.treeJson, null, 2)}</pre>{" "}
          {/* Display the treeJson object */}
        </div>
      )}
    </div>
  );
};

export default PreviousTrees;
