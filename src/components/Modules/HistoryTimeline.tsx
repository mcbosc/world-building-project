import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Clock, Star } from 'lucide-react';

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

const HistoryTimeline = () => {
  const [events, setEvents] = useState<HistoricalEvent[]>(() => {
    const savedEvents = localStorage.getItem('historicalEvents');
    return savedEvents ? JSON.parse(savedEvents) : [];
  });
  const [editingEvent, setEditingEvent] = useState<HistoricalEvent | null>(null);
  const [eventForm, setEventForm] = useState({
    name: '',
    date: '',
    description: '',
    significance: '',
    impact: '',
    characters: '',
    artifacts: '',
    isCriticalPoint: false
  });

  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('historicalEvents', JSON.stringify(events));
  }, [events]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setEventForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEvent) {
      setEvents(prev => prev.map(event => 
        event.id === editingEvent.id ? { ...event, ...eventForm } : event
      ));
      setEditingEvent(null);
    } else {
      const newEvent = {
        id: Date.now().toString(),
        ...eventForm
      };
      setEvents(prev => [...prev, newEvent]);
    }
    setEventForm({
      name: '',
      date: '',
      description: '',
      significance: '',
      impact: '',
      characters: '',
      artifacts: '',
      isCriticalPoint: false
    });
  };

  const handleEdit = (event: HistoricalEvent) => {
    setEditingEvent(event);
    setEventForm({
      name: event.name,
      date: event.date,
      description: event.description,
      significance: event.significance,
      impact: event.impact,
      characters: event.characters,
      artifacts: event.artifacts,
      isCriticalPoint: event.isCriticalPoint
    });
  };

  const handleDelete = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  };

  // Sort events by date
  const sortedEvents = [...events].sort((a, b) => {
    // Handle different date formats (e.g., "Year 1000", "1000 CE", etc.)
    const getYear = (date: string) => {
      const match = date.match(/\d+/);
      return match ? parseInt(match[0]) : 0;
    };
    return getYear(a.date) - getYear(b.date);
  });

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">History & Timeline</h2>
      
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Historical Timeline</h2>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">
              {editingEvent ? 'Edit Historical Event' : 'Add New Historical Event'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={eventForm.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter the name of the historical event"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date/Time Period
                </label>
                <input
                  type="text"
                  name="date"
                  value={eventForm.date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter the date or time period (e.g., 'Year 1000', '1000 CE', 'Third Age')"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={eventForm.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={4}
                  placeholder="Describe what happened during this event"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Significance
                </label>
                <textarea
                  name="significance"
                  value={eventForm.significance}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={4}
                  placeholder="Explain why this event is important to the story"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Impact on the World
                </label>
                <textarea
                  name="impact"
                  value={eventForm.impact}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={4}
                  placeholder="Describe how this event changed the world"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Key Characters Involved
                </label>
                <textarea
                  name="characters"
                  value={eventForm.characters}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={4}
                  placeholder="List and describe the important characters involved in this event"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Important Artifacts or Items
                </label>
                <textarea
                  name="artifacts"
                  value={eventForm.artifacts}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={4}
                  placeholder="List any important items, artifacts, or objects associated with this event"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isCriticalPoint"
                  checked={eventForm.isCriticalPoint}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="text-sm font-medium text-gray-700">
                  Mark as Critical Story Point
                </label>
              </div>
              <div className="flex justify-end space-x-2">
                {editingEvent && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingEvent(null);
                      setEventForm({
                        name: '',
                        date: '',
                        description: '',
                        significance: '',
                        impact: '',
                        characters: '',
                        artifacts: '',
                        isCriticalPoint: false
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
                  {editingEvent ? 'Update Event' : 'Add Event'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Timeline</h3>
          {events.length === 0 ? (
            <p className="text-gray-500">No historical events added yet. Add your first event above!</p>
          ) : (
            <div className="space-y-4">
              {sortedEvents.map(event => (
                <div 
                  key={event.id} 
                  className={`border rounded-lg p-4 ${
                    event.isCriticalPoint ? 'border-indigo-500 bg-indigo-50' : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2">
                      {event.isCriticalPoint ? (
                        <Star className="h-5 w-5 text-indigo-600" />
                      ) : (
                        <Clock className="h-5 w-5 text-gray-600" />
                      )}
                      <div>
                        <h4 className="text-lg font-medium">{event.name}</h4>
                        <p className="text-sm text-gray-500">{event.date}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(event)}
                        className="p-1 text-gray-600 hover:text-indigo-600 transition-colors"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="p-1 text-gray-600 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><span className="font-medium">Description:</span> {event.description}</p>
                    <p><span className="font-medium">Significance:</span> {event.significance}</p>
                    <p><span className="font-medium">Impact:</span> {event.impact}</p>
                    <p><span className="font-medium">Characters:</span> {event.characters}</p>
                    <p><span className="font-medium">Artifacts:</span> {event.artifacts}</p>
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

export default HistoryTimeline; 