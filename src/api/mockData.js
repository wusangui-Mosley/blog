// src/api/mockData.js
// 模拟博客 API 数据

// 用户数据
export const mockUsers = [
  {
    id: 1,
    username: 'zhangsan',
    email: 'zhangsan@example.com',
    avatar: 'https://picsum.photos/100/100?random=1',
    bio: '全栈开发工程师，热爱技术分享',
    joinDate: '2020-01-15',
    role: 'admin'
  },
  {
    id: 2,
    username: 'lisi',
    email: 'lisi@example.com',
    avatar: 'https://picsum.photos/100/100?random=2',
    bio: '前端开发专家，专注于React生态系统',
    joinDate: '2021-03-22',
    role: 'author'
  },
  {
    id: 3,
    username: 'wangwu',
    email: 'wangwu@example.com',
    avatar: 'https://picsum.photos/100/100?random=3',
    bio: '后端开发工程师，擅长微服务架构',
    joinDate: '2022-07-10',
    role: 'author'
  }
];

// 文章分类
export const mockCategories = [
  { id: 1, name: '编程入门', slug: 'programming-basics', count: 12 },
  { id: 2, name: '前端开发', slug: 'frontend', count: 25 },
  { id: 3, name: '后端开发', slug: 'backend', count: 18 },
  { id: 4, name: '移动开发', slug: 'mobile', count: 8 },
  { id: 5, name: '数据库', slug: 'database', count: 10 },
  { id: 6, name: '云计算', slug: 'cloud', count: 5 },
  { id: 7, name: '人工智能', slug: 'ai', count: 7 }
];

// 标签数据
export const mockTags = [
  { id: 1, name: 'React', slug: 'react', count: 15 },
  { id: 2, name: 'Vue', slug: 'vue', count: 12 },
  { id: 3, name: 'JavaScript', slug: 'javascript', count: 22 },
  { id: 4, name: 'CSS', slug: 'css', count: 18 },
  { id: 5, name: 'Node.js', slug: 'nodejs', count: 14 },
  { id: 6, name: 'Python', slug: 'python', count: 10 },
  { id: 7, name: 'Docker', slug: 'docker', count: 8 },
  { id: 8, name: '微服务', slug: 'microservices', count: 6 }
];

