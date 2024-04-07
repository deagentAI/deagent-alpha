/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo, useEffect, useRef, useState } from "react";
import { hexbin } from "d3-hexbin";
import gsap from "gsap";
import { useDemoStore, useAgentListStore } from "@src/store";
import {
  highlightedHexagons,
  dataCenter,
  dataTwo,
  dataThree,
  hightAgentConfig,
} from "../config";
import { addColorChangeAnimations, MatchTransform } from "../util";

import * as d3 from "d3";

interface Props {}

const Index: React.FC<Props> = (props) => {
  const {} = props;
  const {
    storeDaWidgetPos,
    daWidgetPos,
    storeIsToogle,
    isToogle,
    activeAgentList,
  } = useDemoStore();
  const { storeAgentListVisible } = useAgentListStore();
  const [aniMation, setAniMation] = useState(false);
  const ref: any = useRef();
  const componentName = useRef();
  const logoSize = 50;
  // 设置指定agent高亮
  const setHightAgentActive = (dom: any) => {
    const result = hightAgentConfig.filter((v: any) =>
      (activeAgentList as any).includes(v.type)
    );
    if (result.length > 0) {
      result.forEach((v) => {
        dom.select(`#id${v.id}`).attr("style", "{}");
        dom.select(`#id${v.id}`).attr("fill", v.color);
        const transform = dom.select(`#id${v.id}`).attr("transform");
        const { x, y } = MatchTransform(transform) || { x: 0, y: 0 };
        dom
          .append("text")
          .attr("x", x)
          .attr("y", y)
          .text(v.type)
          .attr("font-size", "10px")
          .attr("fill", "#fff")
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "middle")
          .attr("id", `text-${v.id}`);
      });
    } else {
      hightAgentConfig.forEach((v) => {
        dom.select(`#id${v.id}`).attr("fill", "#111111").attr("style", null);
        // 清除可能已添加的文本
        dom.select(`#text-${v.id}`).remove();
      });
    }
  };
  useEffect(() => {
    const svg = d3.select(ref.current);
    const width = 600; // svg 宽度
    const height = 400; // svg 高度
    svg.attr("viewBox", `0 0 ${width} ${height}`);
    // 蜂巢半径
    const hexRadius = 40;
    const hexWidth = Math.sqrt(3) * hexRadius;
    const hexHeight = 2 * hexRadius;
    const hexagonPath = hexbin().radius(hexRadius);

    // 计算网格的宽度与高度
    const gridWidth = width / hexWidth;
    const gridHeight = height / hexHeight;

    // 生成蜂巢的位置
    const hexagonData: any[] = [];
    for (let y = 0; y < gridHeight; y++) {
      for (let x = 0; x < gridWidth; x++) {
        hexagonData.push([
          hexWidth * x + ((y % 2) * hexWidth) / 2 + 20,
          hexHeight * (3 / 4) * y + 89,
        ]);
      }
    }
    // console.log(hexagonData, hexagonData.length);

    const scaleUp = (selection: any) => {
      selection
        .raise()
        .transition()
        .duration(500) // 动画持续时间500毫秒
        .attr("transform", (d: any) => {
          console.log(d, "=d");
          const scale = 1.5; // 放大比例
          // const x = d.x - hexRadius * (scale - 1) + 10;
          // const y = d.y - hexRadius * (scale - 1);
          const x = d.x;
          const y = d.y;
          return `translate(${x},${y}) scale(${scale})`;
        });
    };
    // 绘制六边形
    svg
      .selectAll("path")
      .data(hexagonPath(hexagonData))
      .enter()
      .append("path")
      .attr("d", hexagonPath.hexagon())
      .attr("transform", (d) => `translate(${d.x},${d.y})`)
      .attr("stroke", "black")
      .attr("fill", "#0f0f0f")
      .attr("id", (d, i) => `id${i + 1}`)
      .on("click", function (event, d) {
        const { id } = this;
        const idNumber = String(id.slice(2));
        console.log(id, "=id");
        console.dir(this);
        const currentIndex = highlightedHexagons.findIndex(
          (v) => v.id === idNumber
        );
        const currentItem: any =
          highlightedHexagons.find((v) => v.id === idNumber) || {};
        const { cssAttr } = currentItem;
        const { x, y } = d;
        const clientWidth = ref.current.clientWidth;
        const clientHeight = ref.current.clientHeight;
        // 按照svg对应比例设置widget的位置
        const wx = (clientWidth * x) / width;
        const wh = (clientHeight * y) / height;
        const widgetParams = {
          x: `${wx}px`,
          y: `${wh}px`,
          opacity: cssAttr?.opacity,
          zIndex: 5,
        };
        componentName.current = currentItem?.componentName;
        const result = {
          [currentItem?.componentName]: {
            ...widgetParams,
          },
        };
        // 设置对应widget的位置
        // storeDaWidgetPos(result);
        if (currentIndex > -1 && aniMation) {
          // scaleUp(d3.select(this));
        }
      });
    // 删除不对称的连个多边形
    svg.selectAll("path[id='id18']").remove();
    svg.selectAll("path[id='id36']").remove();

    // // 绘制logo
    svg
      .append("image")
      .attr("xlink:href", "/images/logo/logo.svg")
      .attr("width", logoSize)
      .attr("height", logoSize)
      .attr("x", width / 2 - logoSize / 4)
      .attr("y", height / 2 - logoSize + 5)
      .attr("id", "image-center");

    // 修改特定六边形的颜色
    // highlightedHexagons.forEach((v) => {
    //   svg.select(`#id${v.id}`).attr("fill", v.color);
    // });

    let firstLoopCompleted = false; // 用来标记第一次循环是否完成

    const ctx = gsap.context(() => {
      // 循环{ repeat: -1, yoyo: true }
      const tl = gsap.timeline({
        repeat: 1,
        yoyo: true,
        onRepeat: function () {
          if (!firstLoopCompleted) {
            firstLoopCompleted = true;
            // animateFirstLoop();
          }
        },
        onComplete: function () {
          console.log("结束了");
          setAniMation(true);
          // highlightedHexagons.forEach((v) => {
          //   svg.select(`#id${v.id}`).attr("style", "{}");
          //   svg.select(`#id${v.id}`).attr("fill", v.color);
          // });
          // 控制中间一直循环动画
          gsap.fromTo(
            "#id23",
            {
              fill: "#0f0f0f",
              opacity: 0.5,
            },
            {
              fill: "#31ed95",
              opacity: 1,
              duration: 2,
              repeat: -1,
              yoyo: true,
            }
          );
          storeIsToogle(true);
        },
      });

      const animateFirstLoop = () => {
        /**
         *  activeAgentList,
          targetData: hightAgentConfig,
         */
        console.log("动画结束了");
        hightAgentConfig.forEach((v) => {
          addColorChangeAnimations({
            tl,
            ids: [v.id],
            color: v.color,
            duration: 2,
            staggerTime: 0.1,
          });
        });
      };

      // 如果不循环动画，则添加一个空动画
      // tl.add(() => {}, "+=0").eventCallback("onComplete", () => {
      //   console.log("动画结束了");
      // });

      // 添加循环动画
      // addColorChangeAnimations({
      //   tl,
      //   ids: dataCenter,
      //   color: "#002d1c",
      //   duration: 2,
      //   staggerTime: 0.1,
      // });
      // addColorChangeAnimations({
      //   tl,
      //   ids: dataTwo,
      //   color: "#006b3d",
      //   duration: 4,
      //   staggerTime: 0.15,
      // });
      // addColorChangeAnimations({
      //   tl,
      //   ids: dataThree,
      //   color: "#00b563",
      //   duration: 5,
      //   staggerTime: 0.2,
      // });

      // 暂停或者播放动画
      // const pauseOrPlayAnimation = () => {
      //   console.log(1111, "start");
      //   if (tl.isActive()) {
      //     tl.pause();
      //   }
      // };
      // svg.on("click", pauseOrPlayAnimation);
    });

    return () => {
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const svg = d3.select(ref.current);
    if (aniMation) {
      setHightAgentActive(svg);
    }
    ref.current.addEventListener("click", (e: any) => {
      console.log(e, "===e");
      if (e) {
        // if (componentName.current) {
        //   // 隐藏所有widget
        //   const result = {
        //     [componentName.current]: {
        //       x: 0,
        //       y: 0,
        //       opacity: 0,
        //       zIndex: 0,
        //     },
        //   };
        //   // 设置对应widget的位置
        //   storeDaWidgetPos(result);
        // }
      }
      if (["image-center", "id23"].includes(e.srcElement.id)) {
        if (aniMation) {
          storeAgentListVisible(true);
        }
      }
      const result = hightAgentConfig.filter((v: any) =>
        (activeAgentList as any).includes(v.type)
      );
      const ids = result.map((v: any) => v.id);
      if (ids.includes(e.srcElement.id.replace("text-", ""))) {
        storeAgentListVisible(true);
      }
    });
  }, [activeAgentList.length, aniMation]);
  return (
    <svg ref={ref} width={"100%"} height={"100%"}>
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="0"
          refY="3.5"
          orient="auto"
          fill="#fff"
        >
          <polygon points="0 0, 10 3.5, 0 7" />
        </marker>
      </defs>
    </svg>
  );
};

export default memo(Index);
