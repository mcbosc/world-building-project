import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Globe, RefreshCw } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  description: string;
  magicSystem: string;
  technologyLevel: string;
  climate: string;
  culture: string;
}

const WorldBasics = () => {
  const [locations, setLocations] = useState<Location[]>(() => {
    const savedLocations = localStorage.getItem('worldLocations');
    return savedLocations ? JSON.parse(savedLocations) : [];
  });
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    magicSystem: '',
    technologyLevel: '',
    climate: '',
    culture: ''
  });

  // Save locations to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('worldLocations', JSON.stringify(locations));
  }, [locations]);

  // Add reset function
  const handleReset = () => {
    if (window.confirm('Are you sure you want to delete all locations? This action cannot be undone.')) {
      setLocations([]);
      localStorage.removeItem('worldLocations');
      setFormData({
        name: '',
        description: '',
        magicSystem: '',
        technologyLevel: '',
        climate: '',
        culture: ''
      });
      setEditingLocation(null);
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
    if (editingLocation) {
      // Update existing location
      setLocations(prev => prev.map(loc => 
        loc.id === editingLocation.id ? { ...loc, ...formData } : loc
      ));
      setEditingLocation(null);
    } else {
      // Add new location
      const newLocation = {
        id: Date.now().toString(),
        ...formData
      };
      setLocations(prev => [...prev, newLocation]);
    }
    // Reset form
    setFormData({
      name: '',
      description: '',
      magicSystem: '',
      technologyLevel: '',
      climate: '',
      culture: ''
    });
  };

  const handleEdit = (location: Location) => {
    setEditingLocation(location);
    setFormData({
      name: location.name,
      description: location.description,
      magicSystem: location.magicSystem,
      technologyLevel: location.technologyLevel,
      climate: location.climate,
      culture: location.culture
    });
  };

  const handleDelete = (id: string) => {
    setLocations(prev => prev.filter(loc => loc.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">World Basics</h2>
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
            {editingLocation ? 'Edit Location' : 'Add New Location'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter the name of the location (e.g., country, city, region)"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={4}
                placeholder="Describe the location's geography, landmarks, and notable features"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Magic System
              </label>
              <textarea
                name="magicSystem"
                value={formData.magicSystem}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={4}
                placeholder="Describe the magic system specific to this location"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Technology Level
              </label>
              <textarea
                name="technologyLevel"
                value={formData.technologyLevel}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={4}
                placeholder="Describe the technological advancement of this location"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Climate & Environment
              </label>
              <textarea
                name="climate"
                value={formData.climate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={4}
                placeholder="Describe the climate, weather patterns, and natural environment"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Culture & Society
              </label>
              <textarea
                name="culture"
                value={formData.culture}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={4}
                placeholder="Describe the local culture, customs, and social structure"
              />
            </div>
            <div className="flex justify-end space-x-2">
              {editingLocation && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingLocation(null);
                    setFormData({
                      name: '',
                      description: '',
                      magicSystem: '',
                      technologyLevel: '',
                      climate: '',
                      culture: ''
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
                {editingLocation ? 'Update Location' : 'Add Location'}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Locations</h3>
          {locations.length === 0 ? (
            <p className="text-gray-500">No locations added yet. Add your first location above!</p>
          ) : (
            <div className="space-y-4">
              {locations.map(location => (
                <div key={location.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2">
                      <Globe className="h-5 w-5 text-indigo-600" />
                      <h4 className="text-lg font-medium">{location.name}</h4>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(location)}
                        className="p-1 text-gray-600 hover:text-indigo-600 transition-colors"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(location.id)}
                        className="p-1 text-gray-600 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><span className="font-medium">Description:</span> {location.description}</p>
                    <p><span className="font-medium">Magic System:</span> {location.magicSystem}</p>
                    <p><span className="font-medium">Technology:</span> {location.technologyLevel}</p>
                    <p><span className="font-medium">Climate:</span> {location.climate}</p>
                    <p><span className="font-medium">Culture:</span> {location.culture}</p>
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

export default WorldBasics;