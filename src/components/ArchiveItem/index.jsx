// src/components/ArchiveItem/index.jsx
import React from 'react';
import { Timeline, Card, Tag } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './index.css';

const ArchiveItem = ({ post, theme = 'light' }) => {
  return (
    <Timeline.Item 
      dot={<CalendarOutlined style={{ fontSize: '16px' }} />}
    >
      <Link to={`/post/${post.id}`} style={{ textDecoration: 'none' }}>
        <Card className={`archive-post-card ${theme}`} size="small">
          <div className={`post-info ${theme}`}>
            <span className={`post-date ${theme}`}>{post.date}</span>
            <Tag className={`post-category ${theme}`}>{post.category}</Tag>
          </div>
          <span className={`post-title ${theme}`}>{post.title}</span>
          {post.excerpt && <div className={`post-excerpt ${theme}`}>{post.excerpt}</div>}
        </Card>
      </Link>
    </Timeline.Item>
  );
};

export default ArchiveItem;