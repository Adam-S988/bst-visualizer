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
          treeJson:
            typeof tree.treeJson === "string"
              ? JSON.parse(tree.treeJson)
              : tree.treeJson,
        }));
        setTrees(parsedTrees);
      })
      .catch((error) => {
        console.error("Error fetching tree data:", error);
      });
  }, []);

  const handleTreeSelect = (tree) => {
    console.log("Selected Tree:", tree);
    setSelectedTree(tree);
  };

  return (
    <div className="previous-trees-container app-container">
      <h2 className="title">Previous Trees</h2>

      <ul className="tree-list">
        {trees.map((tree) => (
          <li key={tree.id} className="tree-item">
            <button
              className="toggle-button"
              onClick={() => handleTreeSelect(tree)}
            >
              View Tree #{tree.id}
            </button>
          </li>
        ))}
      </ul>

      {selectedTree && (
        <div className="selected-tree-section">
          <h3 className="section-title">Selected Tree:</h3>
          <pre className="selected-tree-json">
            {JSON.stringify(selectedTree.treeJson, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default PreviousTrees;
