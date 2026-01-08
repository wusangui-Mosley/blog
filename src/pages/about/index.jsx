// src/pages/About/index.jsx
import React, { useState, useEffect } from 'react';
import { Layout, Typography, Card, Row, Col, Avatar, Space, Divider, Statistic } from 'antd';
import { 
  UserOutlined, 
  MailOutlined, 
  GithubOutlined, 
  WechatOutlined, 
  EnvironmentOutlined, 
  CalendarOutlined,
  TrophyOutlined,
  TeamOutlined
} from '@ant-design/icons';
import AppHeader from '../../components/Header';
import AppFooter from '../../components/Footer';
import './index.css';

const { Title, Text, Paragraph } = Typography;

const About = ({ loggedInUser, onLogout, theme, toggleTheme }) => {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalViews: 0
  });

  // 从 localStorage 获取真实数据
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    const totalPosts = savedPosts.length;
    const totalViews = savedPosts.reduce((sum, post) => sum + (post.views || 0), 0);
    
    setStats({
      totalPosts,
      totalViews
    });
  }, []);

  return (
    <Layout className="blog-layout">
      <AppHeader 
        loggedInUser={loggedInUser} 
        onLogout={onLogout} 
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <div className={`blog-content about-content ${theme}`}>
        <div className="about-container">
          <Title level={2} className={`about-title ${theme}`}>
            <UserOutlined /> 关于我们
          </Title>
          
          <Row gutter={[24, 24]}>
            {/* 个人信息卡片 */}
            <Col xs={24} lg={8}>
              <Card className={`about-card profile-card ${theme}`}>
                <div className="profile-header">
                  <Avatar 
                    size={120} 
                    icon={<UserOutlined />} 
                    className="profile-avatar"
                    style={{ 
                      background: 'linear-gradient(45deg, #1890ff, #52c41a)',
                      fontSize: '48px'
                    }}
                  />
                  <Title level={3} className={`profile-name ${theme}`}>
                    mosley
                  </Title>
                  <Text type="secondary" className={`profile-title ${theme}`}>
                    新手菜鸟 | 技术爱好者
                  </Text>
                </div>
                
                <Divider />
                
                <div className="profile-details">
                  <Space direction="vertical" size="middle" className="profile-info">
                    <div className="info-item">
                      <MailOutlined style={{ color: theme === 'dark' ? 'white' : '#1890ff' }} />
                      <Text style={{ color: theme === 'dark' ? 'white' : 'inherit' }}>mosley@qdybgj0621.com</Text>
                    </div>
                    <div className="info-item">
                      <EnvironmentOutlined style={{ color: theme === 'dark' ? 'white' : '#1890ff' }} />
                      <Text style={{ color: theme === 'dark' ? 'white' : 'inherit' }}>湖北省, 中国</Text>
                    </div>
                    <div className="info-item">
                      <CalendarOutlined style={{ color: theme === 'dark' ? 'white' : '#1890ff' }} />
                      <Text style={{ color: theme === 'dark' ? 'white' : 'inherit' }}>2025年开始博客创作</Text>
                    </div>
                  </Space>
                </div>
                
                <Divider />
                
                <div className="profile-stats">
                  <Row gutter={16}>
                    <Col span={12}>
                      <Statistic 
                        title="文章数" 
                        value={stats.totalPosts} 
                        prefix={<TrophyOutlined />}
                        valueStyle={{ color: theme === 'dark' ? '#ffffff' : '#3f8600' }}
                        titleStyle={{ color: theme === 'dark' ? 'rgba(255, 255, 255, 0.85)' : 'inherit' }}
                      />
                    </Col>
                    <Col span={12}>
                      <Statistic 
                        title="访问量" 
                        value={stats.totalViews} 
                        prefix={<TeamOutlined />}
                        valueStyle={{ color: theme === 'dark' ? '#ffffff' : '#1890ff' }}
                        titleStyle={{ color: theme === 'dark' ? 'rgba(255, 255, 255, 0.85)' : 'inherit' }}
                      />
                    </Col>
                  </Row>
                </div>
                
                <Divider />
                
                <div className="profile-social">
                  <Title level={5} style={{ color: theme === 'dark' ? 'white' : 'inherit' }}>社交链接</Title>
                  <Space size="large">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" title="GitHub">
                      <GithubOutlined style={{ fontSize: '24px', color: theme === 'dark' ? 'white' : 'rgba(0, 0, 0, 0.65)' }} />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" title="微信">
                      <WechatOutlined style={{ fontSize: '24px', color: theme === 'dark' ? 'white' : 'rgba(0, 0, 0, 0.65)' }} />
                    </a>
                  </Space>
                </div>
              </Card>
            </Col>
            
            {/* 关于博客内容 */}
            <Col xs={24} lg={16}>
              <Card className={`about-card content-card ${theme}`}>
                <Title level={3} className={`content-card-title ${theme}`}>
                  <UserOutlined /> 个人介绍
                </Title>
                <Paragraph className={`about-paragraph ${theme}`}>
                  我是 mosley，一名热爱技术的新手开发者。作为一名刚入门前端开发领域的菜鸟，
                  我希望通过这个博客记录我的学习历程和技术成长。
                </Paragraph>
                
                <Paragraph className={`about-paragraph ${theme}`}>
                  在这里，我将分享我在学习 JavaScript、React、CSS 等前端技术过程中的心得体会，
                  以及遇到的各种挑战和解决方案。希望能与同样热爱技术的朋友们一起交流学习。
                </Paragraph>
                
                <Title level={4} className={`content-card-subtitle ${theme}`}>
                  <TrophyOutlined /> 博客使命
                </Title>
                <Paragraph className={`about-paragraph ${theme}`}>
                  记录学习过程中的点点滴滴，分享技术心得和实践经验。通过写作整理思路，
                  同时也希望自己的经验能够帮助到其他正在学习的开发者。
                </Paragraph>
                
                <Title level={4} className={`content-card-subtitle ${theme}`}>
                  <TeamOutlined /> 博客愿景
                </Title>
                <Paragraph className={`about-paragraph ${theme}`}>
                  希望这个博客能成为技术学习者们的交流平台，通过持续的技术分享，
                  与大家共同进步，一起探索前端开发的无限可能。
                </Paragraph>
                
                <Title level={4} className={`content-card-subtitle ${theme}`}>
                  <CalendarOutlined /> 学习计划
                </Title>
                <Paragraph className={`about-paragraph ${theme}`}>
                  未来我将继续深入学习 React 生态系统，探索 Vue.js、Node.js 等后端技术，
                  逐步向全栈开发方向发展。同时也会关注新兴的前端技术和最佳实践。
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
      <AppFooter theme={theme} />
    </Layout>
  );
};

export default About;