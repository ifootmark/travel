import React, { useState } from 'react';
import { Form, Input, Button, Divider, message, Space, Row, Col } from 'antd';
import { WechatOutlined, MobileOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { authStore } from '../../stores/authStore';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isPhoneLogin, setIsPhoneLogin] = useState(false);

  const onFinish = (values: any) => {
    // 模拟登录成功
    authStore.setUser({
      id: '1',
      username: values.username || values.phone,
    });
    message.success('登录成功');
    navigate('/dashboard');
  };

  const handleSendCode = () => {
    message.success('验证码已发送');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">欢迎来到行知天下</h1>
          <p className="text-gray-600 mt-2">开启您的旅行规划之旅</p>
        </div>

        {!isPhoneLogin ? (
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
              <Space>
                <a href="/register" className="text-blue-600 hover:text-blue-700">
                  还没有账号？立即注册
                </a>
                <span className="text-gray-400">|</span>
                <a 
                  className="text-blue-600 hover:text-blue-700" 
                  onClick={() => setIsPhoneLogin(true)}
                >
                  手机验证码登录
                </a>
              </Space>
            </div>
          </Form>
        ) : (
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="phone"
              rules={[
                { required: true, message: '请输入手机号' },
                { pattern: /^1\d{10}$/, message: '请输入正确的手机号' }
              ]}
            >
              <Input placeholder="手机号" size="large" />
            </Form.Item>

            <Form.Item
              name="code"
              rules={[{ required: true, message: '请输入验证码' }]}
            >
              <Row gutter={8}>
                <Col flex="auto" span={15}>
                  <Input placeholder="验证码" size="large" />
                </Col>
                <Col flex="none" span={9}>
                  <Button onClick={handleSendCode}  size="large">获取验证码</Button>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large">
                登录
              </Button>
            </Form.Item>

            <div className="text-center">
              <Space>
                <a href="/register" className="text-blue-600 hover:text-blue-700">
                  还没有账号？立即注册
                </a>
                <span className="text-gray-400">|</span>
                <a 
                  className="text-blue-600 hover:text-blue-700" 
                  onClick={() => setIsPhoneLogin(false)}
                >
                  账号密码登录
                </a>
              </Space>
            </div>
          </Form>
        )}

        <Divider>其他方式</Divider>

        <div className="flex justify-center space-x-6">
          <Button 
            icon={<WechatOutlined />} 
            size="large" 
            shape="circle" 
            className="bg-green-100 hover:bg-green-200 text-green-600 hover:text-green-700 border-none"
          />
          <Button 
            size="large" 
            shape="circle" 
            className="bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-700 border-none"
          >
            钉
          </Button>
          <Button 
            icon={<MobileOutlined />} 
            size="large" 
            shape="circle" 
            className="bg-orange-100 hover:bg-orange-200 text-orange-600 hover:text-orange-700 border-none"
            onClick={() => setIsPhoneLogin(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default observer(Login);