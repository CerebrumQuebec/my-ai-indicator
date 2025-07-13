import React from 'react';

// Simplified floating particles component to prevent animation errors
const FloatingParticles: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none"></div>
  );
};

export default FloatingParticles;