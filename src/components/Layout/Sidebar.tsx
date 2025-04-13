import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { Layout as LayoutIcon, List, CheckCircle, Clock, Calendar } from 'lucide-react';

const { Sider } = Layout;

const menuItems: MenuProps['items'] = [
  {
    key: '/dashboard',
    icon: <LayoutIcon className="w-4 h-4" />,
    label: '仪表盘',
  },
  {
    key: '/plans',
    icon: <List className="w-4 h-4" />,
    label: '所有计划',
  },
  {
    key: '/plans/completed',
    icon: <CheckCircle className="w-4 h-4" />,
    label: '已完成',
  },
  {
    key: '/plans/in-progress',
    icon: <Clock className="w-4 h-4" />,
    label: '进行中',
  },
  {
    key: '/plans/not-started',
    icon: <Calendar className="w-4 h-4" />,
    label: '未开始',
  },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key);
  };

  return (
    <Sider width={256} className="bg-gray-50" theme="light">
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={handleMenuClick}
        className="h-full border-none"
      />
    </Sider>
  );
};

export default Sidebar;