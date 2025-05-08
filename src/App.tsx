import { useState } from 'react';
import { 
  Compass, 
  Users, 
  Network, 
  Landmark, 
  Clock, 
  PlusCircle,
  BookOpen,
  GitBranch
} from 'lucide-react';
import MainLayout from './components/Layout/MainLayout';
import WorldBasics from './components/Modules/WorldBasics';
import RacesCreatures from './components/Modules/RacesCreatures';
import Characters from './components/Modules/Characters';
import FactionsPolitics from './components/Modules/FactionsPolitics';
import HistoryTimeline from './components/Modules/HistoryTimeline';
import CustomQuestions from './components/Modules/CustomQuestions';
import TimelineVisualization from './components/Modules/TimelineVisualization';

function App() {
  const [activeModule, setActiveModule] = useState('world-basics');

  const modules = [
    { id: 'world-basics', name: 'World Basics', icon: Compass },
    { id: 'races-creatures', name: 'Races & Creatures', icon: Users },
    { id: 'characters', name: 'Characters', icon: Network },
    { id: 'factions-politics', name: 'Factions & Politics', icon: Landmark },
    { id: 'history-timeline', name: 'History & Timeline', icon: Clock },
    { id: 'timeline-visualization', name: 'Timeline Graph', icon: GitBranch },
    { id: 'custom-questions', name: 'Custom Questions', icon: PlusCircle },
  ];

  return (
    <MainLayout 
      modules={modules} 
      activeModule={activeModule} 
      onModuleChange={setActiveModule}
    >
      {activeModule === 'world-basics' && <WorldBasics />}
      {activeModule === 'races-creatures' && <RacesCreatures />}
      {activeModule === 'characters' && <Characters />}
      {activeModule === 'factions-politics' && <FactionsPolitics />}
      {activeModule === 'history-timeline' && <HistoryTimeline />}
      {activeModule === 'timeline-visualization' && <TimelineVisualization />}
      {activeModule === 'custom-questions' && <CustomQuestions />}
    </MainLayout>
  );
}

export default App;