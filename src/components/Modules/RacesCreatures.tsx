import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Users, PawPrint, RefreshCw } from 'lucide-react';

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

const RacesCreatures = () => {
  const [races, setRaces] = useState<Race[]>(() => {
    const savedRaces = localStorage.getItem('worldRaces');
    return savedRaces ? JSON.parse(savedRaces) : [];
  });
  const [creatures, setCreatures] = useState<Creature[]>(() => {
    const savedCreatures = localStorage.getItem('worldCreatures');
    return savedCreatures ? JSON.parse(savedCreatures) : [];
  });
  const [editingRace, setEditingRace] = useState<Race | null>(null);
  const [editingCreature, setEditingCreature] = useState<Creature | null>(null);
  const [activeTab, setActiveTab] = useState<'races' | 'creatures'>('races');

  const [raceForm, setRaceForm] = useState({
    name: '',
    physicalTraits: '',
    culture: '',
    abilities: '',
    society: ''
  });

  const [creatureForm, setCreatureForm] = useState({
    name: '',
    description: '',
    habitat: '',
    behavior: '',
    abilities: ''
  });

  // Save races and creatures to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('worldRaces', JSON.stringify(races));
  }, [races]);

  useEffect(() => {
    localStorage.setItem('worldCreatures', JSON.stringify(creatures));
  }, [creatures]);

  // Add reset function
  const handleReset = () => {
    if (window.confirm('Are you sure you want to delete all races and creatures? This action cannot be undone.')) {
      setRaces([]);
      setCreatures([]);
      localStorage.removeItem('worldRaces');
      localStorage.removeItem('worldCreatures');
      setRaceForm({
        name: '',
        physicalTraits: '',
        culture: '',
        abilities: '',
        society: ''
      });
      setCreatureForm({
        name: '',
        description: '',
        habitat: '',
        behavior: '',
        abilities: ''
      });
      setEditingRace(null);
      setEditingCreature(null);
    }
  };

  const handleRaceInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRaceForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreatureInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCreatureForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRaceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRace) {
      setRaces(prev => prev.map(race => 
        race.id === editingRace.id ? { ...race, ...raceForm } : race
      ));
      setEditingRace(null);
    } else {
      const newRace = {
        id: Date.now().toString(),
        ...raceForm
      };
      setRaces(prev => [...prev, newRace]);
    }
    setRaceForm({
      name: '',
      physicalTraits: '',
      culture: '',
      abilities: '',
      society: ''
    });
  };

  const handleCreatureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCreature) {
      setCreatures(prev => prev.map(creature => 
        creature.id === editingCreature.id ? { ...creature, ...creatureForm } : creature
      ));
      setEditingCreature(null);
    } else {
      const newCreature = {
        id: Date.now().toString(),
        ...creatureForm
      };
      setCreatures(prev => [...prev, newCreature]);
    }
    setCreatureForm({
      name: '',
      description: '',
      habitat: '',
      behavior: '',
      abilities: ''
    });
  };

  const handleEditRace = (race: Race) => {
    setEditingRace(race);
    setRaceForm({
      name: race.name,
      physicalTraits: race.physicalTraits,
      culture: race.culture,
      abilities: race.abilities,
      society: race.society
    });
  };

  const handleEditCreature = (creature: Creature) => {
    setEditingCreature(creature);
    setCreatureForm({
      name: creature.name,
      description: creature.description,
      habitat: creature.habitat,
      behavior: creature.behavior,
      abilities: creature.abilities
    });
  };

  const handleDeleteRace = (id: string) => {
    setRaces(prev => prev.filter(race => race.id !== id));
  };

  const handleDeleteCreature = (id: string) => {
    setCreatures(prev => prev.filter(creature => creature.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Races & Creatures</h2>
        <button
          onClick={handleReset}
          className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          <RefreshCw className="h-5 w-5" />
          <span>Reset All</span>
        </button>
      </div>
      
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('races')}
          className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
            activeTab === 'races'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Users className="h-5 w-5" />
          <span>Races</span>
        </button>
        <button
          onClick={() => setActiveTab('creatures')}
          className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
            activeTab === 'creatures'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <PawPrint className="h-5 w-5" />
          <span>Creatures</span>
        </button>
      </div>

      <div className="space-y-6">
        {activeTab === 'races' ? (
          <>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">
                {editingRace ? 'Edit Race' : 'Add New Race'}
              </h3>
              <form onSubmit={handleRaceSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Race Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={raceForm.name}
                    onChange={handleRaceInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter the name of the race"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Physical Characteristics
                  </label>
                  <textarea
                    name="physicalTraits"
                    value={raceForm.physicalTraits}
                    onChange={handleRaceInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows={4}
                    placeholder="Describe the physical traits of this race"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Abilities & Powers
                  </label>
                  <textarea
                    name="abilities"
                    value={raceForm.abilities}
                    onChange={handleRaceInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows={4}
                    placeholder="Describe the special abilities and powers of this race"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Culture & Society
                  </label>
                  <textarea
                    name="culture"
                    value={raceForm.culture}
                    onChange={handleRaceInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows={4}
                    placeholder="Describe their cultural traits and social structure"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Social Organization
                  </label>
                  <textarea
                    name="society"
                    value={raceForm.society}
                    onChange={handleRaceInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows={4}
                    placeholder="Describe their social organization and hierarchy"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  {editingRace && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingRace(null);
                        setRaceForm({
                          name: '',
                          physicalTraits: '',
                          culture: '',
                          abilities: '',
                          society: ''
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
                    {editingRace ? 'Update Race' : 'Add Race'}
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Races</h3>
              {races.length === 0 ? (
                <p className="text-gray-500">No races added yet. Add your first race above!</p>
              ) : (
                <div className="space-y-4">
                  {races.map(race => (
                    <div key={race.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-2">
                          <Users className="h-5 w-5 text-indigo-600" />
                          <h4 className="text-lg font-medium">{race.name}</h4>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditRace(race)}
                            className="p-1 text-gray-600 hover:text-indigo-600 transition-colors"
                          >
                            <Edit2 className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteRace(race.id)}
                            className="p-1 text-gray-600 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p><span className="font-medium">Physical Traits:</span> {race.physicalTraits}</p>
                        <p><span className="font-medium">Abilities:</span> {race.abilities}</p>
                        <p><span className="font-medium">Culture:</span> {race.culture}</p>
                        <p><span className="font-medium">Society:</span> {race.society}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">
                {editingCreature ? 'Edit Creature' : 'Add New Creature'}
              </h3>
              <form onSubmit={handleCreatureSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Creature Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={creatureForm.name}
                    onChange={handleCreatureInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter the name of the creature"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={creatureForm.description}
                    onChange={handleCreatureInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows={4}
                    placeholder="Describe the creature's appearance and behavior"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Habitat & Distribution
                  </label>
                  <textarea
                    name="habitat"
                    value={creatureForm.habitat}
                    onChange={handleCreatureInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows={4}
                    placeholder="Describe where this creature can be found"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Behavior
                  </label>
                  <textarea
                    name="behavior"
                    value={creatureForm.behavior}
                    onChange={handleCreatureInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows={4}
                    placeholder="Describe the creature's behavior and habits"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Abilities & Powers
                  </label>
                  <textarea
                    name="abilities"
                    value={creatureForm.abilities}
                    onChange={handleCreatureInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows={4}
                    placeholder="Describe the creature's special abilities and powers"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  {editingCreature && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingCreature(null);
                        setCreatureForm({
                          name: '',
                          description: '',
                          habitat: '',
                          behavior: '',
                          abilities: ''
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
                    {editingCreature ? 'Update Creature' : 'Add Creature'}
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Creatures</h3>
              {creatures.length === 0 ? (
                <p className="text-gray-500">No creatures added yet. Add your first creature above!</p>
              ) : (
                <div className="space-y-4">
                  {creatures.map(creature => (
                    <div key={creature.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-2">
                          <PawPrint className="h-5 w-5 text-indigo-600" />
                          <h4 className="text-lg font-medium">{creature.name}</h4>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditCreature(creature)}
                            className="p-1 text-gray-600 hover:text-indigo-600 transition-colors"
                          >
                            <Edit2 className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteCreature(creature.id)}
                            className="p-1 text-gray-600 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p><span className="font-medium">Description:</span> {creature.description}</p>
                        <p><span className="font-medium">Habitat:</span> {creature.habitat}</p>
                        <p><span className="font-medium">Behavior:</span> {creature.behavior}</p>
                        <p><span className="font-medium">Abilities:</span> {creature.abilities}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RacesCreatures;