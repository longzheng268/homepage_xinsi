# homepage_xinsi

这是一个个人主页网站，包含基本的 HTML、CSS 资源，适合部署到静态网站托管平台。

## 目录结构

```
├── CNAME
├── index.html
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── img/
│   │   ├── 头像.png
│   │   └── upyun_logo.svg
├── css/
│   └── styles.css
```

## 功能说明

- `index.html`：网站首页。
- `assets/css/styles.css` 和 `css/styles.css`：样式文件。
- `assets/img/`：图片资源。
- `CNAME`：自定义域名配置（用于 GitHub Pages 或类似平台）。
- `robots.txt`：搜索引擎爬虫规则。
- `sitemap.xml`：网站地图，便于搜索引擎收录。

## 特色特效

- 鼠标/触摸跟随散花：在桌面端和移动端，鼠标移动或触摸时会有花瓣粒子跟随，点击/触摸会有更多花瓣动画。

特效代码已集成在 `index.html`，无需额外依赖。

## 部署方法

1. 将本项目上传至你的静态网站托管平台（如 GitHub Pages、Vercel、Netlify 等）。
2. 如需自定义域名，修改 `CNAME` 文件内容为你的域名。
3. 确保所有资源路径正确，图片和样式文件均已上传。

## 预览

直接访问 `index.html` 即可预览主页效果。

## 许可证

本项目采用 MIT License，允许自由使用、修改和分发。详情见 LICENSE 文件。
