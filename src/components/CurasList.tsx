import React, { useEffect, useState } from 'react';
import { Circle } from 'lucide-react';
import PlannedTaskModal from './PlannedTaskModal';

export interface Cura {
  id: string;
  descripcion: string;
  planificada: boolean;
  frecuenciaHoras: string;
  frecuenciaMinutos: string;
  horaComienzo: string;
  fechaPrevista?: string;  
  estado: string;
  titulo: string;
}

interface CurasListProps {
  selectedStatus: string;
  refreshTrigger: number;
  setRefreshTrigger: React.Dispatch<React.SetStateAction<number>>;
  selectedStates: {[id: string]: 'realizado' | 'anulado' | 'cancelada' | 'finalizado' | 'stop' | null};
  setSelectedStates: React.Dispatch<React.SetStateAction<{[id: string]: 'realizado' | 'anulado' | 'cancelada' | 'finalizado' | 'stop' | null}>>;
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
  const handleStateChange = (id: string, state: 'realizado' | 'anulado' | 'cancelada' | 'finalizado' | 'stop') => {
    const cura = curas.find(c => c.id === id);
    if (cura?.planificada && state === 'realizado') {
      setSelectedCura(cura);
      setShowModal(true);
    }
    setSelectedStates(prev => ({
      ...prev,
      [id]: prev[id] === state ? null : state
    }));
  };

  const calculateNextDate = (cura: Cura): Date => {
    const currentDate = new Date();
    const frecuenciaHoras = parseInt(cura.frecuenciaHoras) || 0;
    const frecuenciaMinutos = parseInt(cura.frecuenciaMinutos) || 0;
    const totalMinutes = (frecuenciaHoras * 60) + frecuenciaMinutos;
    
    return new Date(currentDate.getTime() + totalMinutes * 60000);
  };

  
  const handleModalSave = () => {
    if (selectedCura) {
      const savedCuras = localStorage.getItem('heridasQuirurgicas');
      if (savedCuras) {
        const allCuras = JSON.parse(savedCuras);
        const nextDate = calculateNextDate(selectedCura);
        
        // Create new task with unique ID
        const newTask = {
          ...selectedCura,
          id: crypto.randomUUID(), // Generate unique ID
          estado: 'pendiente',          
          fechaPrevista: nextDate.toISOString() // Keep ISO format
        };
        
        // Update original task using ID
        const originalIndex = allCuras.findIndex(
          (cura: Cura) => cura.id === selectedCura.id
        );
        if (originalIndex !== -1) {
          allCuras[originalIndex] = {
            ...allCuras[originalIndex],
            estado: 'realizado'
          };
        }
        
        allCuras.push(newTask);
        localStorage.setItem('heridasQuirurgicas', JSON.stringify(allCuras));
        setRefreshTrigger(prev => prev + 1);
      }
    }
    handleModalClose();
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
                          checked={selectedStates[cura.id] === 'cancelada'}
                          onChange={() => handleStateChange(cura.id, 'cancelada')}
                          className="form-radio h-4 w-4"
                        />
                        <label htmlFor={`cancelar-${index}`} className="text-sm">Cancelar realización</label>
                      </div>
                    </>
                  ) : (
                    <>
                    
                      {!cura.estado.includes('realizado')  &&  typeof cura.fechaPrevista === 'undefined'  ? (
  // Show only Realizado and Anulado buttons
  <>
    <div className="flex items-center space-x-2">
      
      <input
        type="radio"
        id={`realizado-${index}`}
        name={`estado-${index}`}
        checked={selectedStates[cura.id] === 'realizado'}
        onChange={() => handleStateChange(cura.id, 'realizado')}
        className="form-radio h-4 w-4"
      />
      <label htmlFor={`realizado-${index}`} className="text-sm">Realizada</label>
    </div>
    <div className="flex items-center space-x-2">
      <input
        type="radio"
        id={`anulado-${index}`}
        name={`estado-${index}`}
        checked={selectedStates[cura.id] === 'anulado'}
        onChange={() => handleStateChange(cura.id, 'anulado')}
        className="form-radio h-4 w-4"
      />
      <label htmlFor={`anulado-${index}`} className="text-sm">Anulada</label>
    </div>
  </>
) : (
  // Show all four buttons
  <>  
    <div className="flex items-center space-x-2">
      <input
        type="radio"
        id={`realizado-${index}`}
        name={`estado-${index}`}
        checked={selectedStates[cura.id] === 'realizado'}
        onChange={() => handleStateChange(cura.id, 'realizado')}
        className="form-radio h-4 w-4"
      />
      <label htmlFor={`realizado-${index}`} className="text-sm">Realizada</label>
    </div>
    <div className="flex items-center space-x-2">
      <input
        type="radio"
        id={`anulado-${index}`}
        name={`estado-${index}`}
        checked={selectedStates[cura.id] === 'anulado'}
        onChange={() => handleStateChange(cura.id, 'anulado')}
        className="form-radio h-4 w-4"
      />
      <label htmlFor={`anulado-${index}`} className="text-sm">Anulada</label>
    </div>
    <div className="flex items-center space-x-2">
      <input
        type="radio"
        id={`finalizado-${index}`}
        name={`estado-${index}`}
        checked={selectedStates[cura.id] === 'finalizado'}
        onChange={() => handleStateChange(cura.id, 'finalizado')}
        className="form-radio h-4 w-4"
      />
      <label htmlFor={`finalizado-${index}`} className="text-sm">Finalizado</label>
    </div>
    <div className="flex items-center space-x-2">
      <input
        type="radio"
        id={`stop-${index}`}
        name={`estado-${index}`}
        checked={selectedStates[cura.id] === 'stop'}
        onChange={() => handleStateChange(cura.id, 'stop')}
        className="form-radio h-4 w-4"
      />
      <label htmlFor={`stop-${index}`} className="text-sm">Stop</label>
    </div>
  </>
)}
                      
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
                  <span>
                    {cura.fechaPrevista 
                      ? new Date(cura.fechaPrevista).toLocaleString() 
                      : new Date().toLocaleString()
                    }
                  </span>
                                  </div>
                <div className="flex items-center">
                
                <Circle 
  className={`w-6 h-6 ${
    cura.estado === 'pendiente' 
      ? 'text-red-500 fill-red-500' 
      : cura.estado === 'anulado'
        ? 'text-orange-500 fill-orange-500'
        : cura.estado === 'stop'
          ? 'text-blue-500 fill-blue-500'
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