// 文章数据
export const mockPosts = [
  {
    id: 1,
    title: '如何开始你的编程之旅',
    excerpt: '编程作为21世纪的重要技能，越来越多的人希望学习编程。本文将为你介绍如何从零开始学习编程，包括选择合适的编程语言、学习资源推荐以及实践项目建议...',
    content: `<p>编程作为21世纪的重要技能，越来越多的人希望学习编程。本文将为你介绍如何从零开始学习编程，包括选择合适的编程语言、学习资源推荐以及实践项目建议。</p>
    
    <h2>为什么学习编程？</h2>
    <p>在数字化时代，编程不仅仅是程序员的专属技能，它已经成为一种基础素养。无论是数据分析、自动化办公还是创业创新，编程都能为你带来巨大帮助。</p>
    
    <h2>选择第一门编程语言</h2>
    <p>对于初学者来说，选择一门合适的编程语言至关重要：</p>
    <ul>
      <li><strong>Python</strong>: 语法简洁，适合初学者，应用广泛</li>
      <li><strong>JavaScript</strong>: 前端开发必备，也可用于后端开发</li>
      <li><strong>Java</strong>: 企业级应用广泛使用，就业机会多</li>
    </ul>
    
    <h2>学习路径建议</h2>
    <p>建议按照以下步骤循序渐进地学习：</p>
    <ol>
      <li>掌握基本语法和概念</li>
      <li>完成小型练习项目</li>
      <li>参与开源项目或团队协作</li>
      <li>持续学习新技术和最佳实践</li>
    </ol>
    
    <h2>实用学习资源</h2>
    <p>推荐以下优质学习平台：</p>
    <ul>
      <li>Coursera 和 edX 上的大学课程</li>
      <li>LeetCode 和 HackerRank 的编程练习</li>
      <li>GitHub 上的开源项目</li>
    </ul>
    
    <p>记住，编程学习是一个持续的过程，重要的是动手实践和不断积累经验。</p>`,
    author: mockUsers[0],
    categoryId: 1,
    tags: [3, 6],
    createdAt: '2023-10-15T10:30:00Z',
    updatedAt: '2023-10-15T10:30:00Z',
    published: true,
    views: 128,
    likes: 24,
    coverImage: 'https://picsum.photos/800/400?random=1'
  },
  {
    id: 2,
    title: '前端开发框架对比：React vs Vue vs Angular',
    excerpt: '在现代前端开发中，选择合适的框架至关重要。本文将详细对比三大主流前端框架React、Vue和Angular的特点、优势和适用场景，帮助你做出更好的技术选型...',
    content: `<p>在现代前端开发中，选择合适的框架至关重要。本文将详细对比三大主流前端框架React、Vue和Angular的特点、优势和适用场景，帮助你做出更好的技术选型。</p>
    
    <h2>React</h2>
    <p>由Facebook开发的React是一个用于构建用户界面的JavaScript库：</p>
    <ul>
      <li>组件化架构，易于复用</li>
      <li>虚拟DOM提高性能</li>
      <li>庞大的生态系统</li>
      <li>学习曲线适中</li>
    </ul>
    
    <h2>Vue</h2>
    <p>Vue是一套构建用户界面的渐进式框架：</p>
    <ul>
      <li>学习曲线平缓，易于上手</li>
      <li>双向数据绑定</li>
      <li>轻量级，性能优秀</li>
      <li>文档清晰详细</li>
    </ul>
    
    <h2>Angular</h2>
    <p>由Google开发的Angular是一个平台和框架，用于构建客户端应用：</p>
    <ul>
      <li>完整的MVC框架</li>
      <li>TypeScript支持</li>
      <li>强大的CLI工具</li>
      <li>适合大型企业级应用</li>
    </ul>
    
    <p>选择哪个框架取决于项目需求、团队技能和长期规划。</p>`,
    author: mockUsers[1],
    categoryId: 2,
    tags: [1, 2, 3],
    createdAt: '2023-10-10T14:20:00Z',
    updatedAt: '2023-10-12T09:15:00Z',
    published: true,
    views: 256,
    likes: 42,
    coverImage: 'https://picsum.photos/800/400?random=2'
  },
  {
    id: 3,
    title: '响应式网页设计最佳实践',
    excerpt: '随着移动设备的普及，响应式设计已成为现代网站的标准要求。本文将分享响应式设计的核心原则、常用技术和实用技巧，让你的网站在各种设备上都能完美展示...',
    content: `<p>随着移动设备的普及，响应式设计已成为现代网站的标准要求。本文将分享响应式设计的核心原则、常用技术和实用技巧，让你的网站在各种设备上都能完美展示...</p>
    
    <h2>响应式设计的核心原则</h2>
    <p>响应式设计的核心在于让网页能够适应不同尺寸的屏幕：</p>
    <ul>
      <li>流动网格布局</li>
      <li>弹性图片和媒体</li>
      <li>媒体查询</li>
      <li>移动优先策略</li>
    </ul>
    
    <h2>CSS技术实现</h2>
    <p>使用现代CSS技术实现响应式设计：</p>
    <ul>
      <li>Flexbox布局</li>
      <li>CSS Grid布局</li>
      <li>相对单位（em, rem, %, vw, vh）</li>
      <li>CSS媒体查询</li>
    </ul>
    
    <h2>实用技巧</h2>
    <p>在实践中需要注意的要点：</p>
    <ul>
      <li>设置正确的视口标签</li>
      <li>使用断点进行设计</li>
      <li>优化触摸交互</li>
      <li>考虑加载性能</li>
    </ul>`,
    author: mockUsers[1],
    categoryId: 2,
    tags: [4],
    createdAt: '2023-10-05T09:45:00Z',
    updatedAt: '2023-10-05T09:45:00Z',
    published: true,
    views: 97,
    likes: 18,
    coverImage: 'https://picsum.photos/800/400?random=3'
  },
  {
    id: 4,
    title: 'JavaScript ES2023新特性解析',
    excerpt: '每年JavaScript都会推出新的特性和改进。本文将详细介绍ES2023中的新特性，包括数组查找方法的改进、哈希bang语法支持等，并提供实际应用示例...',
    content: `<p>每年JavaScript都会推出新的特性和改进。本文将详细介绍ES2023中的新特性，包括数组查找方法的改进、哈希bang语法支持等，并提供实际应用示例...</p>
    
    <h2>findLast 和 findLastIndex</h2>
    <p>新增的数组方法可以从末尾开始查找元素：</p>
    <pre><code class="language-javascript">
const arr = [1, 2, 3, 4, 5];
const lastEven = arr.findLast(n => n % 2 === 0); // 4
const lastEvenIndex = arr.findLastIndex(n => n % 2 === 0); // 3
    </code></pre>
    
    <h2>哈希bang语法</h2>
    <p>允许在JavaScript文件开头使用#!来指定解释器：</p>
    <pre><code class="language-javascript">
#!/usr/bin/env node
console.log('Hello from Node.js!');
    </code></pre>
    
    <h2>WeakMap和WeakSet的新方法</h2>
    <p>增加了upsert、deleteAll等便利方法。</p>`,
    author: mockUsers[0],
    categoryId: 2,
    tags: [3],
    createdAt: '2023-09-28T16:10:00Z',
    updatedAt: '2023-09-30T11:25:00Z',
    published: true,
    views: 203,
    likes: 31,
    coverImage: 'https://picsum.photos/800/400?random=4'
  },
  {
    id: 5,
    title: 'CSS Grid布局完全指南',
    excerpt: 'CSS Grid是现代网页布局的强大工具。本指南将从基础概念到高级技巧，全面介绍Grid布局的使用方法，并通过实例演示常见布局模式的实现...',
    content: `<p>CSS Grid是现代网页布局的强大工具。本指南将从基础概念到高级技巧，全面介绍Grid布局的使用方法，并通过实例演示常见布局模式的实现...</p>
    
    <h2>Grid基本概念</h2>
    <p>Grid布局包含以下几个核心概念：</p>
    <ul>
      <li>网格容器(Grid Container)</li>
      <li>网格项(Grid Items)</li>
      <li>网格线(Grid Lines)</li>
      <li>网格轨道(Grid Tracks)</li>
      <li>网格单元格(Grid Cells)</li>
      <li>网格区域(Grid Areas)</li>
    </ul>
    
    <h2>基础属性</h2>
    <p>容器属性：</p>
    <ul>
      <li>display: grid</li>
      <li>grid-template-columns</li>
      <li>grid-template-rows</li>
      <li>gap</li>
    </ul>
    
    <p>项目属性：</p>
    <ul>
      <li>grid-column</li>
      <li>grid-row</li>
      <li>grid-area</li>
    </ul>`,
    author: mockUsers[1],
    categoryId: 2,
    tags: [4],
    createdAt: '2023-09-20T13:40:00Z',
    updatedAt: '2023-09-20T13:40:00Z',
    published: true,
    views: 176,
    likes: 29,
    coverImage: 'https://picsum.photos/800/400?random=5'
  },
  {
    id: 6,
    title: 'Node.js性能优化技巧',
    excerpt: '构建高性能的Node.js应用需要掌握一系列优化技巧。本文将分享内存管理、异步处理、缓存策略等方面的最佳实践，帮助你提升应用性能...',
    content: `<p>构建高性能的Node.js应用需要掌握一系列优化技巧。本文将分享内存管理、异步处理、缓存策略等方面的最佳实践，帮助你提升应用性能...</p>
    
    <h2>内存管理</h2>
    <p>避免内存泄漏的关键点：</p>
    <ul>
      <li>及时清理事件监听器</li>
      <li>合理使用全局变量</li>
      <li>监控内存使用情况</li>
    </ul>
    
    <h2>异步处理优化</h2>
    <p>提升异步操作性能的方法：</p>
    <ul>
      <li>使用Promise而不是回调</li>
      <li>合理使用async/await</li>
      <li>避免阻塞事件循环</li>
    </ul>
    
    <h2>缓存策略</h2>
    <p>常用的缓存技术：</p>
    <ul>
      <li>内存缓存(如Redis)</li>
      <li>HTTP缓存</li>
      <li>CDN缓存</li>
    </ul>`,
    author: mockUsers[2],
    categoryId: 3,
    tags: [5],
    createdAt: '2023-09-15T11:20:00Z',
    updatedAt: '2023-09-15T11:20:00Z',
    published: true,
    views: 142,
    likes: 22,
    coverImage: 'https://picsum.photos/800/400?random=6'
  }
];

