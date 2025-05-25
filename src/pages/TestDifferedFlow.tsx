/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, Dispatch, SetStateAction, useEffect } from "react";
import '../App.css'
import {
  Background,
  ReactFlow,
  Node,
  Edge,
  applyEdgeChanges,
  applyNodeChanges,
  EdgeChange,
  NodeChange,
  BackgroundVariant,
  Controls,
  NodeProps,
  Handle,
  Position,
} from "@xyflow/react";
import { FlowService } from "../services/flowService";

export default function TestDifferedFlow() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [result, setResult] = useState<string | null>(null);

  const nodeSequence = FlowService.useDFSTraversal(edges, "3")

  function computeWorkflow() {
    // const output = nodes.map((node) => node.data.label).join(" -> ");
    const output : unknown[] = []
    nodeSequence
    /*.map(nodeId => `${nodes.find(n => n.id === nodeId)?.data.label} : {input : [${edges.map(edge => edge.target == nodeId ? `"${edge.source.toString()}"` : null).filter(edge => edge != null).join(",")}]}`)
    .join(" -> ");*/
    .forEach(nodeId => {
      output.push({[nodeId] : {
        input : edges.map(edge => edge.target == nodeId ? ({[edge.source.toString()] : {'id' : edge.sourceHandle}}) : null).filter(edge => edge != null),
        done : false
      }})
    })
    setResult(JSON.stringify(output));
    console.log(output)
  }

  // update state & nodes graph
  function handleNodesChange(changes: NodeChange<Node>[]) {
    setNodes((nds) => applyNodeChanges<Node>(changes, nds));
  }

  useEffect(() => {
    setNodes(nds => nds.map(nd => nd.type == "textareaNode" ? {...nd, data : {...nd.data, setNodes}} : nd ))
  }, [setNodes])

  // update state & nodes graph
  function handleEdgesChange(changes: EdgeChange[]) {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }

  return (
    <div style={{display:'flex', width: '100vw', height: '100vh'}}>
        <div className='flex shrink grow-0 w-[80%]'>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={handleNodesChange}
          onEdgesChange={handleEdgesChange}
          fitView
          fitViewOptions={{maxZoom : 0.85}}
          attributionPosition="bottom-left"
          nodeTypes={nodeTypes}
        >
          <Background color="#333" variant={BackgroundVariant.Dots} />
          <Controls/>
        </ReactFlow>
      </div>
      <div className="flex flex-col shrink grow-0 w-[20%]">
        <button className="text-white" onClick={computeWorkflow}>
            Start Workflow
        </button>
        {result && <div>Workflow Result:<br/><br/>{result}</div>}
      </div>
    </div>
  );
}

type TextAreaNodeType = Node<{label: string, setNodes : Dispatch<SetStateAction<Node[]>> }>;
function TextAreaNode({ id, data }: NodeProps<TextAreaNodeType>) {
  return (
    <div style={{ background: "#fff", padding: 10, borderRadius: 5 }}>
      <textarea
        rows={10}
        value={data.label}
        onChange={(e) => {
          data.setNodes((nds) => nds.map(nd => nd.id == id ? {...nd, data : {...nd.data, label : e.target.value}} : nd))
        }}
        className="w-full border-1 border-neutral-800 p-2 resize-none"
      />
      <Handle type="source" id="prompt" position={Position.Right} />
    </div>
  );
}

function UpperCaseNode({ id, data }: NodeProps<Node<{label : string}>>) {
  return (
    <div style={{ background: "#fff", padding: 10, borderRadius: 5 }}>
      <Handle type="target" position={Position.Left} />
      <span>{data.label}</span>
      <Handle type="source" id="uppercase" position={Position.Right} />
    </div>
  );
}

function PreviewNode({ id, data }: NodeProps<Node<{label : string}>>) {
  return (
    <div style={{ background: "#fff", padding: 10, borderRadius: 5 }}>
      <Handle type="target" position={Position.Left} />
      <span>{data.label}</span>
    </div>
  );
}

// Initial nodes and edges
const initialNodes: Node[] = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "Text Node", setNodes : () => {} }, type: "textareaNode" },
  { id: "2", position: { x: 200, y: 0 }, data: { label: "Upper Case Node" }, type: "uppercaseNode" },
  { id: "3", position: { x: 400, y: 0 }, data: { label: "Preview Node" }, type: "previewNode" },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", sourceHandle:'prompt', target: "2", type: "default" },
  { id: "e2-3", source: "2", sourceHandle:'uppercase', target: "3", type: "default" },
];

const nodeTypes = {
    textareaNode : TextAreaNode,
    uppercaseNode : UpperCaseNode,
    previewNode : PreviewNode
}