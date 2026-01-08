// src/pages/NotFound/index.jsx
import React from 'react';
import { Layout, Result, Button } from 'antd';
import { Link } from 'react-router-dom';
import AppHeader from '../../components/Header';
import AppFooter from '../../components/Footer';

const NotFound = ({ loggedInUser, onLogout }) => {
  return (
    <Layout className="blog-layout">
      <AppHeader loggedInUser={loggedInUser} onLogout={onLogout} />
      <div className="blog-content">
        <Result
          status="404"
          title="404"
          subTitle="抱歉，您访问的页面不存在。"
          extra={
            <Link to="/">
              <Button type="primary">返回首页</Button>
            </Link>
          }
        />
      </div>
      <AppFooter />
    </Layout>
  );
};

export default NotFound;