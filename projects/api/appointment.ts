import type { VercelRequest, VercelResponse } from '@vercel/node';

// 飞书 Webhook URL
const FEISHU_WEBHOOK_URL =
  'https://open.feishu.cn/open-apis/bot/v2/hook/c76be793-8389-4e20-b18e-57bd3e437720';

// 发送飞书通知
async function sendFeishuNotification(message: string): Promise<boolean> {
  try {
    const response = await fetch(FEISHU_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        msg_type: 'text',
        content: { text: message },
      }),
    });
    const result = await response.json() as { StatusCode?: number; code?: number };
    return result.StatusCode === 0 || result.code === 0;
  } catch (error) {
    console.error('飞书通知发送失败:', error);
    return false;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 只允许 POST 请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // 设置 CORS 头（如需要）
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const { name, phone, wechat, intro, time, purpose } = req.body as {
    name: string;
    phone: string;
    wechat: string;
    intro: string;
    time: string;
    purpose: string;
  };

  // 构建飞书通知消息
  const message =
    `【预约面谈申请】\n` +
    `姓名：${name}\n` +
    `电话：${phone}\n` +
    `微信：${wechat}\n` +
    `个人简介：${intro}\n` +
    `预约时间：${time}\n` +
    `来意说明：${purpose}\n` +
    `提交时间：${new Date().toLocaleString('zh-CN')}`;

  // 发送飞书通知
  const notificationSent = await sendFeishuNotification(message);

  return res.status(200).json({
    success: true,
    message: '预约提交成功！我们会尽快与您联系。',
    notificationSent,
    timestamp: new Date().toISOString(),
  });
}
