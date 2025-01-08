import React, { useState } from 'react';
import type { MenuItem } from '../types/menu';
import { menuItems } from '../data/menuItems';
import Breadcrumbs from './Breadcrumbs';
import { ChevronLeft, FolderOpen, FileText } from 'lucide-react';

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
  const [searchText, setSearchText] = useState('');

  const searchMenuItems = (items: MenuItem[], searchTerm: string): MenuItem[] => {
    let results: MenuItem[] = [];
    
    for (const item of items) {
      if (item.label.toLowerCase().includes(searchTerm.toLowerCase())) {
        results.push(item);
      }
      if (item.children) {
        results = [...results, ...searchMenuItems(item.children, searchTerm)];
      }
    }
    
    return results;
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchText(searchTerm);
    
    if (searchTerm.trim() === '') {
      setCurrentItems(menuItems);
    } else {
      const filteredItems = searchMenuItems(menuItems, searchTerm);
      setCurrentItems(filteredItems);
    }
  };

  
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
            value={searchText}
            onChange={handleSearch}
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
              className={`p-2 text-left flex items-center space-x-2 ${
                breadcrumbs.includes(item.label) ? 'bg-blue-200' : 'hover:bg-blue-100'
              } rounded`}
            >
              {item.hasChildren ? (
                <FolderOpen className="w-4 h-4 text-blue-600" />
              ) : (
                <FileText className="w-4 h-4 text-gray-600" />
              )}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;