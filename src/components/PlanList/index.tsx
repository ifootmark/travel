import React, { useState } from 'react';
import { Table, Tag, Button, Space, Popconfirm, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { MapPin, Calendar, Users, MoreHorizontal, Eye, Footprints, Edit, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';
import FootprintModal from '../FootprintModal';
import PlanModal from '../PlanModal';
import { plansStore } from '../../stores/plansStore';

export interface PlanItem {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  participants: number;
  status: 'not_started' | 'in_progress' | 'completed';
  budget: number;
}

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

interface PlanListProps {
  data: PlanItem[];
  loading?: boolean;
}

const PlanList: React.FC<PlanListProps> = ({ data, loading }) => {
  const [footprintModalVisible, setFootprintModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanItem | null>(null);
  
  const handleShowFootprints = (plan: PlanItem) => {
    setSelectedPlan(plan);
    setFootprintModalVisible(true);
  };

  const handleEdit = (plan: PlanItem) => {
    setSelectedPlan(plan);
    setEditModalVisible(true);
  };
  
  const handleDelete = (id: string) => {
    try {
      plansStore.deletePlan(id);
      message.success('行程删除成功');
    } catch (error) {
      message.error('删除失败，请重试');
    }
  };

  const columns: ColumnsType<PlanItem> = [
    {
      title: '行程名称',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <div className="font-medium">      
          <Link to={`/plans/${record.id}`}>
            {text}
          </Link>
        </div>
      ),
    },
    {
      title: '目的地',
      dataIndex: 'destination',
      key: 'destination',
      render: (text) => (
        <div className="flex items-center space-x-1">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: '日期',
      key: 'date',
      render: (_, record) => (
        <div className="flex items-center space-x-1">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span>{record.startDate} 至 {record.endDate}</span>
        </div>
      ),
    },
    {
      title: '人数',
      dataIndex: 'participants',
      key: 'participants',
      render: (num) => (
        <div className="flex items-center space-x-1">
          <Users className="w-4 h-4 text-gray-500" />
          <span>{num}人</span>
        </div>
      ),
    },
    {
      title: '预算',
      dataIndex: 'budget',
      key: 'budget',
      render: (amount) => (
        <span>¥{amount.toLocaleString()}</span>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: keyof typeof statusColors) => (
        <Tag color={statusColors[status]}>
          {statusTexts[status]}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Link to={`/plans/${record.id}`}>
            <Button type="link" className="flex items-center text-blue-600">
              <Eye className="w-4 h-4 mr-1" />
              详情
            </Button>
          </Link>
          {(record.status === 'completed' || record.status === 'in_progress') && (
            <Button 
              type="link" 
              className="flex items-center text-purple-600"
              onClick={() => handleShowFootprints(record)}
            >
              <Footprints className="w-4 h-4 mr-1" />足迹
            </Button>
          )}
          {record.status === 'not_started' && (
            <Button
              type="link"
              className="flex items-center text-green-600"
              onClick={() => handleEdit(record)}
            >
              <Edit className="w-4 h-4 mr-1" />编辑
            </Button>
          )}
          <Popconfirm
            title="确定要删除此行程吗？"
            description="此操作不可撤销"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button 
              type="link" 
              danger
              className="flex items-center"
            >
              <Trash className="w-4 h-4 mr-1" />删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />
      
      <FootprintModal 
        visible={footprintModalVisible}
        onClose={() => setFootprintModalVisible(false)}
        plan={selectedPlan}
      />

      <PlanModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        plan={selectedPlan}
        isEdit={true}
      />
    </>
  );
};

export default PlanList;