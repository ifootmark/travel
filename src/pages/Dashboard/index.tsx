import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { MapPin, Calendar, Clock, CheckCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">欢迎回来，旅行者</h1>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="hover:shadow-lg transition-shadow">
            <Statistic 
              title="总计划数" 
              value={12}
              prefix={<MapPin className="w-5 h-5 text-blue-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="hover:shadow-lg transition-shadow">
            <Statistic 
              title="未开始" 
              value={5}
              prefix={<Calendar className="w-5 h-5 text-orange-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="hover:shadow-lg transition-shadow">
            <Statistic 
              title="进行中" 
              value={4}
              prefix={<Clock className="w-5 h-5 text-green-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="hover:shadow-lg transition-shadow">
            <Statistic 
              title="已完成" 
              value={3}
              prefix={<CheckCircle className="w-5 h-5 text-purple-500" />}
            />
          </Card>
        </Col>
      </Row>

      <Card title="近期旅行计划" className="mt-6">
        <div className="space-y-4">
          <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">杭州西湖之旅</h3>
                <p className="text-gray-500">计划日期：2024-03-15 至 2024-03-17</p>
              </div>
              <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-600">
                未开始
              </span>
            </div>
          </div>
          
          <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">云南丽江古城游</h3>
                <p className="text-gray-500">计划日期：2024-03-20 至 2024-03-25</p>
              </div>
              <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-600">
                进行中
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;