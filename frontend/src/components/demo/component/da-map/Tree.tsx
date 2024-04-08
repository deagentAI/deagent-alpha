/**
 * @description 请添加组件描述
 * @author maicFir
 */
"use client";
import { useState, memo, useCallback, useEffect } from "react";
import ReactFlow, {
  MiniMap,
  Background,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
  useNodesState,
  useEdgesState,
} from "reactflow";

import { useDemoStore, ChartItem } from "@store/index";
import { DeAgentTypes } from "@src/constants";
import { Widget1, Widget2 } from "./flow/widget";
import ShareButton from "./ShareButton";
import "reactflow/dist/style.css";

const nodeTypes = {
  Widget1: Widget1,
  Widget2: Widget2,
};
const initialNodes = [
  // {
  //   id: "root",
  //   // you can also pass a React component as a label
  //   data: {
  //     label: (
  //       <div className="root-dagent">
  //         DeAgent found 3 agents could figure out this question
  //       </div>
  //     ),
  //   },
  //   position: { x: 100, y: 125 },
  //   style: {
  //     backgroundColor: "#191a1c",
  //     color: "#fff",
  //     border: "1px solid #37383a",
  //   },
  // },
  // {
  //   id: "1",
  //   type: "Widget1",
  //   data: { label: "ETH $3200.02 -1.30% 24hVol.:23353.97" },
  //   position: { x: 250, y: 25 },
  //   style: {
  //     backgroundColor: "#191a1c",
  //     color: "#fff",
  //     border: "1px solid #37383a",
  //     borderRadius: "2px",
  //   },
  // },
  // {
  //   id: "3",
  //   type: "Widget2",
  //   data: { label: "Welcome to Dagent.ai" },
  //   position: { x: 250, y: 250 },
  //   style: {
  //     backgroundColor: "#191a1c",
  //     color: "#fff",
  //     border: "1px solid #37383a",
  //     borderRadius: "2px",
  //   },
  // },
];

const mapWidgetMap = new Map([
  [
    DeAgentTypes.de_agent_one,
    {
      name: DeAgentTypes.de_agent_one,
      component: Widget1,
      widgetName: "Widget1",
    },
  ],
  [
    DeAgentTypes.de_agent_two,
    {
      name: DeAgentTypes.de_agent_two,
      component: Widget2,
      widgetName: "Widget2",
    },
  ],
]);

const initialEdges = [
  {
    id: "e1-1",
    source: "1",
    target: "root",
    animated: true,
  },
  // {
  //   id: "e2a-3",
  //   source: "root",
  //   target: "3",
  //   animated: true,
  // },
  // {
  //   id: "e2b-4",
  //   source: "root",
  //   target: "3",
  //   animated: true,
  // },
];

function FlowTree() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { chartData } = useDemoStore();
  console.log(chartData, "=123chartData");
  const nodeColor = (node: any) => {
    return "#191a1c";
  };

  useEffect(() => {
    // setNodes
    if (chartData.length > 0) {
      const agent_call = chartData
        .filter((v: any) => v.function_call.length > 0)
        .map((v) => {
          return {
            function_call: v.function_call,
            function_respond: v.function_respond ? v.function_respond : {},
            uid: v.uid,
            name: DeAgentTypes.de_agent_one,
          };
        })
        .flat(1);
      console.log(agent_call, "==agent_call");
      const nodes = [];
      agent_call.forEach((v, index) => {
        nodes.push({
          id: String(index + 1),
          type: mapWidgetMap.get(v.name)?.widgetName,
          data: { agent_name: v.name, ...v.function_respond },
          position: { x: 250, y: 25 },
          style: {
            backgroundColor: "#191a1c",
            color: "#fff",
            border: "1px solid #37383a",
            borderRadius: "2px",
          },
        });
      });

      if (nodes.length > 0) {
        nodes.unshift({
          id: "root",
          // you can also pass a React component as a label
          data: {
            label: (
              <div className="root-dagent">
                DeAgent found {agent_call.length} agents could figure out this
                question
              </div>
            ),
          },
          position: { x: 100, y: 125 },
          style: {
            backgroundColor: "#191a1c",
            color: "#fff",
            border: "1px solid #37383a",
          },
        });
      }
      console.log(nodes, "=nodes");
      setNodes(nodes);
      // setEdges
      setEdges(initialEdges);
    }
  }, [chartData]);
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      fitView
    >
      <ShareButton />
      <Background />
      <Controls />
      <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
    </ReactFlow>
  );
}

export default memo(FlowTree);
