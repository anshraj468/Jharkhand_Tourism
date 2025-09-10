// src/components/MainLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const MainLayout: React.FC = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet /> {/* This is where your page components will be rendered */}
      </main>
    </div>
  );
};

export default MainLayout;