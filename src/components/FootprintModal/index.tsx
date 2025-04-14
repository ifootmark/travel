import React, { useState, useEffect } from 'react';
import { Modal, Spin, Timeline, Tag } from 'antd';
import GaodeMap from '../GaodeMap';
import { PlanItem } from '../PlanList';
import { MapPin, Camera, Coffee, Utensils, Landmark, ShoppingBag } from 'lucide-react';

interface FootprintModalProps {
  visible: boolean;
  onClose: () => void;
  plan: PlanItem | null;
}

// 目的地坐标映射表
const destinationCoordinates: Record<string, { longitude: number; latitude: number }> = {
  '浙江杭州': { longitude: 120.209, latitude: 30.246 },
  '云南丽江': { longitude: 100.233, latitude: 26.872 },
  '北京密云': { longitude: 116.843, latitude: 40.377 },
  // 默认坐标
  'default': { longitude: 116.397, latitude: 39.908 }
};

// 模拟足迹数据生成
const generateFootprints = (destination: string) => {
  const baseCoords = destinationCoordinates[destination] || destinationCoordinates.default;
  const footprints = [];
  
  // 生成不同类型的足迹点
  const footprintTypes = ['scenic', 'food', 'shopping', 'hotel', 'transportation', 'photo'];
  const footprintIcons = {
    'scenic': <Landmark size={16} className="text-green-600" />,
    'food': <Utensils size={16} className="text-orange-600" />,
    'shopping': <ShoppingBag size={16} className="text-pink-600" />,
    'hotel': <MapPin size={16} className="text-blue-600" />,
    'transportation': <MapPin size={16} className="text-purple-600" />,
    'photo': <Camera size={16} className="text-cyan-600" />
  };
  
  const footprintColors = {
    'scenic': 'green',
    'food': 'orange',
    'shopping': 'pink',
    'hotel': 'blue',
    'transportation': 'purple',
    'photo': 'cyan'
  };
  
  const footprintNames = {
    'scenic': '景点游览',
    'food': '美食体验',
    'shopping': '购物',
    'hotel': '住宿',
    'transportation': '交通',
    'photo': '拍照'
  };
  
  // 生成随机足迹
  for (let i = 0; i < 8; i++) {
    const offset = 0.02;
    const type = footprintTypes[Math.floor(Math.random() * footprintTypes.length)];
    const longitude = baseCoords.longitude + (Math.random() - 0.5) * offset;
    const latitude = baseCoords.latitude + (Math.random() - 0.5) * offset;
    
    footprints.push({
      id: `footprint-${i}`,
      position: { longitude, latitude },
      title: `${footprintNames[type]} ${i+1}`,
      type: type,
      content: generateContent(type),
      icon: footprintIcons[type],
      color: footprintColors[type],
      timestamp: new Date(new Date().getTime() - Math.floor(Math.random() * 3) * 24 * 60 * 60 * 1000).toISOString()
    });
  }
  
  // 按时间排序
  return footprints.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
};

// 生成足迹内容
const generateContent = (type: string) => {
  const contents = {
    'scenic': [
      '参观了当地著名景点，风景如画',
      '跟随导游了解了当地文化历史',
      '爬上山顶俯瞰全景，令人难忘'
    ],
    'food': [
      '品尝了当地特色美食，味道独特',
      '在网红餐厅打卡，菜品精致好看',
      '尝试了特色小吃，很有当地特色'
    ],
    'shopping': [
      '在当地市场购买了纪念品',
      '买了些手工艺品送给朋友',
      '在购物中心逛了一下午'
    ],
    'hotel': [
      '入住了舒适的酒店，设施齐全',
      '民宿风格独特，体验很好',
      '酒店服务周到，睡眠质量高'
    ],
    'transportation': [
      '乘坐当地特色交通工具前往景点',
      '租车自驾游览周边地区',
      '体验了特色观光车'
    ],
    'photo': [
      '在标志性建筑前拍了照片',
      '捕捉到了美丽的日落瞬间',
      '记录下风景如画的美景'
    ]
  };
  
  const contentList = contents[type] || contents.scenic;
  return contentList[Math.floor(Math.random() * contentList.length)];
};

const FootprintModal: React.FC<FootprintModalProps> = ({ visible, onClose, plan }) => {
  const [loading, setLoading] = useState(true);
  const [footprints, setFootprints] = useState<any[]>([]);
  
  useEffect(() => {
    if (visible && plan) {
      setLoading(true);
      // 模拟API请求延迟
      setTimeout(() => {
        const data = generateFootprints(plan.destination);
        setFootprints(data);
        setLoading(false);
      }, 800);
    }
  }, [visible, plan]);
  
  if (!plan) return null;
  
  // 获取目的地坐标作为地图中心
  const center = destinationCoordinates[plan.destination] || destinationCoordinates.default;
  
  // 将足迹数据格式转换为地图标记格式
  const mapMarkers = footprints.map(footprint => ({
    id: footprint.id,
    position: footprint.position,
    title: footprint.title,
    type: footprint.type
  }));
  
  return (
    <Modal
      title={`${plan.title} - 我的足迹`}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      {loading ? (
        <div className="h-80 flex items-center justify-center">
          <Spin size="large" tip="加载足迹数据..." />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-gray-600">目的地：</span>
              <span className="font-medium">{plan.destination}</span>
            </div>
            <div>
              <span className="text-gray-600">日期：</span>
              <span className="font-medium">{plan.startDate} 至 {plan.endDate}</span>
            </div>
          </div>
          
          <GaodeMap center={center} markers={mapMarkers} zoom={14} />
          
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-3">足迹记录</h3>
            <Timeline
              items={footprints.map((footprint) => ({
                dot: footprint.icon,
                color: footprint.color,
                children: (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-800">{footprint.title}</h4>
                      <Tag color={footprint.color}>
                        {new Date(footprint.timestamp).toLocaleDateString('zh-CN')}
                      </Tag>
                    </div>
                    <p className="text-gray-600 mt-1">{footprint.content}</p>
                  </div>
                ),
              }))}
            />
          </div>
        </div>
      )}
    </Modal>
  );
};

export default FootprintModal;