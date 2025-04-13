import React from 'react';
import { Button } from 'antd';
import { Plus } from 'lucide-react';
import PlanList, { PlanItem } from '../../components/PlanList';

const mockData: PlanItem[] = [
  {
    id: '1',
    title: '杭州西湖之旅',
    destination: '浙江杭州',
    startDate: '2024-03-15',
    endDate: '2024-03-17',
    participants: 4,
    status: 'not_started',
    budget: 3000,
  },
  {
    id: '2',
    title: '云南丽江古城游',
    destination: '云南丽江',
    startDate: '2024-03-20',
    endDate: '2024-03-25',
    participants: 2,
    status: 'in_progress',
    budget: 5000,
  },
  {
    id: '3',
    title: '北京长城一日游',
    destination: '北京密云',
    startDate: '2024-02-28',
    endDate: '2024-02-28',
    participants: 3,
    status: 'completed',
    budget: 1500,
  },
];

const AllPlans: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">所有旅行计划</h1>
        <Button type="primary" icon={<Plus className="w-4 h-4" />}>
          新建计划
        </Button>
      </div>
      <PlanList data={mockData} />
    </div>
  );
};

export default AllPlans;