// src/components/PostCard/index.jsx
import React from 'react';
import { Card, Typography, Tag, Space } from 'antd';
import { UserOutlined, CalendarOutlined, EyeOutlined } from '@ant-design/icons';
import './index.css';

const { Meta } = Card;
const { Text, Paragraph } = Typography;

const PostCard = ({ post, theme = 'light' }) => {
  return (
    <Card 
      className={`post-card ${theme}`}
      cover={
        <img 
          alt={post.title} 
          src={post.coverImage || `https://picsum.photos/300/200?random=${post.id}`} 
          className="post-cover"
        />
      }
    >
      <div className="post-content">
        <Typography.Title 
          level={4} 
          className={`post-title ${theme}`}
          style={{ 
            marginBottom: '8px', 
            color: theme === 'dark' ? '#ffffff' : '#262626',
            height: 'auto',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {post.title}
        </Typography.Title>
        
        <div className="post-meta" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '12px', 
          fontSize: '12px',
          color: theme === 'dark' ? '#aaaaaa' : '#8c8c8c'
        }}>
          <Space size="small">
            <span className={`post-author ${theme}`} style={{ color: theme === 'dark' ? '#aaaaaa' : '#8c8c8c' }}>
              <UserOutlined /> {post.author?.name || post.authorName || '匿名'}
            </span>
            <span className={`post-date ${theme}`} style={{ color: theme === 'dark' ? '#aaaaaa' : '#8c8c8c' }}>
              <CalendarOutlined /> {new Date(post.createdAt || post.date).toLocaleDateString('zh-CN')}
            </span>
          </Space>
          <span className={`post-date ${theme}`} style={{ color: theme === 'dark' ? '#aaaaaa' : '#8c8c8c' }}>
            <EyeOutlined /> {post.views || 0}
          </span>
        </div>
        
        <Paragraph 
          className={`post-excerpt ${theme}`}
          style={{ 
            color: theme === 'dark' ? '#d9d9d9' : '#595959',
            lineHeight: '1.6',
            marginBottom: '16px',
            height: 'auto',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {post.excerpt || post.content?.substring(0, 100) + '...'}
        </Paragraph>
        
        <div className="post-tags">
          {post.tags && Array.isArray(post.tags) && post.tags.map((tag, index) => (
            <Tag key={index} color="blue" style={{ marginBottom: '8px' }}>
              {tag}
            </Tag>
          ))}
          {post.category && (
            <Tag color="default" style={{ marginBottom: '8px' }}>
              {post.category}
            </Tag>
          )}
        </div>
      </div>
    </Card>
  );
};

export default PostCard;