const pageConfig = {
  // 状态页面的标题
  title: "AcoFork 的状态页",
  // 在状态页面头部显示的链接，可以设置 `highlight` 为 `true`
  links: [
    { link: 'https://github.com/afoim', label: 'GitHub' },
    { link: 'https://blog.acofork.com/', label: '博客' },
  ],
  // [可选] 对监控进行分组
  // 如果不指定，所有监控将显示在一个列表中
  // 如果指定，监控将按分组显示，未列出的监控将不可见（但仍会被监控）
  //group: {
 //  "默认组": ['blog', 'yxvm_ssh'],
  //},
}

const workerConfig = {
  // 除非状态发生变化，否则最多每 3 分钟写入一次 KV
  kvWriteCooldownMinutes: 3,
  // 通过取消注释下面的行来为状态页面和 API 启用 HTTP Basic 认证，格式 `<USERNAME>:<PASSWORD>`
  // passwordProtection: 'username:password',
  // 在这里定义所有的监控
  monitors: [
    // HTTP 监控示例
    // {
    //   // `id` 应该是唯一的，如果 `id` 保持不变，历史记录将被保留
    //   id: 'blog',
    //   // `name` 用于状态页面和回调消息
    //   name: '博客',
    //   // `method` 应该是有效的 HTTP 方法
    //   method: 'HEAD',
    //   // `target` 是一个有效的 URL
    //   target: 'https://blog.acofork.com/',
    //   // [可选] `tooltip` 仅用于在状态页面显示提示信息
    //   //tooltip: '这是此监控的提示信息',
    //   // [可选] `statusPageLink` 仅用于状态页面的可点击链接
    //   statusPageLink: 'https://blog.acofork.com/',
    //   // [可选] `hideLatencyChart` 如果设置为 true，将隐藏状态页面的延迟图表
    //   hideLatencyChart: false,
    //   // [可选] `expectedCodes` 是可接受的 HTTP 响应代码数组，如果不指定，默认为 2xx
    //   expectedCodes: [200],
    //   // [可选] `timeout` 以毫秒为单位，如果不指定，默认为 10000
    //   timeout: 10000,
    //   // [可选] 要发送的头部信息
    //   //headers: {
    //   //  'User-Agent': 'Uptimeflare',
    //   //  Authorization: 'Bearer YOUR_TOKEN_HERE',
    //   //},
    //   // [可选] 要发送的正文
    //   //body: 'Hello, world!',
    //   // [可选] 如果指定，响应必须包含关键字才被视为正常
    //   //responseKeyword: 'success',
    //   // [可选] 如果指定，响应必须不包含关键字才被视为正常
    //   //responseForbiddenKeyword: 'bad gateway',
    //   // [可选] 如果指定，检查将在您指定的区域运行，
    //   // 设置此值之前请参考文档 https://github.com/lyc8503/UptimeFlare/wiki/Geo-specific-checks-setup
    //   //checkLocationWorkerRoute: 'https://xxx.example.com',
    // },
    {
      id: 'blog',
      name: '博客总入口（自动分流）',
      method: 'HEAD',
      target: 'https://blog.acofork.com/',
      statusPageLink: 'https://blog.acofork.com/',
      hideLatencyChart: false,
      expectedCodes: [200],
      timeout: 10000,
    },
    {
      id: 'blog_eo',
      name: '博客（EdgeOne Pages国内节点）',
      method: 'HEAD',
      target: 'https://eo-blog.acofork.com/',
      statusPageLink: 'https://eo-blog.acofork.com/',
      hideLatencyChart: false,
      expectedCodes: [200],
      timeout: 10000,
    },
    {
      id: 'blog_cf',
      name: '博客（Cloudflare Pages海外节点）',
      method: 'HEAD',
      target: 'https://cf-blog.acofork.com/',
      statusPageLink: 'https://cf-blog.acofork.com/',
      hideLatencyChart: false,
      expectedCodes: [200],
      timeout: 10000,
    },
    {
      id: 'umami_nas',
      name: 'Umami（NAS）',
      method: 'HEAD',
      target: 'https://umami.acofork.com/',
      statusPageLink: 'https://umami.acofork.com/',
      hideLatencyChart: false,
      expectedCodes: [200],
      timeout: 10000,
    },
    {
      id: 'vw_nas',
      name: 'VaultWarden（NAS）',
      method: 'HEAD',
      target: 'https://vw.acofork.com/',
      statusPageLink: 'https://vw.acofork.com/',
      hideLatencyChart: false,
      expectedCodes: [200],
      timeout: 10000,
    },
    {
      id: 'pan_nas',
      name: 'OpenList（NAS）',
      method: 'GET',
      target: 'https://pan.acofork.com/',
      statusPageLink: 'https://pan.acofork.com/',
      hideLatencyChart: false,
      expectedCodes: [200],
      timeout: 10000,
    },
    {
      id: 'fnos_nas',
      name: '飞牛（NAS）',
      method: 'HEAD',
      target: 'https://nas.acofork.com/',
      statusPageLink: 'https://nas.acofork.com/',
      hideLatencyChart: false,
      expectedCodes: [200],
      timeout: 10000,
    },
    {
      id: 'gh_proxy_eo',
      name: 'Github 代理（EdgeOne）',
      method: 'HEAD',
      target: 'https://gh.072103.xyz/',
      statusPageLink: 'https://gh.072103.xyz/',
      hideLatencyChart: false,
      expectedCodes: [200],
      timeout: 10000,
    },
    {
      id: 'gh_proxy_cf',
      name: 'Github 代理（Cloudflare）',
      method: 'HEAD',
      target: 'https://cf-gh.072103.xyz/',
      statusPageLink: 'https://cf-gh.072103.xyz/',
      hideLatencyChart: false,
      expectedCodes: [200],
      timeout: 10000,
    },
    {
      id: 'eopfapi',
      name: '随机图API（EdgeOne）',
      method: 'HEAD',
      target: 'https://eopfapi.acofork.com/pic/',
      statusPageLink: 'https://eopfapi.acofork.com/pic/',
      hideLatencyChart: false,
      expectedCodes: [200],
      timeout: 10000,
    },
    {
      id: 'eo_umami',
      name: 'Umami（EdgeOne Pages）',
      method: 'HEAD',
      target: 'https://eo-umami.acofork.com/',
      statusPageLink: 'https://eo-umami.acofork.com/',
      hideLatencyChart: false,
      expectedCodes: [200],
      timeout: 10000,
    },
    {
      id: 'upload_to_s3',
      name: '简单上传文件到S3（EdgeOne Pages）',
      method: 'GET',
      target: 'https://u.2x.nz/',
      statusPageLink: 'https://u.2x.nz/',
      hideLatencyChart: false,
      expectedCodes: [200],
      timeout: 10000,
    },
    {
      id: 'onedrive_index',
      name: 'OneDrive 公开只读（Vercel）',
      method: 'HEAD',
      target: 'https://e3.2x.nz/',
      statusPageLink: 'https://e3.2x.nz/',
      hideLatencyChart: false,
      expectedCodes: [200],
      timeout: 10000,
    },
    {
      id: 'eo_http',
      name: '网站安全测试（EdgeOne Pages）',
      method: 'HEAD',
      target: 'https://http.acofork.com/',
      statusPageLink: 'https://http.acofork.com/',
      hideLatencyChart: false,
      expectedCodes: [200],
      timeout: 10000,
    },
    {
      id: 'yxvm_ssh',
      name: 'YxVM SSH',
      method: 'TCP_PING',
      target: '46.232.60.28:22',
      timeout: 5000,
    },
    {
      id: 'nas_ssh',
      name: 'NAS SSH',
      method: 'TCP_PING',
      target: 'nasv6.072103.xyz:22',
      timeout: 5000,
    }
  ],
  notification: {
    // [可选] apprise API 服务器 URL
    // 如果不指定，将不会发送通知
    //appriseApiServer: "https://apprise.example.com/notify",
    // [可选] apprise 的接收者 URL，参考 https://github.com/caronc/apprise
    // 如果不指定，将不会发送通知
    //recipientUrl: "tgram://bottoken/ChatID",
    // [可选] 通知消息中使用的时区，默认为 "Etc/GMT"
    timeZone: "Asia/Shanghai",
    // [可选] 发送通知前的宽限期（分钟）
    // 只有在初始失败后连续 N 次检查都失败时才会发送通知
    // 如果不指定，将立即发送通知
    gracePeriod: 10,
  },
  callbacks: {
    onStatusChange: async (
      env: any,
      monitor: any,
      isUp: boolean,
      timeIncidentStart: number,
      timeNow: number,
      reason: string
    ) => {
      // 当任何监控的状态发生变化时，将调用此回调
      // 在这里编写任何 Typescript 代码

      // 调用 Resend API 发送邮件通知
      // 务必在 Cloudflare Worker 的设置 -> 变量中配置: RESEND_API_KEY
      if (env.RESEND_API_KEY) {
        try {
          const statusText = isUp ? '恢复正常 (UP)' : '服务中断 (DOWN)';
          const color = isUp ? '#4ade80' : '#ef4444'; // green-400 : red-500
          const subject = `[${statusText}] ${monitor.name} 状态变更通知`;
          
          // 尝试格式化时间
          let timeString = new Date(timeNow * 1000).toISOString();
          try {
            timeString = new Date(timeNow * 1000).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
          } catch (e) { /* ignore */ }

          const htmlContent = `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
              <h2 style="color: ${color};">${statusText}</h2>
              <p><strong>监控名称:</strong> ${monitor.name}</p>
              <p><strong>时间:</strong> ${timeString}</p>
              <p><strong>原因:</strong> ${reason}</p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
              <p style="font-size: 12px; color: #888;">来自 UptimeFlare 监控报警</p>
            </div>
          `;

          const resendPayload = {
            from: "系统状态更新 <uptimeflare@update.2x.nz>",
            to: ["acofork@foxmail.com"],
            subject: subject,
            html: htmlContent,
          };

          const resp = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${env.RESEND_API_KEY}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(resendPayload)
          });

          if (!resp.ok) {
            console.error(`Resend API call failed: ${resp.status} ${await resp.text()}`);
          }
        } catch (e) {
          console.error(`Error calling Resend API: ${e}`);
        }
      }

      // 这不会遵循宽限期设置，并且在状态变化时立即调用
      // 如果您想实现宽限期，需要手动处理
    },
    onIncident: async (
      env: any,
      monitor: any,
      timeIncidentStart: number,
      timeNow: number,
      reason: string
    ) => {
      // 如果任何监控有正在进行的事件，此回调将每分钟调用一次
      // 在这里编写任何 Typescript 代码


    },
  },
}

// 别忘了这个，否则编译会失败。
export { pageConfig, workerConfig }
