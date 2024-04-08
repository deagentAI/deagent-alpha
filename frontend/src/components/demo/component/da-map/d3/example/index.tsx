/**
 * @description 请添加组件描述
 * @author maicFir
 */
"use client";
import React, { memo, useEffect, useRef } from "react";
import * as d3 from "d3";
interface Props {}

const Index: React.FC<Props> = (props) => {
  const {} = props;
  const width = 400;
  const height = 400;
  const ref = useRef(null);
  useEffect(() => {
    const svgElement = d3.select(ref.current);
    // 绘制线
    svgElement
      .append("line")
      .attr("x1", 35)
      .attr("y1", 30)
      .attr("x2", 400)
      .attr("y2", 400)
      .style("stroke", "black")
      .style("stroke-width", "2px");

    // 绘制文字
    svgElement
      .append("text")
      .attr("x", 20)
      .attr("y", 30)
      .attr("fill", "#fff")
      .text("Hello!");

    // 绘制圆
    svgElement
      .append("circle")
      .attr("r", 20)
      .attr("cx", 100)
      .attr("cy", 100)
      .attr("fill", "red")
      .call(d3.drag())
      .transition()
      .duration(2000)
      .attr("r", 40)
      .transition()
      .style("fill", "blue")
      .transition()
      .duration(3000)
      .style("fill", "green")
      .delay(250);

    // 绘制矩形
  }, []);

  return (
    <div>
      <svg
        width={width}
        height={height}
        viewBox="0 0 400 400"
        style={{ border: "1px solid gold" }}
        ref={ref}
      ></svg>
    </div>
  );
};

export default memo(Index);
