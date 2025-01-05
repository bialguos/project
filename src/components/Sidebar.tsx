import React, { useState } from 'react';
import { FolderArchive, FileText, ChevronLeft } from 'lucide-react';
import { MenuItem } from '../types/menu';
import { menuItems } from '../data/menuItems';
import Breadcrumbs from './Breadcrumbs';

const Sidebar = () => {
  const [currentItems, setCurrentItems] = useState<MenuItem[]>(menuItems);
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>(['INICIO']);
  const [navigationPath, setNavigationPath] = useState<MenuItem[]>([]);

  const handleItemClick = (item: MenuItem) => {
    if (item.hasChildren && item.children) {
      setCurrentItems(item.children);
      setBreadcrumbs([...breadcrumbs, item.label]);
      setNavigationPath([...navigationPath, item]);
    }
  };

  const navigateToLevel = (level: number) => {
    if (level === 0) {
      setCurrentItems(menuItems);
      setBreadcrumbs(['INICIO']);
      setNavigationPath([]);
    } else {
      const newPath = navigationPath.slice(0, level);
      const newBreadcrumbs = ['INICIO', ...newPath.map(item => item.label)];
      
      setNavigationPath(newPath);
      setBreadcrumbs(newBreadcrumbs);
      setCurrentItems(
        newPath.length > 0 
          ? newPath[newPath.length - 1].children || [] 
          : menuItems
      );
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

        <div className="space-y-2">
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-2 p-2 hover:bg-blue-100 cursor-pointer rounded"
              onClick={() => handleItemClick(item)}
            >
              {item.hasChildren ? (
                <FolderArchive className="w-5 h-5 text-gray-600" />
              ) : (
                <FileText className="w-5 h-5 text-gray-600" />
              )}
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;