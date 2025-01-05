import React from 'react';
import { Stethoscope } from 'lucide-react';

const Header = () => {
  return (
    <div className="bg-white p-4 border-b flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Stethoscope className="w-6 h-6 text-gray-600" />
        <h1 className="text-xl text-gray-700">Cuidados de Enfermería</h1>
      </div>
      <div className="text-right">
        <span className="text-sm text-gray-600">ESTADO</span>
      </div>
    </div>
  );
};

export default Header;