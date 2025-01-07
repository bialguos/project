import React from 'react';
import { X } from 'lucide-react';

interface PlannedTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  cura: {
    titulo: string;
    descripcion: string;
    frecuenciaHoras: string;
    frecuenciaMinutos: string;
    horaComienzo: string;
  };
  enfermera?: string;
}

const PlannedTaskModal: React.FC<PlannedTaskModalProps> = ({
  isOpen,
  onClose,
  onSave,
  cura,
  enfermera = "Madrid Conde, M.Teresa"
}) => {
  if (!isOpen) return null;

  const calculateNextTimes = () => {
    const currentDate = new Date();
    const frecuenciaHoras = parseInt(cura.frecuenciaHoras) || 0;
    const frecuenciaMinutos = parseInt(cura.frecuenciaMinutos) || 0;
    const totalMinutes = (frecuenciaHoras * 60) + frecuenciaMinutos;

    return Array.from({ length: 3 }, (_, index) => {
      const nextTime = new Date(currentDate.getTime() + (totalMinutes * (index + 1) * 60000));
      return nextTime.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    });
  };

  const nextTimes = calculateNextTimes();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#E6EEF9] rounded-lg p-6 w-[600px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-800">Realización de una Orden Medica Planificada</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-gray-600">Medico o Enfermera:</label>
            <span className="ml-2 font-medium">{enfermera}</span>
          </div>

          <div>
            <span className="font-medium">{cura.titulo}</span>
          </div>
          <div>
            <span className="font-medium">{cura.descripcion}</span>
          </div>
          <div className="flex gap-4">
            <div>
              <label className="text-gray-600">Fecha/Hora Prevista Realización</label>
              <div className="font-medium">
                {new Date(cura.horaComienzo).toLocaleString('es-ES', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>

            <div>
              <label className="text-gray-600">Fecha/Hora</label>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={new Date().toLocaleString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                  className="border p-1 w-16 text-center"
                  readOnly
                />
                <span className="text-gray-600">Frecuencia</span>
                <input
                  type="text"
                  value={`${cura.frecuenciaHoras.padStart(2, '0')}:${cura.frecuenciaMinutos.padStart(2, '0')}`}
                  className="border p-1 w-16 text-center"
                  readOnly
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-gray-600 block mb-2">Próximas Horas</label>
            <div className="space-y-2">
              {nextTimes.map((time, index) => (
                <div key={index} className="font-medium">{time}</div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={onSave}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Guardar
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlannedTaskModal;