import React, { useState, useRef, useEffect } from 'react';
import { Card, FloatButton, Modal, Input, Button, Avatar, Spin, Empty } from 'antd';
import { MessageSquare, Send, Bot, User, Trash2 } from 'lucide-react';
import axios from 'axios';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AIChat: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
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

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    const data = {
      query: userMessage,
      response_mode: "streaming",
      conversation_id: "",
      inputs: {},
      user: 'xux',
      files: [],
    };

    const url='http://124.220.188.159:8088/v1/chat-messages'

    try {
      // const response = await axios.post(url, data, {
      //   headers: {
      //     'Authorization': 'Bearer app-pbeH8ND98fo0Hevq0F5VvoSq',
      //     'Content-Type': 'application/json'
      //   }
      // });

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer app-pbeH8ND98fo0Hevq0F5VvoSq`,
        },
        body: JSON.stringify(data),
      });

      // setMessages(prev => [...prev, { role: 'assistant', content: response.data.content }]);
    } catch (error) {
      console.error('AI回复失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  const renderMessage = (message: Message, index: number) => {
    const isUser = message.role === 'user';
    return (
      <div
        key={index}
        className={`flex items-start space-x-2 mb-4 ${
          isUser ? 'flex-row-reverse space-x-reverse' : ''
        }`}
      >
        <Avatar
          icon={isUser ? <User /> : <Bot />}
          className={`${isUser ? 'bg-blue-500' : 'bg-green-500'} flex-shrink-0`}
        />
        <Card
          className={`max-w-[70%] shadow-sm ${
            isUser ? 'bg-blue-500' : 'bg-gray-50'
          }`}
          style={{ 
            padding: '12px',
            borderRadius: '12px',
          }}
        >
          <p className={`m-0 ${isUser ? 'text-white' : 'text-gray-800'}`}>
            {message.content}
          </p>
        </Card>
      </div>
    );
  };

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
            <span>AI旅行助手</span>
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
        width={500}
        style={{ padding: '12px' }}
      >
        <Card
          className="h-[500px] flex flex-col"
          style={{ padding: 0 }}
        >
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto px-4 py-2"
          >
            {messages.length === 0 ? (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="开始和AI助手对话吧"
                className="mt-20"
              />
            ) : (
              messages.map((message, index) => renderMessage(message, index))
            )}
            {loading && (
              <div className="flex justify-center my-4">
                <Spin tip="AI思考中..." />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="border-t p-4 bg-white">
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
        </Card>
      </Modal>
    </>
  );
};

export default AIChat;