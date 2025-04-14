import React from 'react';
import { Layout, Dropdown, Avatar, Space } from 'antd';
import { Compass, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authStore } from '../../stores/authStore';
import type { MenuProps } from 'antd';

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authStore.logout();
    navigate('/login');
  };

  const items: MenuProps['items'] = [
    {
      key: 'profile',
      label: '个人中心',
      icon: <User className="w-4 h-4" />,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: '退出系统',
      icon: <LogOut className="w-4 h-4" />,
      onClick: handleLogout,
    },
  ];

  return (
    <AntHeader className="bg-white shadow-md px-6 h-16 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Compass className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-800 m-0">行知天下</h1>
      </div>
      <Dropdown menu={{ items }} placement="bottomRight">
        <Space className="cursor-pointer">
          <Avatar className="bg-blue-500">{authStore.user?.username?.[0]?.toUpperCase()}</Avatar>
          <span className="text-gray-700">{authStore.user?.username}</span>
        </Space>
      </Dropdown>
    </AntHeader>
  );
};

export default Header;