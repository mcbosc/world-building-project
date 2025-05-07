import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface Module {
  id: string;
  name: string;
  icon: LucideIcon;
}

interface MainLayoutProps {
  children: React.ReactNode;
  modules: Module[];
  activeModule: string;
  onModuleChange: (moduleId: string) => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  modules,
  activeModule,
  onModuleChange,
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar
          modules={modules}
          activeModule={activeModule}
          onModuleChange={onModuleChange}
        />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;