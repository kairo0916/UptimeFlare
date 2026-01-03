/**
 * ============================
 * UptimeFlare 通用配置模板
 * ============================
 * 使用前请将示例内容替换为你自己的信息
 */

/* ----------------------------
 * 状态页面配置
 * ---------------------------- */
const pageConfig = {
  // 状态页面标题
  title: "Kairo 的狀態頁",

  // 状态页顶部链接
  links: [
    { link: "https://kairo.qzz.io", label: "主頁" },
    { link: "https://github.com/kairo0916", label: "GitHub" },
  ],

  // [可选] 监控分组
  // 未列入分组的监控将不会显示在状态页（但仍会被监控）
  /*
  group: {
    "Web 服务": ["web_main", "web_backup"],
    "服务器": ["server_ssh"],
  },
  */
};

/* ----------------------------
 * Worker 监控配置
 * ---------------------------- */
const workerConfig = {
  // 除非状态发生变化，否则最多每 N 分钟写入一次 KV
  kvWriteCooldownMinutes: 3,

  // [可选] HTTP Basic Auth
  // passwordProtection: "username:password",

  /* --------------------------
   * 监控列表
   * -------------------------- */
  monitors: [
    /**
     * HTTP / HTTPS 监控示例
     */
    {
      id: "web_main", // 唯一 ID（不要随意修改，否则历史会丢失）
      name: "主站",
      method: "HEAD", // GET / HEAD / POST ...
      target: "https://kairo.qzz.io/",
      statusPageLink: "https://kairo.qzz.io",
      expectedCodes: [200],
      timeout: 10000,
      hideLatencyChart: false,
    },

    /**
     * TCP 端口存活监控示例（SSH / 数据库等）
     */
    {
      id: "umami_web", // 唯一 ID（不要随意修改，否则历史会丢失）
      name: "Umami 狀態頁",
      method: "HEAD", // GET / HEAD / POST ...
      target: "https://umami.kairo.qzz.io",
      statusPageLink: "https://umami.kairo.qzz.io",
      expectedCodes: [200],
      timeout: 10000,
      hideLatencyChart: false,
    },
  ],

  /* --------------------------
   * 通知配置
   * -------------------------- */
  notification: {
    // 时区
    timeZone: "Asia/Taipei",

    // 宽限期（分钟）
    // 连续失败 N 分钟后才发送告警
    gracePeriod: 5,

    // [可选] Apprise
    // appriseApiServer: "https://apprise.example.com/notify",
    // recipientUrl: "tgram://bottoken/chatid",
  },

  /* --------------------------
   * 回调函数
   * -------------------------- */
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
          const statusText = isUp ? '恢復正常 (UP)' : '服務中斷 (DOWN)';
          const color = isUp ? '#4ade80' : '#ef4444'; // green-400 : red-500
          const subject = `[${statusText}] ${monitor.name} 狀態變更通知`;
          // 尝试格式化时间
          let timeString = new Date(timeNow * 1000).toISOString();
          try {
            timeString = new Date(timeNow * 1000).toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' });
          } catch (e) { /* ignore */ }

          const htmlContent = `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
              <h2 style="color: ${color};">${statusText}</h2>
              <p><strong>監控名稱:</strong> ${monitor.name}</p>
              <p><strong>時間:</strong> ${timeString}</p>
              <p><strong>原因:</strong> ${reason}</p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
              <p style="font-size: 12px; color: #888;">來自 UptimeFlare 監控報警</p>
            </div>
          `;

          const resendPayload = {
            from: "系統服務更新 <uptimeflare@kairo.qzz.io>",
            to: ["kairo.tw0916@gmail.com"],
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

export { pageConfig, workerConfig };
