// MainContent.tsx
import React, { useState } from 'react';
import { RefreshCw, Save } from 'lucide-react';
import HeridasQuirurgicasForm from './HeridasQuirurgicasForm';
import CurasList, { Cura } from './CurasList';
import { SelectedMenuInfo } from './Sidebar';

const styles = `
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spin {
  animation: spin 2s linear;
}
`;

interface MainContentProps {
  selectedMenuItem: SelectedMenuInfo | null;
  setSelectedMenuItem: (menuItem: SelectedMenuInfo | null) => void;
}
interface SelectedStates {
  [id: string]: 'realizado' | 'anulado' | 'cancelada' | 'finalizado' | 'stop' | null;
}
const MainContent: React.FC<MainContentProps> = ({ selectedMenuItem, setSelectedMenuItem }) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('Pendiente');
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedStates, setSelectedStates] = useState<SelectedStates>({});

  const handleSave = () => {
    const savedCuras = localStorage.getItem('heridasQuirurgicas');
    if (savedCuras) {
      try {
        let allCuras = JSON.parse(savedCuras);
        allCuras = allCuras.map((cura: Cura, index: number) => {
          console.log('cura.estado:', cura.estado); 
          console.log('selectedStates[index]:', selectedStates[cura.id]); 
          if (cura.estado === 'realizado' && selectedStates[cura.id] === 'cancelada') {
            return { ...cura, estado: 'pendiente' };
          } 
          else if (cura.estado === 'pendiente' && selectedStates[cura.id] === 'anulado') {
            return { ...cura, estado: 'anulado' };
          } 
          else if (selectedStates[cura.id] === 'realizado') {
            return { ...cura, estado: 'realizado' };
          }
          else if (cura.estado === 'pendiente' && selectedStates[cura.id] === 'finalizado') {
            return { ...cura, estado: 'finalizado' };
          }
          else if (cura.estado === 'pendiente' && selectedStates[cura.id] === 'stop') {
            return { ...cura, estado: 'stop' };
          }
          return cura;
        });
        localStorage.setItem('heridasQuirurgicas', JSON.stringify(allCuras));
        setRefreshTrigger(prev => prev + 1);
      } catch (error) {
        console.error('Error saving curas:', error);
      }
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setRefreshTrigger(prev => prev + 1);
    
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="flex-1 p-4">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 flex justify-between items-center border-b">
            <h2 className="text-lg text-gray-700">Registro de Enfermería</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Estado</span>
              <select 
                className="border rounded px-2 py-1 text-sm"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option>Pendiente</option>
                <option>Realizado</option>
                <option>Stop</option>
                <option>Anulado</option>
                <option>Finalizado</option>
              </select>
              <button 
                className="p-1 hover:bg-gray-100 rounded"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={`w-5 h-5 text-gray-600 ${isRefreshing ? 'spin' : ''}`} />
              </button>
              <button 
                className="p-1 hover:bg-gray-100 rounded"
                onClick={handleSave}
              >
                <Save className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
          <div className="p-4">
            {selectedMenuItem?.label === 'Herida Quirúrgica' ? (
              <HeridasQuirurgicasForm 
                setSelectedMenuItem={setSelectedMenuItem} 
                breadcrumbPath={selectedMenuItem.path}
                selectionMenuItem={selectedMenuItem?.label}
              />
            ) : (
              <CurasList 
                selectedStatus={selectedStatus} 
                refreshTrigger={refreshTrigger}
                setRefreshTrigger={setRefreshTrigger}
                selectedStates={selectedStates}
                setSelectedStates={setSelectedStates}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainContent;