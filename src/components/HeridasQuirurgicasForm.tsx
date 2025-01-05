// FILE: HeridasQuirurgicasForm.tsx
import React, { useState } from 'react';

const HeridasQuirurgicasForm: React.FC = () => {
  const [formData, setFormData] = useState({
    descripcion: '',
    planificada: false,
    frecuenciaHoras: '',
    frecuenciaMinutos: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para manejar el envío del formulario
  };

  return (
    <div className="bg-white rounded-md p-4">
      <h2 className="text-lg font-bold mb-4">Formulario de Heridas Quirúrgicas</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            className="mt-1 p-2 w-full border rounded"
            placeholder="Ingrese la descripción de la herida"
            value={formData.descripcion}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              descripcion: e.target.value
            }))}
          />
        </div>
        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            id="planificada"
            checked={formData.planificada}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              planificada: e.target.checked
            }))}
          />
          <label htmlFor="planificada">Planificada</label>
      
        {formData.planificada && (
          
            <><label className="block text-sm font-medium text-gray-700">Frecuencia</label><input
                          type="number"
                          className="mt-1 p-2 w-20 border rounded"
                          placeholder="Horas"
                          value={formData.frecuenciaHoras}
                          onChange={(e) => setFormData(prev => ({
                              ...prev,
                              frecuenciaHoras: e.target.value
                          }))} /><input
                              type="number"
                              className="mt-1 p-2 w-20 border rounded"
                              placeholder="Minutos"
                              value={formData.frecuenciaMinutos}
                              onChange={(e) => setFormData(prev => ({
                                  ...prev,
                                  frecuenciaMinutos: e.target.value
                              }))} /></>
        
        )}
          </div>
        <div className="flex justify-end gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Guardar
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default HeridasQuirurgicasForm;