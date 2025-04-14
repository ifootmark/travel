import React from 'react';
import PlanList from '../../components/PlanList';
import { plansStore } from '../../stores/plansStore';
import { observer } from 'mobx-react-lite';

const NotStartedPlans: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">未开始的旅行</h1>
      <PlanList data={plansStore.notStartedPlans} />
    </div>
  );
};

export default observer(NotStartedPlans);