// FILE: Sidebar.tsx
import React, { useState } from 'react';
import type { MenuItem } from '../types/menu';
import { menuItems } from '../data/menuItems';
import Breadcrumbs from './Breadcrumbs';
import { ChevronLeft } from 'lucide-react';

export interface SelectedMenuInfo {
  label: string;
  path: string;
}

interface SidebarProps {
  setSelectedMenuItem: (menuItem: SelectedMenuInfo | null) => void;
}
const Sidebar: React.FC<SidebarProps> = ({ setSelectedMenuItem }) => {
  const [currentItems, setCurrentItems] = useState<MenuItem[]>(menuItems);
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>(['INICIO']);
  const [navigationPath, setNavigationPath] = useState<MenuItem[]>([]);

  const handleItemClick = (item: MenuItem) => {
    if (item.hasChildren && item.children) {
      setCurrentItems(item.children);
      setBreadcrumbs([...breadcrumbs, item.label]);
      setNavigationPath([...navigationPath, item]);
    } else {
      const path = breadcrumbs.slice(1).join(' / ');
      setSelectedMenuItem({ 
        label: item.label,
        path: path 
      });
    }
  };

  const navigateToLevel = (level: number) => {
    if (level === 0) {
      setCurrentItems(menuItems);
      setBreadcrumbs(['INICIO']);
      setNavigationPath([]);
      setSelectedMenuItem(null);
    } else {
      const newPath = navigationPath.slice(0, level);
      const newBreadcrumbs = ['INICIO', ...newPath.map(item => item.label)];
      setCurrentItems(newPath[newPath.length - 1].children || []);
      setBreadcrumbs(newBreadcrumbs);
      setNavigationPath(newPath);
      setSelectedMenuItem(null);
    }
  };

  return (
    <div className="w-64 bg-[#E6EEF9] h-full flex flex-col">
      <Breadcrumbs 
        items={breadcrumbs} 
        onBreadcrumbClick={navigateToLevel}
      />
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="bg-white rounded-md p-2 mb-4">
          <input
            type="text"
            placeholder="Introduzca acción a realizar..."
            className="w-full p-2 text-sm border rounded"
          />
        </div>

        {breadcrumbs.length > 1 && (
          <button
            onClick={() => navigateToLevel(breadcrumbs.length - 2)}
            className="flex items-center space-x-2 p-2 mb-2 text-gray-600 hover:bg-blue-100 rounded"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm">Volver</span>
          </button>
        )}

        <div className="flex flex-col space-y-2">
          {currentItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleItemClick(item)}
              className={`p-2 text-left ${breadcrumbs.includes(item.label) ? 'bg-blue-200' : 'hover:bg-blue-100'} rounded`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;