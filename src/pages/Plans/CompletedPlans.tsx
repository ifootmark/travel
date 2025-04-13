import React from 'react';
import PlanList, { PlanItem } from '../../components/PlanList';

const mockData: PlanItem[] = [
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

const CompletedPlans: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">已完成的旅行</h1>
      <PlanList data={mockData} />
    </div>
  );
};

export default CompletedPlans;