import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const BSTVisualizer = ({ treeData }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!treeData || !treeData.treeJson) {
      console.error("No valid tree data provided:", treeData);
      return;
    }

    let treeJson;
    try {
      treeJson =
        typeof treeData.treeJson === "string"
          ? JSON.parse(treeData.treeJson)
          : treeData.treeJson;

      console.log("Visualizing tree:", treeJson);

      if (!treeJson.root) {
        console.error("Tree data doesn't have a root node:", treeJson);
        return;
      }
    } catch (err) {
      console.error("Error parsing tree JSON in visualizer:", err);
      return;
    }

    const width = 500;
    const height = 400;
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(50,50)");

    const root = d3.hierarchy(treeJson.root);
    const treeLayout = d3.tree().size([width - 100, height - 100]);
    treeLayout(root);

    svg
      .selectAll("line")
      .data(root.links())
      .enter()
      .append("line")
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y)
      .attr("stroke", "black");

    svg
      .selectAll("circle")
      .data(root.descendants())
      .enter()
      .append("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", 15)
      .attr("fill", "steelblue");

    svg
      .selectAll("text")
      .data(root.descendants())
      .enter()
      .append("text")
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y + 5)
      .attr("text-anchor", "middle")
      .text((d) => d.data.value)
      .attr("fill", "white");
  }, [treeData]);

  return (
    <div>
      <h2>Binary Search Tree Visualization</h2>
      {!treeData ? (
        <p>No valid tree data to display</p>
      ) : (
        <svg ref={svgRef} width="500" height="400"></svg>
      )}
    </div>
  );
};

export default BSTVisualizer;
