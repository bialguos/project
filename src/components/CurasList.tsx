// FILE: CurasList.tsx
import React, { useEffect, useState } from 'react';

interface Cura {
  descripcion: string;
  planificada: boolean;
  frecuenciaHoras: string;
  frecuenciaMinutos: string;
  horaComienzo: string;
  estado: string;
}

const CurasList: React.FC = () => {
  const [curas, setCuras] = useState<Cura[]>([]);

  useEffect(() => {
    const savedCuras = localStorage.getItem('heridasQuirurgicas');
    if (savedCuras) {
      try {
        const parsedCuras = JSON.parse(savedCuras);
        if (Array.isArray(parsedCuras)) {
          setCuras(parsedCuras);
        } else {
          console.error('Parsed curas is not an array');
        }
      } catch (error) {
        console.error('Error parsing curas from localStorage', error);
      }
    }
  }, []);

  const calcularProximaCura = (cura: Cura) => {
    if (!cura.planificada) return null;
    const horaComienzo = new Date(cura.horaComienzo);
    const frecuenciaHoras = parseInt(cura.frecuenciaHoras, 10);
    const frecuenciaMinutos = parseInt(cura.frecuenciaMinutos, 10);
    const proximaCura = new Date(horaComienzo.getTime() + frecuenciaHoras * 60 * 60 * 1000 + frecuenciaMinutos * 60 * 1000);
    return proximaCura.toLocaleString();
  };

  return (
    <div className="bg-white rounded-md p-4">
      <h2 className="text-lg font-bold mb-4">Curas / Herida Quirúrgica</h2>
      {curas.length === 0 ? (
        <p>No hay curas guardadas.</p>
      ) : (
        <ul>
          {curas.map((cura, index) => (
            <li key={index} className="mb-4">
              <div className="flex justify-between">
                <span>{cura.descripcion}</span>
                <span>{new Date(cura.horaComienzo).toLocaleString()}</span>
              </div>
              {cura.planificada && (
                <div className="text-sm text-gray-600">
                  Próxima cura: {calcularProximaCura(cura)}
                </div>
              )}
              <div className="text-sm text-gray-600">
                Estado: {cura.estado}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CurasList;