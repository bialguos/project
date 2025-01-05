// FILE: App.tsx
import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

function App() {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <div className="flex flex-1">
        <Sidebar setSelectedMenuItem={setSelectedMenuItem} />
        <MainContent selectedMenuItem={selectedMenuItem} />
      </div>
    </div>
  );
}

export default App;