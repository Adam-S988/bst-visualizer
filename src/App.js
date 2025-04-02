import React, { useState } from "react";
import NumberInput from "./components/NumberInput";
import BSTVisualizer from "./components/BSTVisualizer";
import PreviousTrees from "./components/PreviousTrees";

const App = () => {
  const [currentTree, setCurrentTree] = useState(null);

  return (
    <div>
      <h1>Binary Search Tree Visualizer</h1>
      <NumberInput onBSTCreated={setCurrentTree} />
      {currentTree && <BSTVisualizer treeJson={currentTree.treeJson} />}
      <PreviousTrees />
    </div>
  );
};

export default App;
