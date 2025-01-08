import React, { useEffect, useState } from 'react';
import { Circle } from 'lucide-react';
import PlannedTaskModal from './PlannedTaskModal';

export interface Cura {
  descripcion: string;
  planificada: boolean;
  frecuenciaHoras: string;
  frecuenciaMinutos: string;
  horaComienzo: string;
  estado: string;
  titulo: string;
}

interface CurasListProps {
  selectedStatus: string;
  refreshTrigger: number;
  setRefreshTrigger: React.Dispatch<React.SetStateAction<number>>;
  selectedStates: {[key: number]: 'realizado' | 'anulado' | 'cancelada' | null};
  setSelectedStates: React.Dispatch<React.SetStateAction<{[key: number]: 'realizado' | 'cancelada'| 'anulado' | null}>>;
}

const CurasList: React.FC<CurasListProps> = ({ 
  selectedStatus, 
  refreshTrigger, 
  setRefreshTrigger,
  selectedStates,
  setSelectedStates 
}) => {
  const [curas, setCuras] = useState<Cura[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCura, setSelectedCura] = useState<Cura | null>(null);
  const handleModalClose = () => {
    setShowModal(false);
    // Find index of selected cura
    if (selectedCura) {
      const selectedIndex = curas.findIndex(
        cura => cura.horaComienzo === selectedCura.horaComienzo
      );
      
      // Deselect 'realizado' radio button
      if (selectedIndex !== -1) {
        setSelectedStates(prev => ({
          ...prev,
          [selectedIndex]: null
        }));
      }
    }
    // Reset modal state
    setSelectedCura(null);
    setShowModal(false);
  };
  const handleStateChange = (index: number, state: 'realizado' | 'anulado' | 'cancelada') => {
    const cura = curas[index];
    if (cura.planificada && state === 'realizado') {
      setSelectedCura(cura);
      setShowModal(true);
    }
    setSelectedStates(prev => ({
      ...prev,
      [index]: prev[index] === state ? null : state
    }));
  };

  const handleModalSave = () => {
    if (selectedCura) {
      const savedCuras = localStorage.getItem('heridasQuirurgicas');
      if (savedCuras) {
        const allCuras = JSON.parse(savedCuras);
        // Create a new task as realized
        const newTask = {
          ...selectedCura,
          estado: 'realizado',
          horaComienzo: new Date().toISOString()
        };
        allCuras.push(newTask);
        localStorage.setItem('heridasQuirurgicas', JSON.stringify(allCuras));
        setRefreshTrigger(prev => prev + 1);
      }
    }
    setShowModal(false);
  };

  useEffect(() => {
    const savedCuras = localStorage.getItem('heridasQuirurgicas');
    if (savedCuras) {
      try {
        const parsedCuras = JSON.parse(savedCuras);
        const filteredCuras = parsedCuras.filter(
          (cura: Cura) => cura.estado === selectedStatus.toLowerCase()
        );
        setCuras(filteredCuras);
      } catch (error) {
        console.error('Error parsing curas from localStorage', error);
      }
    }
  }, [selectedStatus, refreshTrigger]);

  return (
    <div className="bg-white rounded-md">
      <div className="divide-y divide-gray-200">
        {curas.length === 0 ? (
          <p className="p-4">No hay curas guardadas.</p>
        ) : (
          curas.map((cura, index) => (
            <div key={index} className="p-4 bg-[#E6EEF9] flex justify-between">
              <div className="flex flex-col space-y-2">
                <h4 className="font-bold text-m">{cura.titulo}</h4>
                <span className="text-sm">{cura.descripcion}</span>
                <div className="flex space-x-4">
                  {cura.estado === 'realizado' ? (
                    <>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`realizado-${index}`}
                          name={`estado-${index}`}
                          checked={true}              
                          className="form-radio h-4 w-4"
                          readOnly
                        />
                        <label htmlFor={`realizado-${index}`} className="text-sm">Realizada</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`cancelar-${index}`}
                          name={`estado-${index}`}
                          checked={selectedStates[index] === 'cancelada'}
                          onChange={() => handleStateChange(index, 'cancelada')}
                          className="form-radio h-4 w-4"
                        />
                        <label htmlFor={`cancelar-${index}`} className="text-sm">Cancelar realización</label>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`realizado-${index}`}
                          name={`estado-${index}`}
                          checked={selectedStates[index] === 'realizado'}
                          onChange={() => handleStateChange(index, 'realizado')}
                          className="form-radio h-4 w-4"
                        />
                        <label htmlFor={`realizado-${index}`} className="text-sm">Realizada</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`anulado-${index}`}
                          name={`estado-${index}`}
                          checked={selectedStates[index] === 'anulado'}
                          onChange={() => handleStateChange(index, 'anulado')}
                          className="form-radio h-4 w-4"
                        />
                        <label htmlFor={`anulado-${index}`} className="text-sm">Anulada</label>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
              {cura.planificada && <span className="mr-4 font-bold text-lg">P</span>}
                <div className="flex flex-col text-xs text-gray-600">
                  <span>F.Solicitud</span>
                  <span>{new Date(cura.horaComienzo).toLocaleString()}</span>
                  <span>F.Actual</span>
                  <span>{new Date().toLocaleString()}</span>
                </div>
                <div className="flex items-center">
                
                  <Circle 
                    className={`w-6 h-6 ${
                      cura.estado === 'pendiente' 
                        ? 'text-red-500 fill-red-500' 
                        : cura.estado === 'anulado'
                          ? 'text-orange-500 fill-orange-500'
                          : 'text-green-500 fill-green-500'
                    }`}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {showModal && selectedCura && (
        <PlannedTaskModal
          isOpen={showModal}
          onClose={handleModalClose}
          onSave={handleModalSave}
          cura={selectedCura}
        />
      )}
    </div>
  );
};

export default CurasList;