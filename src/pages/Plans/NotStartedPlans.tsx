import React from 'react';
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
];

const NotStartedPlans: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">未开始的旅行</h1>
      <PlanList data={mockData} />
    </div>
  );
};

export default NotStartedPlans;