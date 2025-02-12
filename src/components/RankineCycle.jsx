import React from "react";
import "../App.css";
import {
  ReactFlow,
  Controls,
  useNodesState,
  Handle,
  Position,
  EdgeText,
  Background,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./RankineCycle.css";
const nodeStyles = {
  pump: {
    background: "#3b82f6",
    width: 60,
    height: 60,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  boiler: {
    background: "#ef4444",
    width: 80,
    height: 100,
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  turbine: {
    width: 50,
    height: 25,
    borderLeft: "50px solid #eab308",
    borderTop: "25px solid transparent",
    borderBottom: "25px solid transparent",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    font: "bold 10px sans-serif",
    padding: "20px",
  },
  condenser: {
    background: "#10b981",
    width: 80,
    height: 50,
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
};

const PumpNode = ({ data }) => (
  <div style={nodeStyles.pump} id="pump">
    <Handle type="source" position={Position.Left} />
    {data.label}
    <Handle type="target" position={Position.Right} />
  </div>
);

const BoilerNode = ({ data }) => (
  <div style={nodeStyles.boiler}>
    <Handle type="target" position={Position.Bottom} />
    {data.label}
    <Handle type="source" position={Position.top} />
  </div>
);

const TurbineNode = ({ data }) => (
  <div style={nodeStyles.turbine}>
    <Handle
      type="target"
      position={Position.Left}
      style={{ left: "-40px", top: "-10px" }}
    />
    <div style={{ position: "absolute", left: "-70px", width: "100px" }}>
      {data.label}
    </div>
    <Handle
      type="source"
      position={Position.Bottom}
      style={{ bottom: "12px", left: "-10px" }}
    />
  </div>
);

const CondenserNode = ({ data }) => (
  <div style={nodeStyles.condenser}>
    <Handle type="target" position={Position.Top} />
    {data.label}
    <Handle type="source" position={Position.Bottom} />
  </div>
);

const nodes = [
  {
    id: "1",
    type: "pump",
    data: { label: "Pump" },
    position: { x: 300, y: 300 },
  },
  {
    id: "2",
    type: "boiler",
    data: { label: "Boiler" },
    position: { x: 150, y: 150 },
  },
  {
    id: "3",
    type: "turbine",
    data: { label: "Turbine" },
    position: { x: 300, y: 0 },
  },
  {
    id: "4",
    type: "condenser",
    data: { label: "Condenser" },
    position: { x: 450, y: 150 },
  },
];
// Update your edges array with these configurations
const edges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "step",
    animated: true,
    style: { stroke: "#000", strokeWidth: 2 },
    markerEnd: "url(#arrow)",
    strobe: 0.5, // Makes the bend happen at midpoint
    cornerRadius: 0, // Sharp 90-degree corners
    label: "h2",
    labelStyle: {
      background: "transparent",
      fill: "blue",
      fontWeight: "bold",
    },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    type: "step",
    animated: true,
    style: { stroke: "#000", strokeWidth: 2 },
    markerEnd: "url(#arrow)",
    strobe: 0.5,
    cornerRadius: 0,
    label: "h3",
    labelStyle: {
      background: "transparent",
      fill: "#f00",
      fontWeight: "bold",
    },
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    type: "step",
    animated: true,
    style: { stroke: "#000", strokeWidth: 2 },
    markerEnd: "url(#arrow)",
    strobe: 0.5,
    cornerRadius: 0,
    label: "h4",
    labelStyle: {
      background: "transparent",
      fill: "violet",
      fontWeight: "bold",
    },
  },
  {
    id: "e4-1",
    source: "4",
    target: "1",
    type: "step",
    animated: true,
    style: { stroke: "#000", strokeWidth: 2 },
    markerEnd: "url(#arrow)",
    strobe: 0.5,
    cornerRadius: 0,
    label: "h1",
    labelStyle: {
      background: "transparent",
      fill: "green",
      fontWeight: "bold",
    },
  },
];

// Add this SVG definition for arrow markers in your component return:
<svg style={{ position: "absolute", width: 0, height: 0 }}>
  <defs>
    <marker
      id="arrow"
      viewBox="0 0 10 10"
      refX="5"
      refY="5"
      markerWidth="6"
      markerHeight="6"
      orient="auto-start-reverse"
    >
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
    </marker>
  </defs>
</svg>;

const nodeTypes = {
  pump: PumpNode,
  boiler: BoilerNode,
  turbine: TurbineNode,
  condenser: CondenserNode,
};

const RankineCycleDiagram = () => {
  const [nodes1, setNodes, onNodesChange] = useNodesState(nodes);
  return (
    <div
      style={{
        width: "50vw",
        height: "50vh",
        transform: "translateX(15%)",
        marginTop: "2rem",
      }}
      id="rankine-cycle-diagram"
    >
      <ReactFlow
        nodes={nodes1}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        fitView
      >
        {/* <MiniMap /> */}
        {/* <Controls /> */}
        {/* <Background gap={25} size={1} /> */}
      </ReactFlow>
    </div>
  );
};

export default RankineCycleDiagram;
