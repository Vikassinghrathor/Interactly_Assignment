import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState, addEdge } from 'reactflow';
import {useCallback } from 'react';
import './Home.css';
import 'reactflow/dist/style.css';
import CustomNode from './CustomNode';
import CustomEdge from './CustomEdge';

const Home = () => {
  const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' }, component: CustomNode },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' }, component: CustomNode },
  ];
  const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', data: { label: 'e1-2' }, component: CustomEdge },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onElementClick = (id, type) => {
    if (type === 'node') {
      setNodes((nodes) => nodes.filter((node) => node.id !== id));
    } else if (type === 'edge') {
      setEdges((edges) => edges.filter((edge) => edge.id !== id));
    }
  };

  const createNode = () => {
    const newNodeId = (nodes.length + 1).toString();
    const newNode = {
      id: newNodeId,
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      data: { label: newNodeId },
      component: CustomNode,
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <div className="toolbar">
        <button className="btn" onClick={createNode}>
          Create Node
        </button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onElementClick={(event, element) => {
          event.stopPropagation();
          onElementClick(element.id, element.type);
        }}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default Home;