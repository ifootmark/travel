import React from 'react';
import { Card } from 'antd';
import PlanForm from '../../components/PlanForm';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NewPlan: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <button 
          className="flex items-center text-blue-600 hover:text-blue-700"
          onClick={() => navigate('/plans')}
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          返回列表
        </button>
        <h1 className="text-2xl font-bold text-gray-800 m-0">创建新旅行计划</h1>
      </div>
      
      <Card>
        <PlanForm />
      </Card>
    </div>
  );
};

export default NewPlan;