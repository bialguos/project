import React, { useEffect, useState } from 'react';
import { Circle } from 'lucide-react';

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
  selectedStates: {[key: number]: 'realizado' | 'anulado' | 'cancelada' | null};
  setSelectedStates: React.Dispatch<React.SetStateAction<{[key: number]: 'realizado' | 'cancelada'| 'anulado' | null}>>;
}

const CurasList: React.FC<CurasListProps> = ({ selectedStatus, refreshTrigger, selectedStates,
    setSelectedStates }) => {
  const [curas, setCuras] = useState<Cura[]>([]);
  

  const handleStateChange = (index: number, state: 'realizado' | 'anulado' | 'cancelada') => {
    setSelectedStates(prev => ({
      ...prev,
      [index]: prev[index] === state ? null : state
    }));
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
    <div className="flex flex-col text-xs text-gray-600">
      <span>F.Solicitud</span>
      <span>{new Date(cura.horaComienzo).toLocaleString()}</span>
      <span>F.Actual</span>
      <span>{new Date().toLocaleString()}</span>
    </div>
    <div className="flex items-center">
      <span className="mr-2">P</span>
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
    </div>
  );
};

export default CurasList;