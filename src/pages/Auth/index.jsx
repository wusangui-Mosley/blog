// src/pages/Auth/index.jsx
import React, { useState, useEffect } from 'react';
import { Layout, Tabs, Form, Input, Button, Typography, message, Card, Divider } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom'; // 引入 useNavigate
import AppHeader from '../../components/Header';
import AppFooter from '../../components/Footer';
import './index.css';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const Auth = ({ loggedInUser, onLogout, onLogin }) => {
    const [activeTab, setActiveTab] = useState('login');
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate(); // 添加导航

    // 根据URL状态切换选项卡
    useEffect(() => {
        if (location.state?.tab === 'register') {
            setActiveTab('register');
        }
    }, [location.state]);

    const handleLogin = (values) => {
        setLoading(true);
        // 模拟登录请求
        setTimeout(() => {
            console.log('登录信息:', values);
            setLoading(false);
            message.success('登录成功！');
            // 模拟登录用户信息
            if (onLogin) {
                onLogin({
                    id: 1,
                    username: values.username,
                    email: `${values.username}@example.com`
                });
                navigate('/'); // 登录后重定向到首页
            }
        }, 1500);
    };

    const handleRegister = (values) => {
        setLoading(true);
        // 模拟注册请求
        setTimeout(() => {
            console.log('注册信息:', values);
            setLoading(false);
            message.success('注册成功！请登录您的账户。');
            setActiveTab('login');
        }, 1500);
    };

    const loginFailed = (errorInfo) => {
        console.log('登录失败:', errorInfo);
        message.error('登录失败，请检查用户名和密码');
    };

    const registerFailed = (errorInfo) => {
        console.log('注册失败:', errorInfo);
        message.error('注册失败，请检查表单信息');
    };

    return (
        <Layout className="blog-layout">
            <AppHeader loggedInUser={loggedInUser} onLogout={onLogout} />
            <div className="blog-content auth-content">
                <div className="auth-container">
                    <Card className="auth-card">
                        <div className="auth-header">
                            <Title level={2} className="auth-title">
                                欢迎访问我的博客
                            </Title>
                            <Text type="secondary">
                                {activeTab === 'login' ? '登录您的账户' : '创建新账户'}
                            </Text>
                        </div>

                        <Tabs 
                            activeKey={activeTab} 
                            onChange={setActiveTab}
                            centered
                            className="auth-tabs"
                        >
                            <TabPane tab="登录" key="login">
                                <Form
                                    layout="vertical"
                                    onFinish={handleLogin}
                                    onFinishFailed={loginFailed}
                                    requiredMark={false}
                                >
                                    <Form.Item
                                        name="username"
                                        label="用户名"
                                        rules={[{ required: true, message: '请输入用户名!' }]}
                                    >
                                        <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
                                    </Form.Item>
                                    <Form.Item
                                        name="password"
                                        label="密码"
                                        rules={[{ required: true, message: '请输入密码!' }]}
                                    >
                                        <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" loading={loading}>
                                            登录
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </TabPane>
                            <TabPane tab="注册" key="register">
                                <Form
                                    layout="vertical"
                                    onFinish={handleRegister}
                                    onFinishFailed={registerFailed}
                                    requiredMark={false}
                                >
                                    <Form.Item
                                        name="username"
                                        label="用户名"
                                        rules={[{ required: true, message: '请输入用户名!' }]}
                                    >
                                        <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
                                    </Form.Item>
                                    <Form.Item
                                        name="email"
                                        label="邮箱"
                                        rules={[{ required: true, message: '请输入邮箱!' }, { type: 'email', message: '请输入有效的邮箱地址!' }]}
                                    >
                                        <Input prefix={<MailOutlined />} placeholder="请输入邮箱" />
                                    </Form.Item>
                                    <Form.Item
                                        name="password"
                                        label="密码"
                                        rules={[{ required: true, message: '请输入密码!' }]}
                                    >
                                        <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" loading={loading}>
                                            注册
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </TabPane>
                        </Tabs>
                    </Card>
                </div>
            </div>
            <AppFooter />
        </Layout>
    );
};

export default Auth;