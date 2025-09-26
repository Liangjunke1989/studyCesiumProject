/*
 * @Author: LiangJunke
 * @Date: 2025-09-26 15:16:17
 * @Description: title
 * @FastButton: ctrl+win+i, ctrl+win+t
 */
const express = require("express");
const app = express();
const port = 8013; // 自定义端口号（不要与已存在端口冲突）
app.use(express.static("dist")); // dist 是项目的打包资源路径
app.listen(port, () => console.log(`服务器 ${port} 开启成功!`));
// node server.js
