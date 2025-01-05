import React from 'react';
import { RefreshCw, Save } from 'lucide-react';
import HeridasQuirurgicasForm from './HeridasQuirurgicasForm';
import CurasList from './CurasList';
interface MainContentProps {
  selectedMenuItem: string | null;
  setSelectedMenuItem: (menuItem: string | null) => void;
}

const MainContent: React.FC<MainContentProps> = ({ selectedMenuItem, setSelectedMenuItem }) => {
  return (
    <div className="flex-1 p-4">
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg text-gray-700">Registro de Enfermería</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Estado</span>
            <select className="border rounded px-2 py-1 text-sm">
              <option>Pendiente</option>
              <option>Completado</option>
            </select>
            <button className="p-1 hover:bg-gray-100 rounded">
              <RefreshCw className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded">
              <Save className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
        <div className="p-4">
        {selectedMenuItem === 'Herida Quirúrgica' ? (
        <HeridasQuirurgicasForm setSelectedMenuItem={setSelectedMenuItem} />
      ) : (
        <CurasList />
      )}
        </div>
      </div>
    </div>
  );
};

export default MainContent;