import React, { useState } from 'react';
import { Card, Descriptions, Avatar, Button, Form, Input, Modal, Upload, message, Tabs } from 'antd';
import { User, Mail, Phone, MapPin, Camera, Calendar, Edit2, UserCheck, Shield, LogOut } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { authStore } from '../../stores/authStore';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { PlusOutlined } from '@ant-design/icons';
import PlanList from '../../components/PlanList';
import { plansStore } from '../../stores/plansStore';
import GaodeMap from '../../components/GaodeMap';

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  
  // Mock user data - in a real app, this would come from the authStore
  const userData = {
    id: authStore.user?.id || '1',
    username: authStore.user?.username || 'User',
    email: 'user@example.com',
    phone: '13800138000',
    location: '浙江杭州',
    joinDate: '2023-05-15',
    avatar: authStore.user?.avatar || '',
    bio: '热爱旅行，探索世界的每一个角落。',
  };
  
  React.useEffect(() => {
    if (userData.avatar) {
      setFileList([
        {
          uid: '-1',
          name: 'avatar.png',
          status: 'done',
          url: userData.avatar,
        },
      ]);
    }
  }, [userData.avatar]);
  
  const handleLogout = () => {
    authStore.logout();
    navigate('/login');
  };
  
  const showEditModal = () => {
    form.setFieldsValue({
      username: userData.username,
      email: userData.email,
      phone: userData.phone,
      location: userData.location,
      bio: userData.bio,
    });
    setIsEditModalVisible(true);
  };
  
  const handleEditSubmit = (values: any) => {
    // In a real app, this would update the user profile
    message.success('个人信息更新成功');
    setIsEditModalVisible(false);
  };
  
  const handlePreview = async (file: UploadFile) => {
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };
  
  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  );
  
  // Recently visited destinations - mock data
  const recentDestinations = [
    { name: '浙江杭州', longitude: 120.209, latitude: 30.246 },
    { name: '云南丽江', longitude: 100.233, latitude: 26.872 },
  ];
  
  // Map markers
  const mapMarkers = recentDestinations.map((dest, index) => ({
    id: `dest-${index}`,
    position: { longitude: dest.longitude, latitude: dest.latitude },
    title: dest.name,
    type: 'attraction' as const,
  }));

  const tabItems = [
    {
      key: "1",
      label: (
        <span className="flex items-center">
          <UserCheck className="w-4 h-4 mr-1" />
          个人信息
        </span>
      ),
      children: (
        <div className="overflow-x-auto">
          <Descriptions 
            bordered 
            column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }} 
            className="bg-white rounded-lg"
            size={window.innerWidth < 576 ? "small" : "default"}
            labelStyle={{ width: '160px' }}
          >
            <Descriptions.Item label={
              <span className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                用户名
              </span>
            }>
              {userData.username}
            </Descriptions.Item>
            <Descriptions.Item label={
              <span className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                电子邮箱
              </span>
            }>
              {userData.email}
            </Descriptions.Item>
            <Descriptions.Item label={
              <span className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                手机号码
              </span>
            }>
              {userData.phone}
            </Descriptions.Item>
            <Descriptions.Item label={
              <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                所在地
              </span>
            }>
              {userData.location}
            </Descriptions.Item>
            <Descriptions.Item label={
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                注册时间
              </span>
            }>
              {userData.joinDate}
            </Descriptions.Item>
          </Descriptions>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <span className="flex items-center">
          <Shield className="w-4 h-4 mr-1" />
          我的行程
        </span>
      ),
      children: (
        <div className="space-y-4">
          <h3 className="text-base sm:text-lg font-medium">我的所有行程</h3>
          <div className="overflow-x-auto">
            <PlanList data={plansStore.plans} />
          </div>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <span className="flex items-center">
          <MapPin className="w-4 h-4 mr-1" />
          足迹地图
        </span>
      ),
      children: (
        <div className="space-y-4">
          <h3 className="text-base sm:text-lg font-medium">我去过的地方</h3>
          <div className="w-full">
            <GaodeMap markers={mapMarkers} zoom={5} />
          </div>
          
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recentDestinations.map((dest, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                  <div className="min-w-0">
                    <h4 className="text-base sm:text-lg font-medium truncate">{dest.name}</h4>
                    <p className="text-gray-500 text-sm">最近一次访问: 2024-02-15</p>
                    <p className="text-gray-500 text-sm">去过 2 次</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ),
    },
  ];
  
  return (
    <div className="space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800">个人中心</h1>

      <Card className="w-full overflow-hidden">
        {/* Profile sidebar - stacks on mobile, side by side on large screens */}
        <div className="flex flex-col items-center space-y-4 p-4 w-full lg:w-auto lg:min-w-[250px]">
          <Avatar 
            size={{ xs: 80, sm: 100, md: 120 }}
            src={userData.avatar || undefined}
            className="bg-blue-500"
          >
            {userData.username[0]?.toUpperCase()}
          </Avatar>
          <div className="text-center w-full">
            <h2 className="text-lg sm:text-xl font-semibold">{userData.username}</h2>
            <p className="text-gray-500 text-sm sm:text-base">{userData.bio}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-4 w-full">
            <Button type="primary" onClick={showEditModal} className="flex-grow sm:flex-grow-0">
              编辑个人资料
            </Button>
            <Button onClick={handleLogout} danger className="flex-grow sm:flex-grow-0">
              退出登录
            </Button>
          </div>
        </div>
      </Card>
      
      <Card className="w-full overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main content area */}
          <div className="flex-1 overflow-hidden w-full">
            <Tabs 
              defaultActiveKey="1"
              className="w-full"
              tabBarGutter={16}
              size={window.innerWidth < 768 ? "small" : "middle"}
              items={tabItems}
            />
          </div>
        </div>
      </Card>
      
      <Modal
        title="编辑个人资料"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
        width={window.innerWidth < 576 ? "95%" : 720}
      >
        <Form 
          form={form}
          layout="vertical"
          onFinish={handleEditSubmit}
        >
          <Form.Item label="头像">
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          </Form.Item>
          
          <Form.Item 
            name="username" 
            label="用户名" 
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input prefix={<User className="w-4 h-4 text-gray-400" />} />
          </Form.Item>
          
          <Form.Item 
            name="email" 
            label="电子邮箱" 
            rules={[
              { required: true, message: '请输入电子邮箱' },
              { type: 'email', message: '请输入有效的电子邮箱' }
            ]}
          >
            <Input prefix={<Mail className="w-4 h-4 text-gray-400" />} />
          </Form.Item>
          
          <Form.Item 
            name="phone" 
            label="手机号码" 
            rules={[{ required: true, message: '请输入手机号码' }]}
          >
            <Input prefix={<Phone className="w-4 h-4 text-gray-400" />} />
          </Form.Item>
          
          <Form.Item 
            name="location" 
            label="所在地"
          >
            <Input prefix={<MapPin className="w-4 h-4 text-gray-400" />} />
          </Form.Item>
          
          <Form.Item 
            name="bio" 
            label="个人简介"
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          
          <Form.Item className="mb-0">
            <div className="flex flex-wrap sm:flex-nowrap justify-end gap-2">
              <Button 
                onClick={() => setIsEditModalVisible(false)}
                className="w-full sm:w-auto"
              >
                取消
              </Button>
              <Button 
                type="primary" 
                htmlType="submit"
                className="w-full sm:w-auto"
              >
                保存
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
      
      <Modal 
        open={previewOpen} 
        footer={null} 
        onCancel={() => setPreviewOpen(false)}
      >
        <img alt="avatar" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default observer(UserProfile);