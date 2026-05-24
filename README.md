# 零域方阵 Next

一个保留原版基础、用于后续升级迭代的纯前端塔防游戏项目。

## 在线游玩

线上地址：

```text
https://wzwzwz9394.github.io/zero-domain-defense-next/
```

这个项目不需要后端服务器。仓库的 Settings -> Pages 已配置为 GitHub Actions，每次推送到 `main` 分支都会自动发布。

后续玩法、美术、手感和平衡性改进都在这个 Next 项目上继续。

当前版本包含普通防守和无尽挑战两种模式。只有无尽挑战会要求昵称，并按“地图 + 强度”保存浏览器本地前十排行榜。

新机制包括多档速度、塔升级施工时间、提前呼叫下一波、激光塔锁定朝向，以及会影响炮塔或敌人的特殊地形。

## 本地预览

```bash
python3 -m http.server 5174
```

然后打开：

```text
http://localhost:5174/zero-domain-defense-next/
```
