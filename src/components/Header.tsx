import React from 'react';
import { Stethoscope } from 'lucide-react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const Header = () => {
  // Datos del paciente (puedes reemplazar estos valores con datos reales)
  const paciente = {
    nombre: 'Juan Pérez',
    sexo: 'Masculino',
    edad: 45,
    numeroHistoria: '123456',
    fechaIngreso: '01/01/2025',
    diaIngreso: 'Lunes',
    puntoAtencion: 'Sala 3'
  };

  // Lista de alergias (puedes reemplazar estos valores con datos reales)
  const alergias = ['Penicilina', 'Polen', 'Mariscos'];

  return (
    <div className="bg-white p-4 border-b flex items-center">
         <div className="flex items-center space-x-2">
        <Stethoscope className="w-6 h-6 text-gray-600" />
        <h1 className="text-xl text-gray-700">Cuidados de Enfermería</h1>
      </div>
      <div className="flex-1 text-center">
        <h2 className="text-lg font-bold">{paciente.nombre}</h2>
        <p className="text-sm text-gray-600">
          {paciente.sexo} {paciente.edad} años | His: {paciente.numeroHistoria} | {paciente.fechaIngreso}
        </p>
        <p className="text-sm text-gray-600">
          Día Ingreso: {paciente.diaIngreso} | Punto Atención: {paciente.puntoAtencion}
        </p>
      </div>
      <div className="flex flex-col space-y-2">
      <button
          className="relative px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
          data-tooltip-id="alergiasTooltip"
    
        >
          Alergias
          <span className="absolute top-0 right-0 inline-block w-4 h-4 bg-red-600 text-white text-xs rounded-full text-center">
            {alergias.length}
          </span>
        </button>
        <Tooltip 
          id="alergiasTooltip"
          place="left"
        >
          <ul className="list-none  pl-0">
            {alergias.map((alergia, idx) => (
              <li key={idx}>{alergia}</li>
            ))}
          </ul>
        </Tooltip>
        <button className="px-2 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">Alertas</button>
        <button className="px-2 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">Antecedentes</button>
      </div>
      
   
    </div>
  );
};

export default Header;