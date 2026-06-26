import { Router } from 'express';

const router = Router();

// 飞书 Webhook URL
const FEISHU_WEBHOOK_URL = 'https://open.feishu.cn/open-apis/bot/v2/hook/c76be793-8389-4e20-b18e-57bd3e437720';

// 发送飞书通知函数
async function sendFeishuNotification(message: string): Promise<boolean> {
  try {
    const response = await fetch(FEISHU_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        msg_type: 'text',
        content: {
          text: message,
        },
      }),
    });

    const result = await response.json();
    return result.StatusCode === 0 || result.code === 0;
  } catch (error) {
    console.error('飞书通知发送失败:', error);
    return false;
  }
}

// API 路由示例
router.get('/api/hello', (req, res) => {
  res.json({
    message: 'Hello from Express + Vite!',
    timestamp: new Date().toISOString(),
  });
});

router.post('/api/data', (req, res) => {
  const requestData = req.body;
  res.json({
    success: true,
    data: requestData,
    receivedAt: new Date().toISOString(),
  });
});

// 预约面谈提交接口
router.post('/api/appointment', async (req, res) => {
  const { name, phone, wechat, intro, time, purpose } = req.body;

  // 构建飞书通知消息
  const message = `【预约面谈申请】\n姓名：${name}\n电话：${phone}\n微信：${wechat}\n个人简介：${intro}\n预约时间：${time}\n来意说明：${purpose}\n提交时间：${new Date().toLocaleString('zh-CN')}`;

  // 发送飞书通知
  const notificationSent = await sendFeishuNotification(message);

  res.json({
    success: true,
    message: '预约提交成功！我们会尽快与您联系。',
    notificationSent,
    timestamp: new Date().toISOString(),
  });
});

// 申请基金提交接口
router.post('/api/apply', async (req, res) => {
  const { name, phone, wechat, grade, projectName, projectType, description, amount, notes } = req.body;

  // 构建飞书通知消息
  const message = `【基金申请】\n申请人：${name}\n联系方式：${phone}\n微信：${wechat}\n所在年级：${grade}\n项目名称：${projectName}\n项目类型：${projectType}\n项目简介：${description}\n申请金额：${amount}元\n备注：${notes || '无'}\n提交时间：${new Date().toLocaleString('zh-CN')}`;

  // 发送飞书通知
  const notificationSent = await sendFeishuNotification(message);

  res.json({
    success: true,
    message: '申请提交成功！我们会在 7 个工作日内审核并回复您。',
    notificationSent,
    timestamp: new Date().toISOString(),
  });
});

// 健康检查接口
router.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    env: process.env.COZE_PROJECT_ENV,
    timestamp: new Date().toISOString(),
  });
});

export default router;
