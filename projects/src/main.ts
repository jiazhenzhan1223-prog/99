export function initApp(): void {
  const app = document.getElementById('app');

  if (!app) {
    console.error('App element not found');
    return;
  }

  // 渲染首页
  renderHomePage(app);

  // 监听路由变化
  window.addEventListener('hashchange', () => {
    handleRoute(app);
  });
}

function handleRoute(app: HTMLElement): void {
  const hash = window.location.hash;

  if (hash === '#appointment') {
    renderAppointmentPage(app);
  } else if (hash === '#apply') {
    renderApplyPage(app);
  } else {
    renderHomePage(app);
  }
}

function renderHomePage(app: HTMLElement): void {
  app.innerHTML = `
    <div class="min-h-screen flex flex-col px-4 py-6 max-w-md mx-auto">
      <!-- 标识与标题模块 -->
      <div class="text-center mb-8">
        <p class="text-sm text-accent mb-2">浙江大学哲学学院</p>
        <h1 class="text-2xl font-bold text-foreground mb-2">99哲学基金</h1>
        <div class="w-16 h-0.5 bg-accent mx-auto"></div>
      </div>

      <!-- 核心功能区 -->
      <div class="border border-accent rounded-xl p-4 mb-6">
        <p class="text-sm text-accent mb-4 text-center">你想做什么？</p>
        
        <!-- 预约面谈 -->
        <a href="#appointment" class="block bg-white rounded-lg p-4 mb-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <h2 class="text-lg font-semibold text-foreground mb-1">预约面谈</h2>
          <p class="text-sm text-accent">基金创始人线下沟通，探讨创业与就业</p>
        </a>

        <!-- 申请基金 -->
        <a href="#apply" class="block bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <h2 class="text-lg font-semibold text-foreground mb-1">申请基金</h2>
          <p class="text-sm text-accent">提交项目申请，获取创业创新资金支持</p>
        </a>
      </div>

      <!-- 底部介绍 -->
      <div class="text-center mt-auto">
        <p class="text-sm text-accent leading-relaxed">99哲学基金由浙大99级校友吴梁先生、詹佳珍女士</p>
        <p class="text-sm text-accent leading-relaxed mt-1">发起创立，助力浙大哲学系学生创新创业类项目</p>
      </div>
    </div>
  `;
}

function renderAppointmentPage(app: HTMLElement): void {
  app.innerHTML = `
    <div class="min-h-screen flex flex-col px-4 py-6 max-w-md mx-auto">
      <!-- 标识与标题模块 -->
      <div class="text-center mb-8">
        <p class="text-sm text-accent mb-2">浙江大学哲学学院</p>
        <h1 class="text-2xl font-bold text-foreground mb-2">预约面谈</h1>
        <div class="w-16 h-0.5 bg-accent mx-auto"></div>
      </div>

      <!-- 预约表单 -->
      <div class="border border-accent rounded-xl p-4 mb-6">
        <p class="text-sm text-accent mb-4 text-center">请填写预约信息</p>
        
        <form id="appointmentForm" class="space-y-4">
          <div>
            <label class="block text-sm font-semibold text-foreground mb-1">姓名 <span class="text-red-500">*</span></label>
            <input type="text" name="name" required 
              class="w-full px-3 py-2 border border-accent rounded-lg text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="请输入姓名">
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-foreground mb-1">电话 <span class="text-red-500">*</span></label>
            <input type="tel" name="phone" required 
              class="w-full px-3 py-2 border border-accent rounded-lg text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="请输入电话">
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-foreground mb-1">微信 <span class="text-red-500">*</span></label>
            <input type="text" name="wechat" required 
              class="w-full px-3 py-2 border border-accent rounded-lg text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="请输入微信号">
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-foreground mb-1">个人简介 <span class="text-red-500">*</span></label>
            <textarea name="intro" rows="3" required 
              class="w-full px-3 py-2 border border-accent rounded-lg text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              placeholder="请简单介绍自己"></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-foreground mb-1">预约时间 <span class="text-red-500">*</span></label>
            <input type="text" name="time" required 
              class="w-full px-3 py-2 border border-accent rounded-lg text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="如：6月上旬，5月最后一周">
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-foreground mb-1">来意说明 <span class="text-red-500">*</span></label>
            <textarea name="purpose" rows="3" required 
              class="w-full px-3 py-2 border border-accent rounded-lg text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              placeholder="请说明您的来意"></textarea>
          </div>
          
          <button type="submit" 
            class="w-full bg-foreground py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-colors" 
            style="background-color: #5d4e37; color: white;">
            提交预约
          </button>
        </form>
      </div>

      <!-- 底部返回链接 -->
      <div class="text-center">
        <a href="#" class="text-sm text-accent hover:underline inline-flex items-center">
          <span class="mr-1">←</span> 返回首页
        </a>
      </div>
    </div>
  `;

  // 处理表单提交
  const form = document.getElementById('appointmentForm') as HTMLFormElement;
  if (form) {
    form.addEventListener('submit', async (e: Event) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        wechat: formData.get('wechat'),
        intro: formData.get('intro'),
        time: formData.get('time'),
        purpose: formData.get('purpose'),
      };

      try {
        const response = await fetch('/api/appointment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        
        if (result.success) {
          alert(result.message);
          window.location.hash = '';
        } else {
          alert('提交失败，请稍后重试。');
        }
      } catch (error) {
        console.error('提交失败:', error);
        alert('网络错误，请稍后重试。');
      }
    });
  }
}

