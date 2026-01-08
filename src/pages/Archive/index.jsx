// src/pages/Archive/index.jsx
import React, { useState, useEffect } from 'react';
import { Layout, Tree, Typography, Spin } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import AppHeader from '../../components/Header';
import AppFooter from '../../components/Footer';
import './index.css';

const { Content } = Layout;
const { Title } = Typography;

const Archive = ({ loggedInUser, onLogout, theme, toggleTheme }) => {
  const [treeData, setTreeData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 从 localStorage 获取真实文章数据
  useEffect(() => {
    setLoading(true);
    const savedPosts = JSON.parse(localStorage.getItem('posts') || []);
    
    // 按年份和月份组织文章
    const archiveData = organizeByYearAndMonth(savedPosts);
    
    // 转换为 Tree 组件需要的数据格式
    const convertedData = convertToTreeData(archiveData);
    setTreeData(convertedData);
    setLoading(false);
  }, []);

  // 按年份和月份组织文章
  const organizeByYearAndMonth = (posts) => {
    const archiveMap = {};
    
    posts.forEach(post => {
      // 使用 createdAt 字段，而不是 date 字段
      console.log('处理文章:', post); 
      const date = parseDate(post.createdAt || post.date);
      
      if (!date || isNaN(date.getTime())) {
        console.warn(`无效的日期格式或缺失日期: ${post.createdAt || post.date}`);
        return; // 跳过无效日期或缺失日期的文章
      }
      
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // 月份从0开始，需要+1
      
      if (!archiveMap[year]) {
        archiveMap[year] = {
          year,
          months: []
        };
      }
      
      let monthData = archiveMap[year].months.find(m => m.month === month);
      if (!monthData) {
        monthData = {
          month,
          posts: []
        };
        archiveMap[year].months.push(monthData);
      }
      
      monthData.posts.push(post);
    });
    
    return Object.values(archiveMap);
  };

  // 解析日期字符串，支持多种格式
  const parseDate = (dateString) => {
    // 检查 dateString 是否为 null 或 undefined
    if (!dateString) {
      console.warn('日期字段为空或未定义');
      return null;
    }

    // 尝试直接解析
    let date = new Date(dateString);
    
    // 如果解析失败，尝试其他格式
    if (isNaN(date.getTime())) {
      // 尝试 YYYY-MM-DD 格式
      const match = dateString.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
      if (match) {
        date = new Date(match[1], match[2] - 1, match[3]);
      }
    }
    
    return date;
  };

  // 将归档数据转换为 Tree 组件需要的格式
  const convertToTreeData = (archiveData) => {
    const treeData = [];
    
    archiveData.forEach(yearData => {
      const yearNode = {
        title: `${yearData.year}年`,
        key: yearData.year,
        children: []
      };
      
      yearData.months.forEach(monthData => {
        const monthNode = {
          title: `${monthData.month}月`,
          key: `${yearData.year}-${monthData.month}`,
          children: []
        };
        
        monthData.posts.forEach(post => {
          monthNode.children.push({
            title: post.title,
            key: `post-${post.id}`,
            isLeaf: true
          });
        });
        
        yearNode.children.push(monthNode);
      });
      
      treeData.push(yearNode);
    });
    
    return treeData;
  };

  return (
    <Layout className="blog-layout">
      <AppHeader 
        loggedInUser={loggedInUser} 
        onLogout={onLogout} 
        theme={theme} 
        toggleTheme={toggleTheme}
      />
      <Content className={`blog-content archive-content ${theme}`}>
        <div className="archive-container">
          <Title level={2} className="archive-title">
            <CalendarOutlined /> 文章归档
          </Title>
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <Spin size="large" />
            </div>
          ) : (
            <div className="archive-tree">
              <Tree
                showLine
                defaultExpandAll
                treeData={treeData}
                onSelect={(selectedKeys, info) => {
                  console.log('selected', selectedKeys);
                  console.log('info', info);
                }}
                onExpand={(expandedKeys, info) => {
                  console.log('expanded', expandedKeys);
                  console.log('info', info);
                }}
              />
            </div>
          )}
        </div>
      </Content>
      <AppFooter theme={theme} />
    </Layout>
  );
};

export default Archive;