import React, { useState } from 'react';
import { Button } from 'antd';
import { Plus } from 'lucide-react';
import PlanList from '../../components/PlanList';
import PlanModal from '../../components/PlanModal';
import { plansStore } from '../../stores/plansStore';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

const AllPlans: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleNewPlan = () => {
    // Option 1: Show modal
    setModalVisible(true);
    
    // Option 2: Navigate to new plan page
    // navigate('/plans/new');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">所有旅行计划</h1>
        <Button 
          type="primary" 
          icon={<Plus className="w-4 h-4" />}
          onClick={handleNewPlan}
        >
          新建计划
        </Button>
      </div>
      <PlanList data={plansStore.plans} />
      <PlanModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
      />
    </div>
  );
};

export default observer(AllPlans);