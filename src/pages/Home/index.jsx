// src/pages/Home/index.jsx
import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  Typography, 
  Pagination, 
  Spin, 
  Empty, 
  Row, 
  Col, 
  Input, 
  Card, 
  Tag,
  Space,
  Statistic,
  Skeleton,
  Carousel,
  Image,
  Divider
} from 'antd';
import { 
  SearchOutlined, 
  EyeOutlined, 
  MessageOutlined, 
  UserOutlined, 
  CalendarOutlined,
  FireOutlined,
  BookOutlined,
  TrophyOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../../components/Header';
import AppFooter from '../../components/Footer';
import PostCard from '../../components/PostCard';
import './index.css';

const { Title, Text } = Typography;

const Home = ({ loggedInUser, onLogout, theme, toggleTheme }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(''); // 新增分类筛选状态
  const pageSize = 4;

  // 模拟统计数据
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalViews: 0,
    totalComments: 0,
    totalCategories: 0
  });

  // 轮播图数据
  const [carouselImages, setCarouselImages] = useState([]);

  // 真实分类数据（从文章中提取）
  const [categories, setCategories] = useState([]);

  // 真实标签数据（从文章中提取）
  const [tags, setTags] = useState([]);

  // 推荐文章
  const [recommendedPosts, setRecommendedPosts] = useState([]);

  // 处理文章点击跳转（带延时）
  const handlePostClick = (postId) => {
    setTimeout(() => {
      navigate(`/post/${postId}`);
      window.scrollTo(0, 0);
    }, 300);
  };

  // 从 localStorage 加载文章并计算统计数据
  useEffect(() => {
    setLoading(true);
    const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    
    // 模拟加载延时
    setTimeout(() => {
      setPosts(savedPosts);
      
      // 计算统计数据
      const totalPosts = savedPosts.length;
      const totalViews = savedPosts.reduce((sum, post) => sum + (post.views || 0), 0);
      const totalComments = savedPosts.reduce((sum, post) => sum + (post.comments?.length || 0), 0);
      
      // 从文章中提取分类数据
      const categoryMap = {};
      savedPosts.forEach(post => {
        const category = post.category || '未分类';
        if (!categoryMap[category]) {
          categoryMap[category] = 0;
        }
        categoryMap[category]++;
      });
      
      const categoryArray = Object.entries(categoryMap).map(([name, count]) => ({
        id: name,
        name: name,
        count: count
      }));
      
      // 从文章中提取标签数据
      const tagMap = {};
      savedPosts.forEach(post => {
        const postTags = Array.isArray(post.tags) ? post.tags : [];
        postTags.forEach(tag => {
          if (!tagMap[tag]) {
            tagMap[tag] = 0;
          }
          tagMap[tag]++;
        });
      });
      
      const tagArray = Object.entries(tagMap).map(([name, count]) => ({
        id: name,
        name: name,
        count: count
      }));
      
      // 生成轮播图数据（使用文章封面或随机图片）
      const carouselData = savedPosts.slice(0, 5).map((post, index) => ({
        id: post.id,
        title: post.title,
        coverImage: post.coverImage || `https://picsum.photos/800/400?random=${index}`,
        onClick: () => handlePostClick(post.id)
      }));
      
      // 推荐文章（取最新的3篇）
      const recPosts = savedPosts.slice(0, 3);
      
      setStats({
        totalPosts,
        totalViews,
        totalComments,
        totalCategories: Object.keys(categoryMap).length
      });
      
      setCarouselImages(carouselData);
      setCategories(categoryArray);
      setTags(tagArray.slice(0, 10)); // 只取前10个热门标签
      setRecommendedPosts(recPosts);
      
      setLoading(false);
    }, 1000);
  }, []);

  // 过滤文章（基于搜索查询和分类筛选）
  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchQuery
      ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.author?.username?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (post.tags || []).some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      : true;
    
    const matchesCategory = selectedCategory
      ? post.category === selectedCategory
      : true;
    
    return matchesSearch && matchesCategory;
  });

  // 计算分页数据
  const total = filteredPosts.length;
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSearch = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  // 处理分类点击
  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(selectedCategory === categoryName ? '' : categoryName); // 点击相同分类则取消筛选
    setCurrentPage(1); // 重置到第一页
  };

  // 处理标签点击
  const handleTagClick = (tag) => {
    setSearchQuery(tag);
    setCurrentPage(1);
  };

  // 清除所有筛选条件
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setCurrentPage(1);
  };

  // 显示当前筛选状态
  const hasActiveFilter = searchQuery || selectedCategory;

  return (
    <Layout className="blog-layout">
      <AppHeader 
        loggedInUser={loggedInUser} 
        onLogout={onLogout} 
        theme={theme}
        toggleTheme={toggleTheme}
      />
      
      <div className={`blog-content home-content ${theme}`}>
        <div className="home-container">
          {/* 英雄区 */}
          <div className="home-hero">
            <Title level={2} className={`home-title ${theme}`}>
              <FireOutlined /> 欢迎来到我的博客
            </Title>
            <Text type="secondary" className={`home-subtitle ${theme}`}>
              出发!掌控你的命运!
            </Text>
          </div>

          {/* 轮播图区域 */}
          {carouselImages.length > 0 && (
            <div className="home-carousel">
              <Carousel autoplay infinite dots={{ className: 'custom-dots' }}>
                {carouselImages.map((item) => (
                  <div 
                    key={item.id} 
                    className="carousel-item"
                    onClick={item.onClick}
                  >
                    <Image
                      src={item.coverImage}
                      alt={item.title}
                      className="carousel-image"
                      preview={false}
                      style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                    />
                    <div className="carousel-overlay">
                      <Title level={4} className="carousel-title">{item.title}</Title>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          )}

          {/* 搜索框 */}
          <div className="home-search">
            <Input
              placeholder="搜索文章..."
              prefix={<SearchOutlined />}
              onChange={(e) => handleSearch(e.target.value)}
              allowClear
              size="large"
              value={searchQuery}
              style={{ width: '100%', maxWidth: '500px' }}
            />
          </div>

          {/* 筛选状态显示 */}
          {hasActiveFilter && (
            <div className="filter-status">
              <Tag closable onClose={clearFilters} color="blue">
                {selectedCategory && `分类: ${selectedCategory}`}
                {searchQuery && `搜索: ${searchQuery}`}
              </Tag>
            </div>
          )}

          {/* 统计信息卡片 */}
          <Row gutter={16} className="home-stats">
            <Col xs={6} sm={6} md={6} lg={6}>
              <Card hoverable className={`stat-card ${theme}`}>
                <Statistic
                  title="文章总数"
                  value={stats.totalPosts}
                  prefix={<BookOutlined />}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
              <Card hoverable className={`stat-card ${theme}`}>
                <Statistic
                  title="总浏览量"
                  value={stats.totalViews}
                  prefix={<EyeOutlined />}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
              <Card hoverable className={`stat-card ${theme}`}>
                <Statistic
                  title="总评论数"
                  value={stats.totalComments}
                  prefix={<MessageOutlined />}
                  valueStyle={{ color: '#722ed1' }}
                />
              </Card>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
              <Card hoverable className={`stat-card ${theme}`}>
                <Statistic
                  title="分类数"
                  value={stats.totalCategories}
                  prefix={<CalendarOutlined />}
                  valueStyle={{ color: '#fa8c16' }}
                />
              </Card>
            </Col>
          </Row>

          {/* 推荐文章 */}
          {recommendedPosts.length > 0 && (
            <div className="home-recommended">
              <Title level={3} className={`home-recommended-title ${theme}`}>
                <FireOutlined /> 推荐文章
              </Title>
              <Row gutter={24}>
                {recommendedPosts.map(post => (
                  <Col xs={24} sm={12} lg={8} key={`recommended-${post.id}`}>
                    <div
                      style={{ textDecoration: 'none', cursor: 'pointer' }}
                      onClick={() => handlePostClick(post.id)}
                    >
                      <PostCard post={post} theme={theme} />
                    </div>
                  </Col>
                ))}
              </Row>
              
              {/* 添加分界线 */}
              <div className={`home-recommended-divider ${theme}`}></div>
            </div>
          )}

          {/* 主内容区 */}
          <Row gutter={24}>
            {/* 文章列表 */}
            <Col xs={24} lg={16}>
              <div className="home-posts-section">
                {loading ? (
                  <div className="home-loading">
                    {/* 骨架屏加载效果 */}
                    <Skeleton active paragraph={{ rows: 4 }} />
                    <Skeleton active paragraph={{ rows: 4 }} />
                    <Skeleton active paragraph={{ rows: 4 }} />
                  </div>
                ) : filteredPosts.length > 0 ? (
                  <>
                    <div className="posts-list">
                      {paginatedPosts.map(post => (
                        <div
                          key={post.id}
                          style={{ textDecoration: 'none', cursor: 'pointer' }}
                          onClick={() => handlePostClick(post.id)}
                        >
                          <PostCard post={post} theme={theme} />
                        </div>
                      ))}
                    </div>

                    <Pagination
                      className="home-pagination"
                      current={currentPage}
                      pageSize={pageSize}
                      total={filteredPosts.length} // 使用过滤后的总数
                      onChange={(page) => setCurrentPage(page)}
                      showSizeChanger={false}
                      hideOnSinglePage={true}
                      size="small"
                    />
                  </>
                ) : (
                  <Empty
                    description="没有找到相关文章"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                )}
              </div>
            </Col>

            {/* 侧边栏 */}
            <Col xs={24} lg={8}>
              <div className="home-sidebar">
                {/* 分类导航卡片 */}
                <Card title="文章分类" className={`sidebar-card ${theme}`}>
                  <ul className="categories-list">
                    {categories.map(category => (
                      <li key={category.id} className="category-item">
                        <a 
                          onClick={() => handleCategoryClick(category.name)}
                          className={selectedCategory === category.name ? 'active' : ''}
                        >
                          <span>{category.name}</span>
                          <span>{category.count}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* 标签云卡片 */}
                <Card title="热门标签" className={`sidebar-card ${theme}`}>
                  <div className="tags-container">
                    {tags.map(tag => (
                      <Tag 
                        key={tag.id} 
                        className={`tag-item ${theme}`}
                        onClick={() => handleTagClick(tag.name)}
                        style={{ cursor: 'pointer' }}
                      >
                        {tag.name} ({tag.count})
                      </Tag>
                    ))}
                  </div>
                </Card>

                {/* 热门文章卡片 */}
                <Card title="热门文章" className={`sidebar-card ${theme}`}>
                  <ul className="categories-list">
                    {posts
                      .sort((a, b) => (b.views || 0) - (a.views || 0))
                      .slice(0, 5)
                      .map(post => (
                        <li key={`hot-${post.id}`} className="category-item">
                          <a onClick={() => handlePostClick(post.id)}>
                            <span>{post.title.length > 20 ? post.title.substring(0, 20) + '...' : post.title}</span>
                          </a>
                        </li>
                      ))}
                  </ul>
                </Card>
                
                {/* 站点统计卡片 */}
                <Card title="站点统计" className={`sidebar-card ${theme}`}>
                  <div style={{ padding: '10px 0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span>总文章数</span>
                      <strong style={{ color: '#1890ff' }}>{stats.totalPosts}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span>总浏览量</span>
                      <strong style={{ color: '#52c41a' }}>
                        {stats.totalViews}
                      </strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span>总评论数</span>
                      <strong style={{ color: '#722ed1' }}>{stats.totalComments}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>分类数</span>
                      <strong style={{ color: '#fa8c16' }}>{stats.totalCategories}</strong>
                    </div>
                  </div>
                </Card>
                
                {/* 最新评论卡片 */}
                <Card title="最新评论" className={`sidebar-card ${theme}`}>
                  <ul className="categories-list">
                    {posts.flatMap(post => 
                      (post.comments || []).slice(0, 3).map(comment => ({
                        ...comment,
                        postId: post.id,
                        postTitle: post.title
                      }))
                    ).slice(0, 5).map((comment, index) => (
                      <li key={`comment-${index}`} className="category-item">
                        <div>
                          <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                            {comment.author?.name || comment.authorName || '匿名用户'}
                          </div>
                          <div style={{ fontSize: '0.9em', color: '#8c8c8c', marginBottom: '4px' }}>
                            评论于: {comment.postTitle}
                          </div>
                          <div style={{ fontSize: '0.85em', color: '#bfbfbf' }}>
                            {comment.content?.substring(0, 30) || comment.content || '无内容'}...
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Card>
                
                {/* 作者信息卡片 */}
                <Card title="博主信息" className={`sidebar-card ${theme}`}>
                  <div style={{ textAlign: 'center', padding: '15px 0' }}>
                    <div style={{ 
                      width: '60px', 
                      height: '60px', 
                      borderRadius: '50%', 
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                      margin: '0 auto 10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '24px'
                    }}>
                      <UserOutlined />
                    </div>
                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                      mosley
                    </div>
                    <div style={{ fontSize: '0.9em', color: '#8c8c8c', marginBottom: '10px' }}>
                      全栈开发者
                    </div>
                    <button 
                      type="button"
                      className="ant-btn ant-btn-primary ant-btn-sm"
                      style={{ borderRadius: '20px' }}
                    >
                      关注
                    </button>
                  </div>
                </Card>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      
      <AppFooter theme={theme} />
    </Layout>
  );
};


export default Home;