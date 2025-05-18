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
  NodeDragHandler,
} from 'reactflow';
import { Users, Landmark, Clock, PawPrint } from 'lucide-react';
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

interface Character {
  id: string;
  name: string;
  personality: string;
  backstory: string;
  powers: string;
}

interface Faction {
  id: string;
  name: string;
  description: string;
  goals: string;
  leadership: string;
  influence: string;
  relationships: string;
}

interface Race {
  id: string;
  name: string;
  physicalTraits: string;
  culture: string;
  abilities: string;
  society: string;
}

interface Creature {
  id: string;
  name: string;
  description: string;
  habitat: string;
  behavior: string;
  abilities: string;
}

const TimelineVisualization = () => {
  const [events, setEvents] = useState<HistoricalEvent[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [factions, setFactions] = useState<Faction[]>([]);
  const [races, setRaces] = useState<Race[]>([]);
  const [creatures, setCreatures] = useState<Creature[]>([]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Load all data from localStorage
  useEffect(() => {
    const loadData = () => {
      const savedEvents = localStorage.getItem('historicalEvents');
      const savedCharacters = localStorage.getItem('worldCharacters');
      const savedFactions = localStorage.getItem('worldFactions');
      const savedRaces = localStorage.getItem('worldRaces');
      const savedCreatures = localStorage.getItem('worldCreatures');

      if (savedEvents) setEvents(JSON.parse(savedEvents));
      if (savedCharacters) setCharacters(JSON.parse(savedCharacters));
      if (savedFactions) setFactions(JSON.parse(savedFactions));
      if (savedRaces) setRaces(JSON.parse(savedRaces));
      if (savedCreatures) setCreatures(JSON.parse(savedCreatures));
    };

    loadData();

    const handleStorageChange = (e: StorageEvent) => {
      if (['historicalEvents', 'worldCharacters', 'worldFactions', 'worldRaces', 'worldCreatures'].includes(e.key || '')) {
        loadData();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      const name = event.dataTransfer.getData('name');
      const id = event.dataTransfer.getData('id');

      // Check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = {
        x: event.clientX - 250,
        y: event.clientY - 100,
      };

      const newNode: Node = {
        id: id,
        type: 'default',
        position,
        data: { label: name },
        style: {
          background: '#fff',
          border: '1px solid #ccc',
          borderRadius: '5px',
          padding: '10px',
          width: 200,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes],
  );

  const onDragStart = (event: React.DragEvent, nodeType: string, name: string, id: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('name', name);
    event.dataTransfer.setData('id', id);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="h-screen w-full flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">World Elements</h3>
        
        {/* Historical Events */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            Historical Events
          </h4>
          <div className="space-y-2">
            {events.map((event) => (
              <div
                key={event.id}
                className="p-2 bg-gray-50 rounded border border-gray-200 cursor-move hover:bg-gray-100"
                draggable
                onDragStart={(e) => onDragStart(e, 'event', event.name, event.id)}
              >
                {event.name}
              </div>
            ))}
          </div>
        </div>

        {/* Characters */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Characters
          </h4>
          <div className="space-y-2">
            {characters.map((character) => (
              <div
                key={character.id}
                className="p-2 bg-gray-50 rounded border border-gray-200 cursor-move hover:bg-gray-100"
                draggable
                onDragStart={(e) => onDragStart(e, 'character', character.name, character.id)}
              >
                {character.name}
              </div>
            ))}
          </div>
        </div>

        {/* Factions */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
            <Landmark className="h-4 w-4 mr-2" />
            Factions
          </h4>
          <div className="space-y-2">
            {factions.map((faction) => (
              <div
                key={faction.id}
                className="p-2 bg-gray-50 rounded border border-gray-200 cursor-move hover:bg-gray-100"
                draggable
                onDragStart={(e) => onDragStart(e, 'faction', faction.name, faction.id)}
              >
                {faction.name}
              </div>
            ))}
          </div>
        </div>

        {/* Races */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Races
          </h4>
          <div className="space-y-2">
            {races.map((race) => (
              <div
                key={race.id}
                className="p-2 bg-gray-50 rounded border border-gray-200 cursor-move hover:bg-gray-100"
                draggable
                onDragStart={(e) => onDragStart(e, 'race', race.name, race.id)}
              >
                {race.name}
              </div>
            ))}
          </div>
        </div>

        {/* Creatures */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
            <PawPrint className="h-4 w-4 mr-2" />
            Creatures
          </h4>
          <div className="space-y-2">
            {creatures.map((creature) => (
              <div
                key={creature.id}
                className="p-2 bg-gray-50 rounded border border-gray-200 cursor-move hover:bg-gray-100"
                draggable
                onDragStart={(e) => onDragStart(e, 'creature', creature.name, creature.id)}
              >
                {creature.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Flow Canvas */}
      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDragOver={onDragOver}
          onDrop={onDrop}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          <Panel position="top-right">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Timeline Visualization</h3>
              <p className="text-sm text-gray-600">
                Drag elements from the sidebar to create nodes. Connect nodes by dragging from one handle to another.
              </p>
            </div>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
};

export default TimelineVisualization; 