import { DivideIcon as LucideIcon } from 'lucide-react';

interface Module {
  id: string;
  name: string;
  icon: LucideIcon;
}

interface SidebarProps {
  modules: Module[];
  activeModule: string;
  onModuleChange: (moduleId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ modules, activeModule, onModuleChange }) => {
  return (
    <aside className="w-64 bg-white shadow-md h-[calc(100vh-4rem)]">
      <nav className="p-4">
        <ul className="space-y-2">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <li key={module.id}>
                <button
                  onClick={() => onModuleChange(module.id)}
                  className={`w-full flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                    activeModule === module.id
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{module.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;