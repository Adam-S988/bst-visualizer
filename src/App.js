import React, { useState } from "react";
import BSTVisualizer from "./components/BSTVisualizer";
import PreviousTrees from "./components/previous-trees";
import EnterNumbers from "./components/enter-numbers";

const App = () => {
  const [treeData, setTreeData] = useState(null);
  const [showPreviousTrees, setShowPreviousTrees] = useState(false);

  const handleBSTCreated = (data) => {
    setTreeData(data);
  };

  return (
    <div>
      <h1>Binary Search Tree Visualizer</h1>
      <EnterNumbers onBSTCreated={handleBSTCreated} />
      {treeData && <BSTVisualizer treeData={treeData} />}
      <button onClick={() => setShowPreviousTrees(!showPreviousTrees)}>
        {showPreviousTrees ? "Hide Previous Trees" : "Show Previous Trees"}
      </button>

      {showPreviousTrees && <PreviousTrees />}
    </div>
  );
};

export default App;
