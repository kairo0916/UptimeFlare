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
  title: "我的服务状态页",

  // 状态页顶部链接
  links: [
    { link: "https://example.com", label: "主页" },
    { link: "https://github.com/example", label: "GitHub" },
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
      target: "https://example.com/",
      statusPageLink: "https://example.com/",
      expectedCodes: [200],
      timeout: 10000,
      hideLatencyChart: false,
    },

    /**
     * TCP 端口存活监控示例（SSH / 数据库等）
     */
    {
      id: "server_ssh",
      name: "服务器 SSH",
      method: "TCP_PING",
      target: "127.0.0.1:22",
      timeout: 5000,
    },
  ],

  /* --------------------------
   * 通知配置
   * -------------------------- */
  notification: {
    // 时区
    timeZone: "Asia/Shanghai",

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
    /**
     * 监控状态变化时触发
     */
    onStatusChange: async (
      env: any,
      monitor: any,
      isUp: boolean,
      timeIncidentStart: number,
      timeNow: number,
      reason: string
    ) => {
      const statusText = isUp ? "恢复正常 (UP)" : "服务中断 (DOWN)";
      console.log(
        `[状态变更] ${monitor.name} -> ${statusText}，原因：${reason}`
      );

      // 示例：在此处接入 邮件 / Webhook / 飞书 / Telegram 等
      // env 中可以读取 Worker 环境变量
    },

    /**
     * 事件持续期间（每分钟调用一次）
     */
    onIncident: async (
      env: any,
      monitor: any,
      timeIncidentStart: number,
      timeNow: number,
      reason: string
    ) => {
      // 可用于升级告警、统计持续时间等
    },
  },
};

// ⚠️ 必须导出，否则编译失败
export { pageConfig, workerConfig };
