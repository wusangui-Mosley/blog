// src/pages/EditPost/index.jsx
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
import { useNavigate, useParams } from 'react-router-dom';
import AppHeader from '../../components/Header';
import AppFooter from '../../components/Footer';
import { mockCategories } from '../../api/mockData';
import './index.css';

const { Title } = Typography;

const EditPost = ({ loggedInUser, onLogout, theme, toggleTheme }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // 获取文章ID
  const [post, setPost] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  // 获取文章数据
  useEffect(() => {
    if (!loggedInUser) {
      message.warning('请先登录');
      navigate('/auth');
      return;
    }

    const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    const foundPost = savedPosts.find(p => p.id === parseInt(id));

    if (!foundPost) {
      message.error('文章不存在');
      navigate('/');
      return;
    }

    // 检查是否为文章作者
    if (foundPost.author.id !== loggedInUser.id) {
      message.error('您没有权限编辑此文章');
      navigate('/');
      return;
    }

    setPost(foundPost);
    setCoverImage(foundPost.coverImage);
    
    // 设置表单初始值
    form.setFieldsValue({
      title: foundPost.title,
      categoryId: foundPost.categoryId,
      tags: foundPost.tags || [],
      content: foundPost.content,
    });
  }, [id, loggedInUser, navigate, form]);

  const onFinish = async (values) => {
    if (!loggedInUser || !post) {
      message.error('请先登录');
      return;
    }

    setLoading(true);

    try {
      // 从 localStorage 获取现有文章
      const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');

      // 更新文章对象
      const updatedPost = {
        ...post,
        title: values.title,
        content: values.content,
        excerpt: values.content.substring(0, 100) + '...', // 自动生成摘要
        categoryId: values.categoryId,
        category: mockCategories.find(cat => cat.id === values.categoryId)?.name || '未分类',
        tags: values.tags || [],
        coverImage: coverImage || post.coverImage,
        updatedAt: new Date().toISOString()
      };

      // 更新文章数组
      const updatedPosts = savedPosts.map(p =>
        p.id === parseInt(id) ? updatedPost : p
      );

      // 保存到 localStorage
      localStorage.setItem('posts', JSON.stringify(updatedPosts));

      message.success('文章更新成功');
      // 更新成功后跳转到文章详情页
      setTimeout(() => {
        navigate(`/post/${id}`);
      }, 1000); // 延迟1秒跳转，让用户看到成功消息
    } catch (error) {
      message.error(error.message || '更新失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('更新失败:', errorInfo);
    message.error('请检查表单内容');
  };

  const handleImageUpload = (file) => {
    // 这里可以添加图片上传逻辑，现在我们只是保存文件引用
    const imageUrl = URL.createObjectURL(file);
    setCoverImage(imageUrl);
    return false; // 阻止默认上传行为
  };

  if (!loggedInUser) {
    return null; // 如果未登录，不渲染内容（重定向逻辑在useEffect中处理）
  }

  if (!post && id) {
    return (
      <div className="blog-layout">
        <AppHeader 
          loggedInUser={loggedInUser} 
          onLogout={onLogout} 
          theme={theme} 
          toggleTheme={toggleTheme}
        />
        <div className={`blog-content editpost-content ${theme}`}>
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Typography.Title level={2}>加载中...</Typography.Title>
          </div>
        </div>
        <AppFooter theme={theme} />
      </div>
    );
  }

  return (
    <div className="blog-layout">
      <AppHeader 
        loggedInUser={loggedInUser} 
        onLogout={onLogout} 
        theme={theme} 
        toggleTheme={toggleTheme}
      />
      <div className={`blog-content editpost-content ${theme}`}>
        <Card className={`editpost-card ${theme}`}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>
            编辑文章
          </Title>
          <Form
            form={form}
            className={`editpost-form ${theme}`}
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
                placeholder="编辑内容..." 
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
                更新文章
              </Button>
              <Button 
                size="large"
                onClick={() => navigate(-1)} // 返回上一页
              >
                取消
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
      <AppFooter theme={theme} />
    </div>
  );
};

export default EditPost;