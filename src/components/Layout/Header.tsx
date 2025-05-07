import { BookOpen } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-8 w-8" />
          <h1 className="text-2xl font-bold">WorldForge</h1>
        </div>
        <nav className="hidden md:flex space-x-4">
          <button className="px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
            Save
          </button>
          <button className="px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
            Export
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;