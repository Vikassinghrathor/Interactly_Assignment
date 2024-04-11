import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import { useState ,  useCallback} from 'react';
import './Home.css';
import 'reactflow/dist/style.css';


const Home = () => {
  const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
  ];
  const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedElement, setSelectedElement] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const createNode = () => {
    const newNodeId = (nodes.length + 1).toString();
    const newNode = {
      id: newNodeId,
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      data: { label: newNodeId },
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  const deleteElement = () => {
    if (selectedElement) {
      if (selectedElement.type === 'node') {
        setNodes((nodes) =>
          nodes.filter((node) => node.id !== selectedElement.id)
        );
      } else if (selectedElement.type === 'edge') {
        setEdges((edges) =>
          edges.filter((edge) => edge.id !== selectedElement.id)
        );
      }
      setSelectedElement(null);
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <div className="toolbar">
        <button className="btn" onClick={createNode}>
          Create Node
        </button>
        <button
          className="btn"
          onClick={deleteElement}
          style={{
            backgroundColor: selectedElement ? 'red' : 'inherit',
          }}
        >
          Delete
        </button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default Home;