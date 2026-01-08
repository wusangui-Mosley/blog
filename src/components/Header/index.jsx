// src/components/Header/index.jsx
import React from 'react';
import { Layout, Menu, Dropdown, Button, Avatar, Typography, Switch } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, DownOutlined, SunOutlined, MoonOutlined } from '@ant-design/icons';
import './index.css';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

const AppHeader = ({ loggedInUser, onLogout, theme, toggleTheme }) => {
    const menuItems = [
        {
            key: 'home',
            label: <Link to="/">首页</Link>
        },
        {
            key: 'archives',
            label: <Link to="/archives">归档</Link>
        },
        {
            key: 'about',
            label: <Link to="/about">关于</Link>
        }
    ];

    const userMenuItems = [
        {
            key: 'write',
            label: <Link to="/write">写文章</Link>
        },
        {
            type: 'divider'
        },
        {
            key: 'logout',
            label: <span onClick={onLogout}>退出登录</span>
        }
    ];

    return (
        <AntHeader className={`app-header ${theme}`}>
            <div className="header-content">
                <div className="logo">
                    <Link to="/">
                        <Typography.Title level={3} style={{ color: 'white', margin: 0 }}>
                            我的博客
                        </Typography.Title>
                    </Link>
                </div>
                
                <Menu
                    className="header-menu"
                    mode="horizontal"
                    items={menuItems}
                    selectable={false}
                />
                
                <div className="user-section">
                    {/* 主题切换开关 */}
                    <div className="theme-toggle" style={{ marginRight: '16px' }}>
                        <Switch
                            checked={theme === 'dark'}
                            checkedChildren={<MoonOutlined />}
                            unCheckedChildren={<SunOutlined />}
                            onChange={toggleTheme}
                            style={{ 
                                backgroundColor: theme === 'dark' ? '#1890ff' : '#d9d9d9',
                                marginRight: '8px'
                            }}
                        />
                    </div>
                    
                    {loggedInUser ? (
                        <Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
                            <Button type="text" className="user-dropdown-btn">
                                <Avatar icon={<UserOutlined />} size="small" />
                                <Text className="username-text">{loggedInUser.username}</Text>
                                <DownOutlined style={{ fontSize: '12px', color: 'white' }} />
                            </Button>
                        </Dropdown>
                    ) : (
                        <div className="auth-buttons">
                            <Link to="/auth">
                                <Button type="primary" ghost>登录</Button>
                            </Link>
                            <Link to="/auth" state={{ tab: 'register' }}>
                                <Button type="primary" style={{ marginLeft: '10px' }}>注册</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AntHeader>
    );
};

export default AppHeader;