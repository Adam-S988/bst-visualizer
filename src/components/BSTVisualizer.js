import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const BSTVisualizer = ({ treeData }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!treeData || !treeData.treeJson) {
      console.error("No valid tree data provided:", treeData);
      return;
    }

    let parsedJson;
    try {
      // Make sure treeJson is a parsed object
      parsedJson =
        typeof treeData.treeJson === "string"
          ? JSON.parse(treeData.treeJson)
          : treeData.treeJson;

      console.log("Visualizing tree:", parsedJson);

      // Check if we have a valid root node
      if (!parsedJson.root) {
        console.error("Tree data doesn't have a root node:", parsedJson);
        return;
      }
    } catch (err) {
      console.error(
        "Error parsing tree JSON in visualizer:",
        err,
        treeData.treeJson
      );
      return;
    }

    const width = 600;
    const height = 400;
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},50)`);

    // Convert JSON into a hierarchical structure
    const root = d3.hierarchy(parsedJson.root);

    // Set fixed distance between levels
    const treeLayout = d3.tree().size([width - 100, height - 100]);
    treeLayout(root);

    // Draw links (lines)
    svg
      .selectAll("line")
      .data(root.links())
      .enter()
      .append("line")
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y)
      .attr("stroke", "black")
      .attr("stroke-width", 2);

    // Draw nodes (circles)
    const nodeGroups = svg
      .selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    nodeGroups
      .append("circle")
      .attr("r", 20)
      .attr("fill", "steelblue")
      .attr("stroke", "#000")
      .attr("stroke-width", 1);

    // Add text labels
    nodeGroups
      .append("text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .text((d) => d.data.value)
      .attr("fill", "white")
      .style("font-weight", "bold");

    // Add pretty formatted JSON view
    const jsonContainer = d3
      .select(svgRef.current.parentNode)
      .append("div")
      .attr("class", "json-view")
      .style("margin-top", "20px")
      .style("padding", "10px")
      .style("background-color", "#f5f5f5")
      .style("border-radius", "5px")
      .style("overflow", "auto")
      .style("max-height", "300px");

    const jsonPre = jsonContainer
      .append("pre")
      .style("margin", "0")
      .style("white-space", "pre-wrap");

    jsonPre.text(JSON.stringify(parsedJson, null, 2));
  }, [treeData]);

  return (
    <div>
      <h2>Binary Search Tree Visualization</h2>
      {!treeData ? (
        <p>No valid tree data to display</p>
      ) : (
        <div>
          <svg ref={svgRef} width="600" height="400"></svg>
        </div>
      )}
    </div>
  );
};

export default BSTVisualizer;