// 评论数据
export const mockComments = [
  {
    id: 1,
    postId: 1,
    author: mockUsers[1],
    content: '非常好的入门指南，对我这样的新手很有帮助！',
    createdAt: '2023-10-16T09:15:00Z',
    parentId: null
  },
  {
    id: 2,
    postId: 1,
    author: mockUsers[0],
    content: '谢谢支持！如果你有任何问题，欢迎继续提问。',
    createdAt: '2023-10-16T10:30:00Z',
    parentId: 1
  },
  {
    id: 3,
    postId: 2,
    author: mockUsers[2],
    content: '很全面的框架对比，我觉得还可以补充一些关于生态系统的内容。',
    createdAt: '2023-10-11T15:45:00Z',
    parentId: null
  }
];

// 归档数据（按年月统计）
export const mockArchives = [
  {
    year: 2023,
    months: [
      { month: 10, count: 3 },
      { month: 9, count: 3 }
    ]
  },
  {
    year: 2022,
    months: [
      { month: 12, count: 1 },
      { month: 11, count: 1 }
    ]
  },
  {
    year: 2021,
    months: [
      { month: 8, count: 1 }
    ]
  }
];

// 站点统计数据
export const mockStats = {
  totalPosts: mockPosts.length,
  totalUsers: mockUsers.length,
  totalCategories: mockCategories.length,
  totalTags: mockTags.length,
  totalViews: mockPosts.reduce((sum, post) => sum + post.views, 0),
  totalLikes: mockPosts.reduce((sum, post) => sum + post.likes, 0)
};

// 获取文章详情
export const getMockPostById = (id) => {
  return mockPosts.find(post => post.id === parseInt(id));
};

// 获取用户的文章
export const getMockPostsByUserId = (userId) => {
  return mockPosts.filter(post => post.author.id === userId);
};

// 获取分类下的文章
export const getMockPostsByCategoryId = (categoryId) => {
  return mockPosts.filter(post => post.categoryId === categoryId);
};

// 获取标签下的文章
export const getMockPostsByTagId = (tagId) => {
  return mockPosts.filter(post => post.tags.includes(tagId));
};

// 按年月归档文章
export const getMockPostsByYearMonth = (year, month) => {
  return mockPosts.filter(post => {
    const postDate = new Date(post.createdAt);
    return postDate.getFullYear() === year && postDate.getMonth() + 1 === month;
  });
};

// 搜索文章
export const searchMockPosts = (query) => {
  if (!query) return mockPosts;
  
  return mockPosts.filter(post => 
    post.title.toLowerCase().includes(query.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
    post.content.toLowerCase().includes(query.toLowerCase())
  );
};