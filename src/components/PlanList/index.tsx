import React from 'react';
import { Table, Tag, Button, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { MapPin, Calendar, Users, MoreHorizontal } from 'lucide-react';

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
  const columns: ColumnsType<PlanItem> = [
    {
      title: '行程名称',
      dataIndex: 'title',
      key: 'title',
      render: (text) => (
        <div className="font-medium">{text}</div>
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
      render: () => (
        <Space>
          <Button type="link" className="flex items-center">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </Space>
      ),
    },
  ];

  return (
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
  );
};

export default PlanList;