import React, { useEffect, useRef, useState } from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';
import { Spin } from 'antd';

interface Position {
  longitude: number;
  latitude: number;
}

interface MapMarker {
  id: string;
  position: Position;
  title: string;
  type: 'hotel' | 'transportation' | 'attraction';
}

interface GaodeMapProps {
  center?: Position;
  zoom?: number;
  markers?: MapMarker[];
}

// 高德地图密钥 - 实际项目中应在环境变量中配置
const MAP_KEY = 'c81d36734ded07fe9e583d7f5e15760c';

const GaodeMap: React.FC<GaodeMapProps> = ({ 
  center = { longitude: 120.2, latitude: 30.3 },
  zoom = 12,
  markers = []
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [mapInstance, setMapInstance] = useState<any>(null);
  
  // 初始化地图
  useEffect(() => {
    if (!mapRef.current) return;
    
    AMapLoader.load({
      key: MAP_KEY,
      version: '2.0',
      plugins: ['AMap.Scale', 'AMap.ToolBar', 'AMap.MarkerClusterer'],
    })
      .then((AMap) => {
        const map = new AMap.Map(mapRef.current, {
          zoom,
          center: [center.longitude, center.latitude],
          viewMode: '3D',
        });
        
        map.addControl(new AMap.Scale());
        map.addControl(new AMap.ToolBar());
        
        setMapInstance(map);
        setLoading(false);
      })
      .catch((error) => {
        console.error('地图加载失败:', error);
        setLoading(false);
      });
      
    return () => {
      if (mapInstance) {
        mapInstance.destroy();
      }
    };
  }, [center.latitude, center.longitude, zoom]);
  
  // 添加标记点
  useEffect(() => {
    if (!mapInstance || markers.length === 0) return;
    
    // 清除现有标记
    mapInstance.clearMap();
    
    // 创建标记并添加到地图
    markers.forEach((marker) => {
      const iconUrl = marker.type === 'hotel' 
        ? '//a.amap.com/jsapi_demos/static/demo-center/icons/hotel.png'
        : marker.type === 'transportation'
        ? '//a.amap.com/jsapi_demos/static/demo-center/icons/train.png'
        : '//a.amap.com/jsapi_demos/static/demo-center/icons/scenic.png';
      
      const markerInstance = new window.AMap.Marker({
        position: [marker.position.longitude, marker.position.latitude],
        title: marker.title,
        icon: new window.AMap.Icon({
          size: new window.AMap.Size(24, 24),
          image: iconUrl,
          imageSize: new window.AMap.Size(24, 24),
        }),
        anchor: 'bottom-center',
      });
      
      markerInstance.setMap(mapInstance);
      
      // 创建信息窗体
      const infoWindow = new window.AMap.InfoWindow({
        content: `<div class="p-2"><h3 class="font-bold text-base mb-1">${marker.title}</h3><p>${marker.type === 'hotel' ? '住宿地点' : marker.type === 'transportation' ? '交通枢纽' : '景点'}</p></div>`,
        offset: new window.AMap.Pixel(0, -30),
      });
      
      // 绑定点击事件
      markerInstance.on('click', () => {
        infoWindow.open(mapInstance, markerInstance.getPosition());
      });
    });
    
    // // 调整地图视野以包含所有标记
    // if (markers.length > 1) {
    //   const bounds = markers.map(marker => [marker.position.longitude, marker.position.latitude]);
    //   mapInstance.setFitView(bounds);
    // }
  }, [mapInstance, markers]);
  
  return (
    <div className="w-full h-80 relative rounded-lg overflow-hidden">
      <Spin spinning={loading} tip="地图加载中...">
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
        </div>
      </Spin>
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};

export default GaodeMap;