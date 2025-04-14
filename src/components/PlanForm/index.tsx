import React, { useState } from 'react';
import { Form, Input, InputNumber, DatePicker, Button, Select, message } from 'antd';
import { MapPin, Calendar, Users, DollarSign } from 'lucide-react';
import { PlanItem } from '../PlanList';
import { plansStore } from '../../stores/plansStore';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const { RangePicker } = DatePicker;
const { Option } = Select;

interface PlanFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  isModal?: boolean;
  initialValues?: PlanItem;
  isEdit?: boolean;
}

const PlanForm: React.FC<PlanFormProps> = ({ 
  onSuccess, 
  onCancel, 
  isModal = false,
  initialValues,
  isEdit = false
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Set initial values if editing
  React.useEffect(() => {
    if (initialValues && isEdit) {
      form.setFieldsValue({
        title: initialValues.title,
        destination: initialValues.destination,
        dateRange: [dayjs(initialValues.startDate), dayjs(initialValues.endDate)],
        participants: initialValues.participants,
        budget: initialValues.budget,
      });
    }
  }, [form, initialValues, isEdit]);

  const onFinish = (values: any) => {
    setLoading(true);
    
    try {
      // Extract date range and format dates
      const [startDate, endDate] = values.dateRange;
      
      const planData = {
        title: values.title,
        destination: values.destination,
        startDate: startDate.format('YYYY-MM-DD'),
        endDate: endDate.format('YYYY-MM-DD'),
        participants: values.participants,
        budget: values.budget,
        status: 'not_started',
      };

      if (isEdit && initialValues) {
        // Update existing plan
        plansStore.updatePlan(initialValues.id, planData);
        message.success('旅行计划更新成功！');
      } else {
        // Create new plan
        const createdPlan = plansStore.addPlan(planData);
        message.success('旅行计划创建成功！');
      }
      
      // Reset form
      form.resetFields();
      
      // Call success callback or navigate
      if (onSuccess) {
        onSuccess();
      } else if (!isModal) {
        navigate(`/plans`);
      }
    } catch (error) {
      message.error(isEdit ? '更新失败，请重试' : '创建失败，请重试');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        participants: 2,
        budget: 3000,
      }}
    >
      <Form.Item
        name="title"
        label="行程名称"
        rules={[{ required: true, message: '请输入行程名称' }]}
      >
        <Input placeholder="例如：杭州西湖之旅" maxLength={50} showCount />
      </Form.Item>
      
      <Form.Item
        name="destination"
        label="目的地"
        rules={[{ required: true, message: '请输入目的地' }]}
      >
        <Input 
          placeholder="例如：浙江杭州" 
          prefix={<MapPin className="w-4 h-4 text-gray-400" />} 
        />
      </Form.Item>
      
      <Form.Item
        name="dateRange"
        label="行程日期"
        rules={[{ required: true, message: '请选择行程日期' }]}
      >
        <RangePicker 
          className="w-full" 
          format="YYYY-MM-DD"
          disabledDate={(current) => current && current < dayjs().startOf('day')}
        />
      </Form.Item>
      
      <Form.Item
        name="participants"
        label="出行人数"
        rules={[{ required: true, message: '请输入出行人数' }]}
      >
        <InputNumber 
          className="w-full" 
          min={1} 
          max={20}
          precision={0}
          prefix={<Users className="w-4 h-4 text-gray-400" />} 
        />
      </Form.Item>
      
      <Form.Item
        name="budget"
        label="预算"
        rules={[{ required: true, message: '请输入预算' }]}
      >
        <InputNumber 
          className="w-full" 
          min={0} 
          step={100}
          formatter={(value) => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={(value) => value!.replace(/¥\s?|(,*)/g, '')}
          prefix={<DollarSign className="w-4 h-4 text-gray-400" />} 
        />
      </Form.Item>
      
      <Form.Item className="mb-0">
        <div className="flex justify-end space-x-2">
          {onCancel && (
            <Button onClick={onCancel}>
              取消
            </Button>
          )}
          <Button type="primary" htmlType="submit" loading={loading}>
            {isEdit ? '保存修改' : '创建行程'}
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default PlanForm;