// Cấu hình PM2 - chạy:  pm2 start ecosystem.config.js --env production
module.exports = {
  apps: [
    {
      name: 'hai-san-pata',
      script: 'server.js',
      cwd: __dirname,

      // cluster: PM2 tự chia tải qua nhiều tiến trình, và cho phép
      // `pm2 reload` deploy không rớt request nào.
      exec_mode: 'cluster',
      // Landing page nhẹ nên 2 tiến trình là đủ. VPS nhiều CPU thì đổi 'max'.
      instances: 2,

      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      },

      // Rò rỉ bộ nhớ thì tự khởi động lại thay vì để server đứng.
      max_memory_restart: '300M',
      autorestart: true,

      // Chặn vòng lặp crash-restart vô tận khi sai config (vd: thiếu MONGO_URI):
      // quá 10 lần lỗi liên tiếp thì PM2 dừng hẳn để mình vào xem log.
      max_restarts: 10,
      min_uptime: '20s',
      restart_delay: 3000,

      // watch phải TẮT trên production, không thì sửa file là restart giữa chừng.
      watch: false,

      time: true,
      merge_logs: true,
      error_file: 'logs/pm2-error.log',
      out_file: 'logs/pm2-out.log'
    }
  ]
};
