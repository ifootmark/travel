import React, { useState, useRef, useEffect } from 'react';
import { Card, FloatButton, Modal, Input, Button, Avatar, Spin, Empty, message } from 'antd';
import { MessageSquare, Send, Bot, User, Trash2, FileText } from 'lucide-react';
import { ProCard, ProList } from '@ant-design/pro-components';
import axios from 'axios';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

const AIChat: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendTopics, setRecommendTopics] = useState<string[]>([
    '推荐杭州周边的好玩景点',
    '适合亲子游的城市有哪些？',
    '十月份去云南旅游穿什么衣服合适？',
    '三天时间怎么玩转北京？',
    '自驾游最佳路线推荐'
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [isModalOpen, messages]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const simulateAIResponse = (userMessage: string) => {
    // 模拟AI回复的函数
    const responses = [
      "杭州西湖是一个非常美丽的景点，您可以游览断桥、雷峰塔、三潭印月等著名景点。",
      "丽江古城是云南的著名旅游地，那里的纳西文化非常有特色。",
      "北京的长城是必游景点，建议您选择八达岭或慕田峪长城，避开人流高峰期。",
      "为您的行程预算5000元是比较合理的，这包括交通、住宿和餐饮费用。",
      "十月份去云南，昼夜温差较大，建议带长袖衣物和外套，白天可能还需要短袖。",
      "对于家庭旅行，我推荐选择海南三亚、杭州、成都等地，这些地方有丰富的亲子活动。"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    
    const newUserMessage: Message = { 
      role: 'user', 
      content: userMessage,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setLoading(true);

    try {
      // 模拟API调用
      setTimeout(() => {
        const aiResponse = simulateAIResponse(userMessage);
        
        const newAIMessage: Message = {
          role: 'assistant',
          content: aiResponse,
          timestamp: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, newAIMessage]);
        setLoading(false);
      }, 1000);
      
      // 真实API调用代码（暂时注释掉）
      /*
      const data = {
        query: userMessage,
        response_mode: "streaming",
        conversation_id: "",
        inputs: {},
        user: 'xux',
        files: [],
      };

      const url='http://124.220.188.159:8088/v1/chat-messages'

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer app-pbeH8ND98fo0Hevq0F5VvoSq`,
        },
        body: JSON.stringify(data),
      });
      */
      
    } catch (error) {
      console.error('AI回复失败:', error);
      message.error('获取回复失败，请稍后重试');
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    message.success('对话已清空');
  };

  const handleTopicClick = (topic: string) => {
    setInput(topic);
  };

  const renderMessage = (msg: Message) => {
    const isUser = msg.role === 'user';
    
    return (
      <div
        className={`flex items-start space-x-2 mb-4 ${
          isUser ? 'flex-row-reverse space-x-reverse' : ''
        }`}
      >
        <Avatar
          icon={isUser ? <User /> : <Bot />}
          className={`${isUser ? 'bg-blue-500' : 'bg-green-500'} flex-shrink-0`}
        />
        <div
          className={`max-w-[70%] p-3 rounded-lg ${
            isUser ? 'bg-blue-500 text-white' : 'bg-gray-50 text-gray-800'
          }`}
        >
          <p className="m-0">{msg.content}</p>
          {msg.timestamp && (
            <div className={`text-xs mt-1 ${isUser ? 'text-blue-100' : 'text-gray-400'}`}>
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  const renderEmptyState = () => (
    <div className="pt-8 pb-4">
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="开始和AI助手对话吧"
      />
      
      <ProCard
        title="推荐问题"
        className="mt-6"
        headerBordered
        bordered
      >
        <ProList<string>
          rowKey="id"
          dataSource={recommendTopics}
          showActions="hover"
          showExtra="hover"
          metas={{
            title: {
              render: (_, item) => (
                <div 
                  className="cursor-pointer text-blue-500 hover:text-blue-600"
                  onClick={() => handleTopicClick(item)}
                >
                  {item}
                </div>
              ),
            },
            avatar: {
              render: () => <FileText size={16} className="text-gray-400" />
            },
          }}
        />
      </ProCard>
    </div>
  );

  return (
    <>
      <FloatButton
        icon={<MessageSquare />}
        type="primary"
        onClick={() => setIsModalOpen(true)}
        tooltip="AI助手"
      />
      
      <Modal
        title={
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">AI旅行助手</span>
            {messages.length > 0 && (
              <Button
                type="text"
                icon={<Trash2 className="w-4 h-4" />}
                onClick={clearChat}
                className="text-gray-500 hover:text-red-500"
              >
                清空对话
              </Button>
            )}
          </div>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={720}
        className="ai-chat-modal"
        bodyStyle={{ padding: '12px', height: '600px', display: 'flex', flexDirection: 'column' }}
      >
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto px-4 py-2 bg-gray-50 rounded-lg"
        >
          {messages.length === 0 ? (
            renderEmptyState()
          ) : (
            <div className="py-4 space-y-6">
              {messages.map((message, index) => (
                <div key={index}>{renderMessage(message)}</div>
              ))}
              {loading && (
                <div className="flex justify-center my-4">
                  <Spin tip="AI思考中..." />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        
        <div className="p-4 bg-white border-t mt-3">
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onPressEnter={handleSend}
              placeholder="输入您的问题..."
              disabled={loading}
              size="large"
              className="flex-1"
            />
            <Button
              type="primary"
              icon={<Send className="w-4 h-4" />}
              onClick={handleSend}
              disabled={loading}
              size="large"
            />
          </div>
          <div className="mt-2 text-xs text-gray-400">
            提示：可以询问旅行建议、景点推荐、行程规划等问题
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AIChat;