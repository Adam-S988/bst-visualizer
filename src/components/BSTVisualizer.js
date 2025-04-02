import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const BSTVisualizer = ({ treeJson }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!treeJson) return;

    const treeData = JSON.parse(treeJson);

    const width = 500;
    const height = 400;
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(50,50)");

    // Convert JSON into a hierarchical structure
    const root = d3.hierarchy(treeData);
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
      .attr("stroke", "black");

    // Draw nodes (circles)
    svg
      .selectAll("circle")
      .data(root.descendants())
      .enter()
      .append("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", 15)
      .attr("fill", "steelblue");

    // Add text labels
    svg
      .selectAll("text")
      .data(root.descendants())
      .enter()
      .append("text")
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y - 20)
      .attr("text-anchor", "middle")
      .text((d) => d.data.value)
      .attr("fill", "black");
  }, [treeJson]);

  return <svg ref={svgRef}></svg>;
};

export default BSTVisualizer;
