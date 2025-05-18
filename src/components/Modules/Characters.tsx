import { useState, useEffect } from 'react';
import ReactFlow, { 
  Node, 
  Edge,
  Controls,
  Background,
  MarkerType
} from 'reactflow';
import { Plus, Trash2, Edit2, RefreshCw } from 'lucide-react';
import 'reactflow/dist/style.css';

interface Character {
  id: string;
  name: string;
  personality: string;
  backstory: string;
  powers: string;
}

const Characters = () => {
  const [characters, setCharacters] = useState<Character[]>(() => {
    const savedCharacters = localStorage.getItem('worldCharacters');
    return savedCharacters ? JSON.parse(savedCharacters) : [];
  });
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);
  const [showGraph, setShowGraph] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    personality: '',
    backstory: '',
    powers: ''
  });

  // Save characters to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('worldCharacters', JSON.stringify(characters));
  }, [characters]);

  // Add reset function
  const handleReset = () => {
    if (window.confirm('Are you sure you want to delete all characters? This action cannot be undone.')) {
      setCharacters([]);
      localStorage.removeItem('worldCharacters');
      setFormData({
        name: '',
        personality: '',
        backstory: '',
        powers: ''
      });
      setEditingCharacter(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCharacter) {
      // Update existing character
      setCharacters(prev => prev.map(char => 
        char.id === editingCharacter.id ? { ...char, ...formData } : char
      ));
      setEditingCharacter(null);
    } else {
      // Add new character
      const newCharacter = {
        id: Date.now().toString(),
        ...formData
      };
      setCharacters(prev => [...prev, newCharacter]);
    }
    // Reset form
    setFormData({
      name: '',
      personality: '',
      backstory: '',
      powers: ''
    });
  };

  const handleEdit = (character: Character) => {
    setEditingCharacter(character);
    setFormData({
      name: character.name,
      personality: character.personality,
      backstory: character.backstory,
      powers: character.powers
    });
  };

  const handleDelete = (id: string) => {
    setCharacters(prev => prev.filter(char => char.id !== id));
  };

  // Convert characters to nodes for the graph
  const nodes: Node[] = characters.map((char, index) => ({
    id: char.id,
    data: { label: char.name },
    position: { 
      x: 250 + Math.cos(index * (2 * Math.PI / characters.length)) * 200,
      y: 250 + Math.sin(index * (2 * Math.PI / characters.length)) * 200
    },
  }));

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Characters</h2>
        <button
          onClick={handleReset}
          className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          <RefreshCw className="h-5 w-5" />
          <span>Reset All</span>
        </button>
      </div>
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">
            {editingCharacter ? 'Edit Character' : 'Add New Character'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Character Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter character name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Personality
              </label>
              <textarea
                name="personality"
                value={formData.personality}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={4}
                placeholder="Describe the character's personality traits"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Backstory
              </label>
              <textarea
                name="backstory"
                value={formData.backstory}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={4}
                placeholder="Write the character's backstory"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Powers & Abilities
              </label>
              <textarea
                name="powers"
                value={formData.powers}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={4}
                placeholder="List the character's powers and abilities"
              />
            </div>
            <div className="flex justify-end space-x-2">
              {editingCharacter && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingCharacter(null);
                    setFormData({
                      name: '',
                      personality: '',
                      backstory: '',
                      powers: ''
                    });
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                {editingCharacter ? 'Update Character' : 'Add Character'}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Character List</h3>
          {characters.length === 0 ? (
            <p className="text-gray-500">No characters added yet. Add your first character above!</p>
          ) : (
            <div className="space-y-4">
              {characters.map(character => (
                <div key={character.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-medium">{character.name}</h4>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(character)}
                        className="p-1 text-gray-600 hover:text-indigo-600 transition-colors"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(character.id)}
                        className="p-1 text-gray-600 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><span className="font-medium">Personality:</span> {character.personality}</p>
                    <p><span className="font-medium">Backstory:</span> {character.backstory}</p>
                    <p><span className="font-medium">Powers:</span> {character.powers}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {characters.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Character Relationships</h3>
              <button
                onClick={() => setShowGraph(!showGraph)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                {showGraph ? 'Hide Graph' : 'Show Graph'}
              </button>
            </div>
            
            {showGraph && (
              <div style={{ height: '400px' }} className="border rounded-lg">
                <ReactFlow
                  nodes={nodes}
                  edges={[]}
                  fitView
                >
                  <Background />
                  <Controls />
                </ReactFlow>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Characters;