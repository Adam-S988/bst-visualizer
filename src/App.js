import React, { useState } from "react";
import BSTVisualizer from "./components/BSTVisualizer";
import PreviousTrees from "./components/previous-trees";
import EnterNumbers from "./components/enter-numbers";
import "./App.css";

const App = () => {
  const [treeData, setTreeData] = useState(null);
  const [showPreviousTrees, setShowPreviousTrees] = useState(false);

  const handleBSTCreated = (data) => {
    setTreeData(data);
  };

  return (
    <div>
      <div className="app-header">🌳 Binary Search Tree Visualizer</div>

      <div className="app-content">
        <div className="left-column">
          <div className="enter-numbers-container">
            <div className="section-title">🔢 Enter Numbers</div>
            <EnterNumbers onBSTCreated={handleBSTCreated} />
          </div>

          {treeData && (
            <div className="bst-visualizer-container">
              <div className="section-title">🧩 Binary Search Tree</div>
              <BSTVisualizer treeData={treeData} />
            </div>
          )}

          <button
            className="process-button"
            onClick={() => setShowPreviousTrees(!showPreviousTrees)}
          >
            {showPreviousTrees
              ? "⬆️ Hide Previous Trees"
              : "⬇️ Show Previous Trees"}
          </button>
        </div>

        <div className="right-column">
          {showPreviousTrees && (
            <div className="previous-trees-container">
              <div className="section-title">📜 Previous Trees</div>
              <PreviousTrees />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
