import { useState } from 'react';
import { Plus, Trash2, Edit2, Users } from 'lucide-react';

interface Faction {
  id: string;
  name: string;
  description: string;
  goals: string;
  leadership: string;
  influence: string;
  relationships: string;
}

const FactionsPolitics = () => {
  const [factions, setFactions] = useState<Faction[]>([]);
  const [editingFaction, setEditingFaction] = useState<Faction | null>(null);
  const [factionForm, setFactionForm] = useState({
    name: '',
    description: '',
    goals: '',
    leadership: '',
    influence: '',
    relationships: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFactionForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFaction) {
      setFactions(prev => prev.map(faction => 
        faction.id === editingFaction.id ? { ...faction, ...factionForm } : faction
      ));
      setEditingFaction(null);
    } else {
      const newFaction = {
        id: Date.now().toString(),
        ...factionForm
      };
      setFactions(prev => [...prev, newFaction]);
    }
    setFactionForm({
      name: '',
      description: '',
      goals: '',
      leadership: '',
      influence: '',
      relationships: ''
    });
  };

  const handleEdit = (faction: Faction) => {
    setEditingFaction(faction);
    setFactionForm({
      name: faction.name,
      description: faction.description,
      goals: faction.goals,
      leadership: faction.leadership,
      influence: faction.influence,
      relationships: faction.relationships
    });
  };

  const handleDelete = (id: string) => {
    setFactions(prev => prev.filter(faction => faction.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Factions & Politics</h2>
      
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">
            {editingFaction ? 'Edit Faction' : 'Add New Faction'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Faction Name
              </label>
              <input
                type="text"
                name="name"
                value={factionForm.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter the name of the faction"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={factionForm.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={4}
                placeholder="Describe the faction's purpose and nature"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Goals & Objectives
              </label>
              <textarea
                name="goals"
                value={factionForm.goals}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={4}
                placeholder="Describe the faction's goals and objectives"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Leadership & Structure
              </label>
              <textarea
                name="leadership"
                value={factionForm.leadership}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={4}
                placeholder="Describe the faction's leadership and organizational structure"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Influence & Power
              </label>
              <textarea
                name="influence"
                value={factionForm.influence}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={4}
                placeholder="Describe the faction's influence and power in the world"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Relationships
              </label>
              <textarea
                name="relationships"
                value={factionForm.relationships}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={4}
                placeholder="Describe the faction's relationships with other factions and groups"
              />
            </div>
            <div className="flex justify-end space-x-2">
              {editingFaction && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingFaction(null);
                    setFactionForm({
                      name: '',
                      description: '',
                      goals: '',
                      leadership: '',
                      influence: '',
                      relationships: ''
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
                {editingFaction ? 'Update Faction' : 'Add Faction'}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Factions</h3>
          {factions.length === 0 ? (
            <p className="text-gray-500">No factions added yet. Add your first faction above!</p>
          ) : (
            <div className="space-y-4">
              {factions.map(faction => (
                <div key={faction.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-indigo-600" />
                      <h4 className="text-lg font-medium">{faction.name}</h4>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(faction)}
                        className="p-1 text-gray-600 hover:text-indigo-600 transition-colors"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(faction.id)}
                        className="p-1 text-gray-600 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><span className="font-medium">Description:</span> {faction.description}</p>
                    <p><span className="font-medium">Goals:</span> {faction.goals}</p>
                    <p><span className="font-medium">Leadership:</span> {faction.leadership}</p>
                    <p><span className="font-medium">Influence:</span> {faction.influence}</p>
                    <p><span className="font-medium">Relationships:</span> {faction.relationships}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FactionsPolitics; 