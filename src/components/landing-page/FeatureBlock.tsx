'use client';

import React from 'react';

interface FeatureBlockProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconColor: string;
  borderColor: string;
  onClick: () => void;
}

const FeatureBlock: React.FC<FeatureBlockProps> = ({ title, description, icon, iconColor, borderColor, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`relative p-8 bg-neutral-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border border-neutral-700 ${borderColor} transform hover:-translate-y-2`}
    >
      <div className={`flex items-center justify-center ${iconColor} mb-4`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-neutral-400">
        {description}
      </p>
    </div>
  );
};

export default FeatureBlock;
