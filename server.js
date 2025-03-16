/**
 * server.js
 * Node.js + Express 后端示例（无 OpenAI）
 * 
 * 1. 安装依赖: npm install express
 * 2. 启动: node server.js
 * 3. 浏览器访问: http://localhost:3000
 */

const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000; // 本地可固定3000端口

// 解析 JSON (若有 POST 请求要接收JSON时可用)
app.use(express.json());

// 托管 public 文件夹的静态文件 (index.html, CSS, JS, 等)
app.use(express.static(path.join(__dirname, 'public')));

// ========== 模拟数据存储 (仅供演示) ==========

// 自动控制时间段
let scheduleSetting = {
  startTime: "22:00",
  endTime: "06:00"
};

// 排行榜示例
const leaderboardData = [
  { name: "张三", score: 3250 },
  { name: "李四", score: 2800 },
  { name: "王子涵", score: 2400 }
];

// 每日节能任务
const dailyTasks = [
  { task: "关闭空调", points: 10 },
  { task: "关闭照明", points: 5 },
  { task: "关闭无人设备", points: 15 }
];

// ========== 后端接口 ==========

/**
 * GET /api/sensors
 * 返回模拟的传感器数据（温度、湿度、光照、是否有人等）
 */
app.get('/api/sensors', (req, res) => {
  const data = {
    temperature: (20 + Math.random() * 5).toFixed(1), // 20-25之间随机
    humidity: (40 + Math.random() * 20).toFixed(1),   // 40-60之间随机
    light: (300 + Math.random() * 100).toFixed(0),    // 300-400之间随机
    humanDetect: Math.random() > 0.5 ? '有人' : '无人'
  };
  res.json(data);
});

/**
 * GET /api/energy-stats
 * 返回模拟的能耗统计数据（24小时的用电量）
 */
app.get('/api/energy-stats', (req, res) => {
  const stats = [];
  for (let i = 0; i < 24; i++) {
    stats.push({
      hour: i,
      consumption: (Math.random() * 2).toFixed(2) // 0-2 kWh
    });
  }
  res.json(stats);
});

/**
 * GET /api/tasks
 * 返回每日节能任务
 */
app.get('/api/tasks', (req, res) => {
  res.json(dailyTasks);
});

/**
 * GET /api/leaderboard
 * 返回节能排行榜
 */
app.get('/api/leaderboard', (req, res) => {
  // 根据分数降序排序
  const sorted = leaderboardData.sort((a, b) => b.score - a.score);
  res.json(sorted);
});

/**
 * GET /api/schedule
 * 获取自动控制时间段
 */
app.get('/api/schedule', (req, res) => {
  res.json(scheduleSetting);
});

/**
 * POST /api/schedule
 * 更新自动控制时间段
 * 请求体示例: { startTime: "22:00", endTime: "06:00" }
 */
app.post('/api/schedule', (req, res) => {
  const { startTime, endTime } = req.body;
  if (!startTime || !endTime) {
    return res.status(400).json({ error: '缺少 startTime 或 endTime' });
  }
  scheduleSetting.startTime = startTime;
  scheduleSetting.endTime = endTime;
  res.json({ message: '自动控制设置已更新', schedule: scheduleSetting });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
