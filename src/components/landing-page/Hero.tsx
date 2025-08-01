'use client';

import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto mb-12">
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-600">
        Chào mừng đến với STSV
      </h2>
      <p className="text-lg sm:text-xl text-neutral-400">
        Nơi bạn có thể khám phá hai thế giới: trò chuyện thông minh với Chatbot AI hoặc kết nối ẩn danh với một người lạ.
      </p>
    </div>
  );
};

export default Hero;
