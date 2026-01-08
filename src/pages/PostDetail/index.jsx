// src/pages/PostDetail/index.jsx
import React, { useState, useEffect } from 'react';
import { Layout, Typography, Tag, Button, Divider, Row, Col, Avatar, List, Space, Comment, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import { CalendarOutlined, UserOutlined, TagsOutlined, EditOutlined, DeleteOutlined, LikeOutlined, LikeFilled } from '@ant-design/icons';
import AppHeader from '../../components/Header';
import AppFooter from '../../components/Footer';
import './index.css';

const { Title, Text } = Typography;
const { TextArea } = Input;

const PostDetail = ({ loggedInUser, onLogout, theme, toggleTheme }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState('');
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

  // 从 URL 获取文章 ID
  const postId = window.location.pathname.split('/').pop();

  // 模拟获取文章数据
  useEffect(() => {
    setLoading(true);
    const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    const foundPost = savedPosts.find(p => p.id === parseInt(postId));

    if (foundPost) {
      setPost(foundPost);
      setComments(foundPost.comments || []);
      setLikeCount(foundPost.likes || 0);
      setLiked(foundPost.userLiked || false);
    }

    setLoading(false);
  }, [postId]);

  const handleCommentSubmit = () => {
    if (!commentContent.trim()) {
      message.warning('请输入评论内容');
      return;
    }

    if (!loggedInUser) {
      message.warning('请先登录');
      return;
    }

    const newComment = {
      id: Date.now(),
      content: commentContent,
      createdAt: new Date().toISOString(),
      author: {
        id: loggedInUser.id,
        name: loggedInUser.username
      }
    };

    const updatedComments = [...comments, newComment];
    setComments(updatedComments);

    // 更新 localStorage 中的文章数据
    const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    const updatedPosts = savedPosts.map(p =>
      p.id === parseInt(postId)
        ? { ...p, comments: updatedComments }
        : p
    );
    localStorage.setItem('posts', JSON.stringify(updatedPosts));

    setCommentContent('');
    message.success('评论发表成功');
  };

  const handleLike = () => {
    if (!loggedInUser) {
      message.warning('请先登录');
      return;
    }

    const newLikedState = !liked;
    const newLikeCount = liked ? likeCount - 1 : likeCount + 1;

    setLiked(newLikedState);
    setLikeCount(newLikeCount);

    // 更新 localStorage 中的文章数据
    const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    const updatedPosts = savedPosts.map(p =>
      p.id === parseInt(postId)
        ? { ...p, likes: newLikeCount, userLiked: newLikedState }
        : p
    );
    localStorage.setItem('posts', JSON.stringify(updatedPosts));

    // 更新当前文章状态
    if (post) {
      setPost({ ...post, likes: newLikeCount, userLiked: newLikedState });
    }
  };

  if (loading) {
    return (
      <Layout className="blog-layout">
        <AppHeader 
          loggedInUser={loggedInUser} 
          onLogout={onLogout} 
          theme={theme} 
          toggleTheme={toggleTheme}
        />
        <div className={`post-detail-loading ${theme}`}>
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Typography.Title level={2}>加载中...</Typography.Title>
          </div>
        </div>
        <AppFooter theme={theme} />
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout className="blog-layout">
        <AppHeader 
          loggedInUser={loggedInUser} 
          onLogout={onLogout} 
          theme={theme} 
          toggleTheme={toggleTheme}
        />
        <div className={`post-detail-container ${theme}`}>
          <Typography.Title level={2}>文章不存在</Typography.Title>
          <Typography.Paragraph>您访问的文章可能已被删除或不存在。</Typography.Paragraph>
          <Link to="/">
            <Button type="primary">返回首页</Button>
          </Link>
        </div>
        <AppFooter theme={theme} />
      </Layout>
    );
  }

  const isAuthor = loggedInUser && loggedInUser.id === post.author.id;

  return (
    <Layout className="blog-layout">
      <AppHeader 
        loggedInUser={loggedInUser} 
        onLogout={onLogout} 
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <div className={`blog-content post-detail-content ${theme}`}>
        <div className={`post-detail-container ${theme}`}>
          <div className="post-detail-header">
            <Typography.Title level={2} className={`post-detail-title ${theme}`}>
              {post.title}
            </Typography.Title>
            <div className={`post-detail-meta ${theme}`}>
              <span><CalendarOutlined /> {new Date(post.createdAt).toLocaleDateString()}</span>
              <span><UserOutlined /> {post.author.name}</span>
              <span><TagsOutlined /> {post.tags.join(', ')}</span>
            </div>
          </div>
          
          <Divider />
          
          <div 
            className={`post-detail-content-inner ${theme}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <div className="post-detail-tags">
            {post.tags.map((tag, index) => (
              <Tag key={index} color="blue">{tag}</Tag>
            ))}
          </div>
          
          <div className="post-detail-actions">
            <Button type="primary" onClick={() => window.history.back()}>
              返回
            </Button>
            {loggedInUser && (
              <Link to={`/edit/${post.id}`}>
                <Button type="link">编辑</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <AppFooter theme={theme} />
    </Layout>
  );
};

export default PostDetail;