function renderApplyPage(app: HTMLElement): void {
  app.innerHTML = `
    <div class="min-h-screen flex flex-col px-4 py-6 max-w-md mx-auto">
      <!-- 标识与标题模块 -->
      <div class="text-center mb-8">
        <p class="text-sm text-accent mb-2">浙江大学哲学学院</p>
        <h1 class="text-2xl font-bold text-foreground mb-2">申请基金</h1>
        <div class="w-16 h-0.5 bg-accent mx-auto"></div>
      </div>

      <!-- 申请表单 -->
      <div class="border border-accent rounded-xl p-4 mb-6">
        <p class="text-sm text-accent mb-4 text-center">请填写项目申请信息</p>
        
        <form id="applyForm" class="space-y-4">
          <div>
            <label class="block text-sm font-semibold text-foreground mb-1">申请人姓名 <span class="text-red-500">*</span></label>
            <input type="text" name="name" required 
              class="w-full px-3 py-2 border border-accent rounded-lg text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="请输入姓名">
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-foreground mb-1">联系方式 <span class="text-red-500">*</span></label>
            <input type="tel" name="phone" required 
              class="w-full px-3 py-2 border border-accent rounded-lg text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="请输入联系方式">
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-foreground mb-1">微信 <span class="text-red-500">*</span></label>
            <input type="text" name="wechat" required 
              class="w-full px-3 py-2 border border-accent rounded-lg text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="请输入微信号">
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-foreground mb-1">所在年级 <span class="text-red-500">*</span></label>
            <select name="grade" required 
              class="w-full px-3 py-2 border border-accent rounded-lg text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-accent">
              <option value="">请选择年级</option>
              <option value="大一">大一</option>
              <option value="大二">大二</option>
              <option value="大三">大三</option>
              <option value="大四">大四</option>
              <option value="硕士研究生">硕士研究生</option>
              <option value="博士研究生">博士研究生</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-foreground mb-1">项目名称 <span class="text-red-500">*</span></label>
            <input type="text" name="projectName" required 
              class="w-full px-3 py-2 border border-accent rounded-lg text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="请输入项目名称">
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-foreground mb-1">项目类型 <span class="text-red-500">*</span></label>
            <select name="projectType" required 
              class="w-full px-3 py-2 border border-accent rounded-lg text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-accent">
              <option value="">请选择项目类型</option>
              <option value="创业">创业项目</option>
              <option value="创新">创新研究</option>
              <option value="公益">公益项目</option>
              <option value="other">其他</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-foreground mb-1">项目简介 <span class="text-red-500">*</span></label>
            <textarea name="description" rows="4" required 
              class="w-full px-3 py-2 border border-accent rounded-lg text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              placeholder="请简要描述您的项目内容、目标和预期成果"></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-foreground mb-1">申请金额（元） <span class="text-red-500">*</span></label>
            <input type="number" name="amount" required min="1000" 
              class="w-full px-3 py-2 border border-accent rounded-lg text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="请输入申请金额">
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-foreground mb-1">备注 <span class="text-accent text-xs">（选填）</span></label>
            <textarea name="notes" rows="3" 
              class="w-full px-3 py-2 border border-accent rounded-lg text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              placeholder="如有需要补充说明的内容，请在此填写"></textarea>
          </div>
          
          <button type="submit" 
            class="w-full py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
            style="background-color: #5d4e37; color: white;">
            提交申请
          </button>
        </form>
      </div>

      <!-- 底部返回链接 -->
      <div class="text-center">
        <a href="#" class="text-sm text-accent hover:underline inline-flex items-center">
          <span class="mr-1">←</span> 返回首页
        </a>
      </div>
    </div>
  `;

  // 处理表单提交
  const form = document.getElementById('applyForm') as HTMLFormElement;
  if (form) {
    form.addEventListener('submit', async (e: Event) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        wechat: formData.get('wechat'),
        grade: formData.get('grade'),
        projectName: formData.get('projectName'),
        projectType: formData.get('projectType'),
        description: formData.get('description'),
        amount: formData.get('amount'),
        notes: formData.get('notes'),
      };

      try {
        const response = await fetch('/api/apply', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        
        if (result.success) {
          alert(result.message);
          window.location.hash = '';
        } else {
          alert('提交失败，请稀后重试。');
        }
      } catch (error) {
        console.error('提交失败:', error);
        alert('网络错误，请稍后重试。');
      }
    });
  }
}
