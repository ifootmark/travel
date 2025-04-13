import React from 'react';
import { Form, Input, Button, Divider, message } from 'antd';
import { WechatOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { authStore } from '../../stores/authStore';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    // 模拟登录成功
    authStore.setUser({
      id: '1',
      username: values.username,
    });
    message.success('登录成功');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">欢迎来到行知天下</h1>
          <p className="text-gray-600 mt-2">开启您的旅行规划之旅</p>
        </div>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="用户名" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder="密码" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              登录
            </Button>
          </Form.Item>

          <div className="text-center">
            <a href="/register" className="text-blue-600 hover:text-blue-700">
              还没有账号？立即注册
            </a>
          </div>

          <Divider>或</Divider>

          <Button
            icon={<WechatOutlined />}
            block
            size="large"
            className="bg-green-500 text-white hover:bg-green-600"
          >
            微信登录
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default observer(Login);