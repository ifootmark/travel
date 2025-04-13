import React from 'react';
import { Layout } from 'antd';
import { Compass } from 'lucide-react';

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  return (
    <AntHeader className="bg-white shadow-md px-6 h-16 flex items-center">
      <div className="flex items-center space-x-3">
        <Compass className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-800 m-0">行知天下</h1>
      </div>
    </AntHeader>
  );
};

export default Header;