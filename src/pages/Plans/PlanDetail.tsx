import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Descriptions, Button, Tag, Divider, Skeleton, Timeline, Row, Col, Tabs } from 'antd';
import { MapPin, Calendar, Users, DollarSign, ArrowLeft, Navigation, Home, Plane, Map as MapIcon, Hotel } from 'lucide-react';
import type { PlanItem } from '../../components/PlanList';
import { plansStore } from '../../stores/plansStore';
import { observer } from 'mobx-react-lite';
import GaodeMap from '../../components/GaodeMap';

const statusColors = {
  not_started: 'blue',
  in_progress: 'green',
  completed: 'purple',
};

const statusTexts = {
  not_started: '未开始',
  in_progress: '进行中',
  completed: '已完成',
};

// 目的地坐标映射表
const destinationCoordinates: Record<string, { longitude: number; latitude: number }> = {
  '浙江杭州': { longitude: 120.209, latitude: 30.246 },
  '云南丽江': { longitude: 100.233, latitude: 26.872 },
  '北京密云': { longitude: 116.843, latitude: 40.377 },
  // 默认坐标
  'default': { longitude: 116.397, latitude: 39.908 }
};

const PlanDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState<PlanItem | null>(null);
  const [mapMarkers, setMapMarkers] = useState<any[]>([]);

  useEffect(() => {
    // 模拟API调用延迟
    const timer = setTimeout(() => {
      const foundPlan = plansStore.getPlanById(id || '');
      setPlan(foundPlan || null);
      setLoading(false);
      
      // 如果找到计划，设置地图标记
      if (foundPlan) {
        // 获取目的地坐标
        const destinationCoord = destinationCoordinates[foundPlan.destination] || destinationCoordinates.default;
        
        // 生成标记点
        const markers = [
          // 酒店标记
          {
            id: 'hotel',
            position: {
              longitude: destinationCoord.longitude + 0.01,
              latitude: destinationCoord.latitude - 0.005
            },
            title: `${foundPlan.destination}大酒店`,
            type: 'hotel' as const
          },
          // 交通站点标记
          {
            id: 'transportation',
            position: {
              longitude: destinationCoord.longitude - 0.01,
              latitude: destinationCoord.latitude + 0.005
            },
            title: `${foundPlan.destination}站`,
            type: 'transportation' as const
          },
          // 景点标记
          {
            id: 'attraction1',
            position: {
              longitude: destinationCoord.longitude + 0.02,
              latitude: destinationCoord.latitude + 0.01
            },
            title: `${foundPlan.destination}景区一`,
            type: 'attraction' as const
          },
          {
            id: 'attraction2',
            position: {
              longitude: destinationCoord.longitude - 0.015,
              latitude: destinationCoord.latitude - 0.015
            },
            title: `${foundPlan.destination}景区二`,
            type: 'attraction' as const
          }
        ];
        
        setMapMarkers(markers);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton active paragraph={{ rows: 6 }} />
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl text-gray-600">未找到该行程计划</h2>
        <Button 
          type="primary" 
          onClick={() => navigate('/plans')}
          className="mt-4"
        >
          返回行程列表
        </Button>
      </div>
    );
  }

  // 模拟行程数据
  const itinerary = [
    {
      day: '第一天',
      date: plan.startDate,
      activities: [
        { time: '上午', description: '抵达目的地，入住酒店' },
        { time: '下午', description: '参观当地景点' },
        { time: '晚上', description: '品尝当地美食' },
      ]
    }
  ];

  if (plan.startDate !== plan.endDate) {
    itinerary.push({
      day: '第二天',
      date: '2024-03-16',
      activities: [
        { time: '上午', description: '徒步旅行' },
        { time: '下午', description: '文化体验活动' },
        { time: '晚上', description: '欣赏夜景' },
      ]
    });
    
    itinerary.push({
      day: '最后一天',
      date: plan.endDate,
      activities: [
        { time: '上午', description: '自由活动' },
        { time: '下午', description: '整理行李，返程' },
      ]
    });
  }

  // 获取目的地坐标
  const center = destinationCoordinates[plan.destination] || destinationCoordinates.default;

  // 定义 Tabs 的 items
  const tabItems = [
    {
      key: '1',
      label: (
        <span className="flex items-center">
          <Hotel className="w-4 h-4 mr-1" />
          住宿信息
        </span>
      ),
      children: (
        <div className="p-3 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-medium text-blue-700">{plan.destination}大酒店</h3>
          <p className="mt-2">地址: {plan.destination}市中心商业区5号</p>
          <p>联系电话: 0571-88888888</p>
          <p>入住日期: {plan.startDate}</p>
          <p>退房日期: {plan.endDate}</p>
          <p>房型: 豪华双人间</p>
          <div className="mt-2 flex">
            <Tag color="blue">含早餐</Tag>
            <Tag color="blue">免费WiFi</Tag>
            <Tag color="blue">健身房</Tag>
          </div>
        </div>
      )
    },
    {
      key: '2',
      label: (
        <span className="flex items-center">
          <Plane className="w-4 h-4 mr-1" />
          交通信息
        </span>
      ),
      children: (
        <div className="space-y-3">
          <div className="p-3 bg-green-50 rounded-lg">
            <h3 className="text-lg font-medium text-green-700">去程</h3>
            <div className="flex justify-between items-center mt-2">
              <div>
                <p className="text-lg font-semibold">杭州东站</p>
                <p className="text-sm text-gray-500">{plan.startDate} 08:30</p>
              </div>
              <div className="text-center">
                <div className="flex-1 border-t-2 border-dashed border-gray-300 w-20"></div>
                <p className="text-xs">高铁 G7802</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">{plan.destination}站</p>
                <p className="text-sm text-gray-500">{plan.startDate} 10:45</p>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-orange-50 rounded-lg">
            <h3 className="text-lg font-medium text-orange-700">返程</h3>
            <div className="flex justify-between items-center mt-2">
              <div>
                <p className="text-lg font-semibold">{plan.destination}站</p>
                <p className="text-sm text-gray-500">{plan.endDate} 16:30</p>
              </div>
              <div className="text-center">
                <div className="flex-1 border-t-2 border-dashed border-gray-300 w-20"></div>
                <p className="text-xs">高铁 G7807</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">杭州东站</p>
                <p className="text-sm text-gray-500">{plan.endDate} 18:45</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Button 
          icon={<ArrowLeft className="w-4 h-4" />} 
          onClick={() => navigate('/plans')}
        >
          返回列表
        </Button>
        <h1 className="text-2xl font-bold text-gray-800 m-0">{plan.title}</h1>
        <Tag color={statusColors[plan.status]}>
          {statusTexts[plan.status]}
        </Tag>
      </div>

      <Card className="mb-6">
        <Descriptions title="基本信息" bordered>
          <Descriptions.Item label="目的地" span={3}>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 text-gray-500 mr-1" />
              {plan.destination}
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="行程日期" span={3}>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 text-gray-500 mr-1" />
              {plan.startDate} 至 {plan.endDate}
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="人数">
            <div className="flex items-center">
              <Users className="w-4 h-4 text-gray-500 mr-1" />
              {plan.participants}人
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="预算">
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 text-gray-500 mr-1" />
              ¥{plan.budget.toLocaleString()}
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="状态">
            <Tag color={statusColors[plan.status]}>
              {statusTexts[plan.status]}
            </Tag>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* 地图信息 */}
      <Card title={
        <div className="flex items-center">
          <MapIcon className="w-5 h-5 text-blue-500 mr-2" />
          <span>地图导航</span>
        </div>
      } className="mb-6">
        <GaodeMap center={center} markers={mapMarkers} zoom={12} />
        
        <div className="mt-4">
          <Tabs defaultActiveKey="1" items={tabItems} />
        </div>
      </Card>

      <Card title="行程安排" className="mb-6">
        {itinerary.map((day, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-medium text-gray-700">{day.day} ({day.date})</h3>
            <Timeline
              items={day.activities.map(activity => ({
                children: (
                  <div>
                    <p className="font-medium">{activity.time}</p>
                    <p>{activity.description}</p>
                  </div>
                ),
              }))}
            />
            {index < itinerary.length - 1 && <Divider />}
          </div>
        ))}
      </Card>
    </div>
  );
};

export default observer(PlanDetail);