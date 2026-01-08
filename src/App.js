// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import WritePost from './pages/WritePost';
import EditPost from './pages/EditPost';
import Archive from './pages/Archive';
import About from './pages/about';
import Auth from './pages/Auth';
import './App.css';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [theme, setTheme] = useState('light'); // 'light' or 'dark'

  // 从 localStorage 加载主题设置
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []);

  // 保存主题设置到 localStorage
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleLogin = (user) => {
    setLoggedInUser(user);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  // Protected Route 组件
  const ProtectedRoute = ({ children }) => {
    if (!loggedInUser) {
      return <Navigate to="/auth" replace />;
    }
    return children;
  };

  // 自定义暗色主题配置
  const darkTheme = {
    token: {
      colorPrimary: '#1890ff',
      colorInfo: '#1890ff',
      colorBgBase: '#141414',
      colorTextBase: '#ffffff',
      colorBgContainer: '#1f1f1f',
      colorBorder: '#434343',
      colorSplit: '#303030',
      colorText: '#ffffff',
      colorTextSecondary: '#aaaaaa',
      colorTextTertiary: '#8c8c8c',
      colorFill: '#424242',
      colorFillSecondary: '#2a2a2a',
      colorBgElevated: '#1d1d1d',
    },
    components: {
      Layout: {
        colorBgHeader: '#1f1f1f',
        colorBgBody: '#141414',
        colorBgTrigger: '#2a2a2a',
      },
      Card: {
        colorBgContainer: '#1f1f1f',
        colorBorderSecondary: '#434343',
      },
      Input: {
        colorBgContainer: '#2a2a2a',
        colorBorder: '#434343',
        colorText: '#ffffff',
      },
      Menu: {
        itemBg: '#1f1f1f',
        itemColor: '#ffffff',
        itemHoverColor: '#1890ff',
        itemSelectedColor: '#1890ff',
      },
      Table: {
        headerBg: '#2a2a2a',
        headerColor: '#ffffff',
        rowHoverBg: '#2a2a2a',
      },
    },
  };

  const lightTheme = {
    token: {
      colorPrimary: '#1890ff',
    },
  };

  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <ConfigProvider
      locale={zhCN}
      theme={currentTheme}
    >
      <Router>
        <div className="App">
          <Routes>
            {/* 首页 */}
            <Route 
              path="/" 
              element={<Home 
                loggedInUser={loggedInUser} 
                onLogout={handleLogout} 
                theme={theme}
                toggleTheme={toggleTheme}
              />} 
            />
            
            {/* 文章详情页 */}
            <Route 
              path="/post/:id" 
              element={<PostDetail 
                loggedInUser={loggedInUser} 
                onLogout={handleLogout} 
                theme={theme}
                toggleTheme={toggleTheme}
              />} 
            />
            
            {/* 撰写文章页 (需要登录) */}
            <Route 
              path="/write" 
              element={
                <ProtectedRoute>
                  <WritePost 
                    loggedInUser={loggedInUser} 
                    onLogout={handleLogout} 
                    theme={theme}
                    toggleTheme={toggleTheme}
                  />
                </ProtectedRoute>
              } 
            />
            
            {/* 编辑文章页 (需要登录) */}
            <Route 
              path="/edit/:id" 
              element={
                <ProtectedRoute>
                  <EditPost 
                    loggedInUser={loggedInUser} 
                    onLogout={handleLogout} 
                    theme={theme}
                    toggleTheme={toggleTheme}
                  />
                </ProtectedRoute>
              } 
            />
            
            {/* 归档页 */}
            <Route 
              path="/archives" 
              element={<Archive 
                loggedInUser={loggedInUser} 
                onLogout={handleLogout} 
                theme={theme}
                toggleTheme={toggleTheme}
              />} 
            />
            
            {/* 关于页 */}
            <Route 
              path="/about" 
              element={<About 
                loggedInUser={loggedInUser} 
                onLogout={handleLogout} 
                theme={theme}
                toggleTheme={toggleTheme}
              />} 
            />
            
            {/* 认证页 (登录/注册) */}
            <Route 
              path="/auth" 
              element={<Auth 
                loggedInUser={loggedInUser} 
                onLogin={handleLogin} 
                onLogout={handleLogout} 
                theme={theme}
                toggleTheme={toggleTheme}
              />} 
            />
            
            {/* 重定向未知路由到首页 */}
            <Route 
              path="*" 
              element={<Navigate to="/" replace />} 
            />
          </Routes>
        </div>
      </Router>
    </ConfigProvider>
  );
};

export default App;