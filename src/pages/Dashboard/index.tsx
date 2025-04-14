import React from 'react';
import { Card, Row, Col, Statistic, Button } from 'antd';
import { MapPin, Calendar, Clock, CheckCircle, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { plansStore } from '../../stores/plansStore';
import { observer } from 'mobx-react-lite';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">欢迎回来，旅行者</h1>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="hover:shadow-lg transition-shadow">
            <Statistic 
              title="总计划数" 
              value={plansStore.plans.length}
              prefix={<MapPin className="w-5 h-5 text-blue-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="hover:shadow-lg transition-shadow">
            <Statistic 
              title="未开始" 
              value={plansStore.notStartedPlans.length}
              prefix={<Calendar className="w-5 h-5 text-orange-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="hover:shadow-lg transition-shadow">
            <Statistic 
              title="进行中" 
              value={plansStore.inProgressPlans.length}
              prefix={<Clock className="w-5 h-5 text-green-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="hover:shadow-lg transition-shadow">
            <Statistic 
              title="已完成" 
              value={plansStore.completedPlans.length}
              prefix={<CheckCircle className="w-5 h-5 text-purple-500" />}
            />
          </Card>
        </Col>
      </Row>

      <Card 
        title="近期旅行计划" 
        className="mt-6"
        extra={
          <Button 
            type="primary" 
            icon={<Plus className="w-4 h-4" />}
            onClick={() => navigate('/plans/new')}
          >
            新建计划
          </Button>
        }
      >
        <div className="space-y-4">
          {plansStore.plans.slice(0, 2).map(plan => (
            <div key={plan.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">{plan.title}</h3>
                  <p className="text-gray-500">计划日期：{plan.startDate} 至 {plan.endDate}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  plan.status === 'not_started' ? 'bg-blue-100 text-blue-600' : 
                  plan.status === 'in_progress' ? 'bg-green-100 text-green-600' : 
                  'bg-purple-100 text-purple-600'
                }`}>
                  {plan.status === 'not_started' ? '未开始' : 
                   plan.status === 'in_progress' ? '进行中' : '已完成'}
                </span>
              </div>
              <div className="mt-2 flex justify-end">
                <Button 
                  type="link" 
                  onClick={() => navigate(`/plans/${plan.id}`)}
                >
                  查看详情
                </Button>
              </div>
            </div>
          ))}

          {plansStore.plans.length === 0 && (
            <div className="text-center py-6">
              <p className="text-gray-500">暂无旅行计划</p>
              <Button 
                type="primary" 
                className="mt-2"
                onClick={() => navigate('/plans/new')}
              >
                创建您的第一个旅行计划
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default observer(Dashboard);