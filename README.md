
# homepage_xinsi

| 中文 | English |
| ---- | ------- |
| 这是一个个人主页网站，包含基本的 HTML、CSS 资源，适合部署到静态网站托管平台。 | This is a personal homepage website, including basic HTML and CSS resources, suitable for deployment to static site hosting platforms. |

## 目录结构 / Directory Structure

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

## 功能说明 / Features

| 中文 | English |
| ---- | ------- |
| `index.html`：网站首页。 | `index.html`: Homepage. |
| `assets/css/styles.css` 和 `css/styles.css`：样式文件。 | `assets/css/styles.css` and `css/styles.css`: Stylesheets. |
| `assets/img/`：图片资源。 | `assets/img/`: Image resources. |
| `CNAME`：自定义域名配置（用于 GitHub Pages 或类似平台）。 | `CNAME`: Custom domain config (for GitHub Pages or similar). |
| `robots.txt`：搜索引擎爬虫规则。 | `robots.txt`: Search engine crawler rules. |
| `sitemap.xml`：网站地图，便于搜索引擎收录。 | `sitemap.xml`: Sitemap for search engine indexing. |
| 修复：通过全局设置 `box-sizing: border-box`，解决移动端背景溢出问题。 | Fix: globally set `box-sizing: border-box` to prevent mobile background overflow. |

## 特色特效 / Special Effects

| 中文 | English |
| ---- | ------- |
| 鼠标/触摸跟随散花：在桌面端和移动端，鼠标移动或触摸时会有花瓣粒子跟随，点击/触摸会有更多花瓣动画。 | Mouse/touch flower effect: On desktop and mobile, flower particles follow mouse/touch, and more appear on click/tap. |

特效代码已集成在 `index.html`，无需额外依赖。<br>Effect code is built into `index.html`, no extra dependencies required.

## 部署方法 / Deployment

| 中文 | English |
| ---- | ------- |
| 1. 将本项目上传至你的静态网站托管平台（如 GitHub Pages、Vercel、Netlify 等）。 | 1. Upload this project to your static site hosting platform (e.g. GitHub Pages, Vercel, Netlify, etc.). |
| 2. 如需自定义域名，修改 `CNAME` 文件内容为你的域名。 | 2. To use a custom domain, edit the `CNAME` file with your domain. |
| 3. 确保所有资源路径正确，图片和样式文件均已上传。 | 3. Make sure all resource paths are correct and files are uploaded. |

## 预览 / Preview

直接访问 `index.html` 即可预览主页效果。<br>Visit `index.html` directly to preview the homepage.

## 许可证 / License

本项目采用 MIT License，允许自由使用、修改和分发。详情见 LICENSE 文件。<br>This project uses the MIT License. Free to use, modify, and distribute. See LICENSE for details.
