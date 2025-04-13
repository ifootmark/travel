import React from 'react';
import PlanList, { PlanItem } from '../../components/PlanList';

const mockData: PlanItem[] = [
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
];

const InProgressPlans: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">进行中的旅行</h1>
      <PlanList data={mockData} />
    </div>
  );
};

export default InProgressPlans;