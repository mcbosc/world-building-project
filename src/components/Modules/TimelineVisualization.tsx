import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Panel,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';

interface HistoricalEvent {
  id: string;
  name: string;
  date: string;
  description: string;
  significance: string;
  impact: string;
  characters: string;
  artifacts: string;
  isCriticalPoint: boolean;
}

const TimelineVisualization = () => {
  const [events, setEvents] = useState<HistoricalEvent[]>([]);

  // Load events from localStorage
  useEffect(() => {
    const savedEvents = localStorage.getItem('historicalEvents');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  // Convert events to nodes
  const initialNodes: Node[] = events.map((event, index) => ({
    id: event.id,
    type: 'default',
    position: { x: index * 250, y: 0 },
    data: { 
      label: event.name,
      date: event.date,
      description: event.description,
      significance: event.significance,
      impact: event.impact,
      characters: event.characters,
      artifacts: event.artifacts,
      isCriticalPoint: event.isCriticalPoint
    },
    style: {
      background: event.isCriticalPoint ? '#818cf8' : '#fff',
      color: event.isCriticalPoint ? '#fff' : '#000',
      border: '1px solid #ccc',
      borderRadius: '5px',
      padding: '10px',
      width: 200,
    },
  }));

  // Create edges between consecutive events
  const initialEdges: Edge[] = events.slice(1).map((event, index) => ({
    id: `e${index}-${index + 1}`,
    source: events[index].id,
    target: event.id,
    type: 'smoothstep',
    animated: true,
  }));

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  // Update nodes and edges when events change
  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [events]);

  return (
    <div className="h-screen w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        <Panel position="top-right">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Timeline Visualization</h3>
            <p className="text-sm text-gray-600">
              Drag nodes to rearrange. Click and drag between nodes to create new connections.
            </p>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default TimelineVisualization; 