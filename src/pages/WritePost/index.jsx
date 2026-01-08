// src/pages/WritePost/index.jsx
import React, { useState, useEffect } from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Card, 
  message, 
  Select, 
  Upload, 
  Typography,
  Row,
  Col
} from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../../components/Header';
import AppFooter from '../../components/Footer';
import { mockCategories } from '../../api/mockData';
import './index.css';

const { Title } = Typography;

const WritePost = ({ loggedInUser, onLogout, theme, toggleTheme }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [coverImage, setCoverImage] = useState(null);

  // 如果没有登录，重定向到登录页面
  useEffect(() => {
    if (!loggedInUser) {
      message.warning('请先登录');
      navigate('/auth');
    }
  }, [loggedInUser, navigate]);

  const onFinish = async (values) => {
    if (!loggedInUser) {
      message.error('请先登录');
      return;
    }

    setLoading(true);

    try {
      // 从 localStorage 获取现有文章
      const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');

      // 创建新文章对象
      const newPost = {
        id: Date.now(), // 使用时间戳作为ID
        title: values.title,
        content: values.content,
        excerpt: values.content.substring(0, 100) + '...', // 自动生成摘要
        author: {
          id: loggedInUser.id,
          name: loggedInUser.username,
          username: loggedInUser.username
        },
        categoryId: values.categoryId,
        category: mockCategories.find(cat => cat.id === values.categoryId)?.name || '未分类',
        tags: values.tags || [],
        views: 0,
        likes: 0,
        comments: [],
        coverImage: coverImage || `https://picsum.photos/800/400?random=${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // 添加新文章到数组
      const updatedPosts = [newPost, ...savedPosts];

      // 保存到 localStorage
      localStorage.setItem('posts', JSON.stringify(updatedPosts));

      message.success('文章发布成功');
      form.resetFields();
      setCoverImage(null);
      // 发布成功后跳转到首页
      setTimeout(() => {
        navigate('/');
      }, 1000); // 延迟1秒跳转，让用户看到成功消息
    } catch (error) {
      message.error(error.message || '发布失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('发表失败:', errorInfo);
    message.error('请检查表单内容');
  };

  const handleImageUpload = (file) => {
    // 这里可以添加图片上传逻辑，现在我们只是保存文件引用
    setCoverImage(URL.createObjectURL(file));
    return false; // 阻止默认上传行为
  };

  if (!loggedInUser) {
    return null; // 如果未登录，不渲染内容（重定向逻辑在useEffect中处理）
  }

  return (
    <div className="blog-layout">
      <AppHeader 
        loggedInUser={loggedInUser} 
        onLogout={onLogout} 
        theme={theme} 
        toggleTheme={toggleTheme}
      />
      <div className={`blog-content writepost-content ${theme}`}>
        <Card className={`writepost-card ${theme}`}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>
            撰写文章
          </Title>
          <Form
            form={form}
            className={`writepost-form ${theme}`}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            requiredMark={false}
          >
            <Form.Item
              label="文章标题"
              name="title"
              rules={[{ required: true, message: '请输入文章标题!' }]}
            >
              <Input placeholder="请输入文章标题" size="large" />
            </Form.Item>

            <Form.Item
              label="文章分类"
              name="categoryId"
              rules={[{ required: true, message: '请选择文章分类!' }]}
            >
              <Select placeholder="请选择文章分类">
                {mockCategories.map(category => (
                  <Select.Option key={category.id} value={category.id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="标签"
              name="tags"
            >
              <Select
                mode="tags"
                placeholder="添加标签，用回车分隔"
                style={{ width: '100%' }}
              >
                {/* 这里可以动态加载标签选项 */}
              </Select>
            </Form.Item>

            <Form.Item
              label="封面图片"
              name="coverImage"
            >
              <Upload
                listType="picture-card"
                className="cover-image-uploader"
                showUploadList={false}
                beforeUpload={handleImageUpload}
                accept="image/*"
              >
                {coverImage ? (
                  <img 
                    src={coverImage} 
                    alt="封面" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                ) : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>上传封面</div>
                  </div>
                )}
              </Upload>
            </Form.Item>

            <Form.Item
              label="文章内容"
              name="content"
              rules={[{ required: true, message: '请输入文章内容!' }]}
            >
              <Input.TextArea 
                rows={10} 
                placeholder="开始写作..." 
                style={{ fontSize: '16px', lineHeight: '1.6' }}
              />
            </Form.Item>

            <Form.Item style={{ textAlign: 'center', marginTop: '20px' }}>
              <Button 
                type="primary" 
                htmlType="submit" 
                size="large" 
                loading={loading}
                style={{ marginRight: '10px' }}
              >
                发布文章
              </Button>
              <Button 
                size="large"
                onClick={() => {
                  form.resetFields();
                  setCoverImage(null);
                }}
              >
                重置
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
      <AppFooter theme={theme} />
    </div>
  );
};

export default WritePost;