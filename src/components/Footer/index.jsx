// src/components/Footer/index.jsx
import React from 'react';
import { Layout, Typography, Space } from 'antd';
import { GithubOutlined, WechatOutlined, QqOutlined } from '@ant-design/icons';
import './index.css';

const { Footer: AntFooter } = Layout;
const { Text, Link } = Typography;

const AppFooter = ({ theme }) => {
    return (
        <AntFooter className={`app-footer ${theme}`}>
            <Text>© 2025 我的博客. All Rights Reserved.</Text>
            <Space size="large" className="social-links">
                <Link href="#" target="_blank" title="GitHub">
                    <GithubOutlined style={{ fontSize: '24px', color: theme === 'dark' ? 'white' : 'rgba(0, 0, 0, 0.65)' }} />
                </Link>
                <Link href="#" target="_blank" title="微信">
                    <WechatOutlined style={{ fontSize: '24px', color: theme === 'dark' ? 'white' : 'rgba(0, 0, 0, 0.65)' }} />
                </Link>
                <Link href="#" target="_blank" title="QQ">
                    <QqOutlined style={{ fontSize: '24px', color: theme === 'dark' ? 'white' : 'rgba(0, 0, 0, 0.65)' }} />
                </Link>
            </Space>
            <Text>Proudly powered by React & Ant Design</Text>
        </AntFooter>
    );
};

export default AppFooter;