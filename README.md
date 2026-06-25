# Markdown Reader

Markdown Reader 是一个轻量 Markdown 文件阅读器，提供网页端和 macOS 桌面端两种使用方式。它适合快速预览本地 `.md`、`.markdown`、`.txt` 文件，尤其适合阅读包含目录、代码块、表格、任务列表和公式的 Markdown 文档。

## 功能亮点

- 本地打开 Markdown 文件并即时预览
- 支持多标签页，同时阅读多个文件
- 自动生成目录侧栏，滚动时同步高亮
- 支持亮色/暗色主题切换
- 支持 A- / A+ 调整字号
- 支持表格自适应宽度，长链接和长路径自动换行
- 刷新页面后自动恢复已打开的文件会话
- 支持 KaTeX 公式、代码高亮、任务列表

## 网页端

网页端是一个纯静态页面，部署后用户可以直接通过浏览器访问。

### 网页端可以做什么

- 点击“打开”按钮选择本地 Markdown 文件
- 拖拽 `.md` / `.markdown` / `.txt` 文件到页面中打开
- 上传 Markdown 文件后立即预览内容
- 查看自动生成的目录侧栏
- 调整字号、切换主题
- 刷新页面后恢复当前打开的文件内容

### 隐私说明

网页端读取文件发生在浏览器本地。用户通过文件选择器打开的 Markdown 内容不会被本应用上传到服务器。

浏览器出于安全限制，不能像桌面端一样随意读取电脑上的任意文件路径，这是正常行为。

### 本地预览网页端

```bash
python3 -m http.server 4173 --directory dist
```

然后访问：

```text
http://127.0.0.1:4173
```

### 部署到 Vercel

项目已包含 `vercel.json`，Vercel 会直接发布 `dist/` 目录。

通过 GitHub 导入 Vercel 时：

- Framework Preset: Other
- Install Command: 空
- Build Command: 空
- Output Directory: `dist`

也可以参考 [DEPLOY.md](./DEPLOY.md)。

## 桌面端

桌面端基于 Electron，可以更自然地读取本地文件，并支持 macOS 应用方式打开。

### 本地开发运行

```bash
npm install
npm start
```

`npm start` 会自动移除 `ELECTRON_RUN_AS_NODE`，避免 Electron 被当成普通 Node.js 进程启动。

### 打包 macOS 应用

```bash
npm run build:mac:zip
npm run build:mac:dmg
```

产物会生成在 `release/` 目录：

- `release/mac-arm64/Markdown Reader.app`
- `release/Markdown Reader-1.0.0-arm64-mac.zip`
- `release/Markdown Reader-1.0.0-arm64.dmg`

### 安装桌面端

推荐使用 DMG 安装包：

1. 下载 `Markdown Reader-1.0.0-arm64.dmg`
2. 双击打开 DMG
3. 把 `Markdown Reader.app` 拖到 Finder 左侧的“应用程序 / Applications”
4. 打开启动台或 Spotlight，搜索 `Markdown Reader`

### macOS 首次打开安全提示

当前安装包没有 Apple Developer ID 签名，也没有 notarization 公证。首次打开时，macOS 可能提示：

```text
Apple 无法验证 “Markdown Reader” 是否包含可能危害 Mac 安全或泄漏隐私的恶意软件。
```

这是因为应用未使用付费 Apple Developer Program 账号签名，不代表应用一定有问题。

如果你信任这个应用，可以这样打开：

1. 打开 Finder
2. 进入“应用程序 / Applications”
3. 找到 `Markdown Reader.app`
4. 按住 `Control` 键并点击应用，或使用触控板双指轻点
5. 选择“打开”
6. 如果系统仍然拦截，进入“系统设置 > 隐私与安全性”
7. 在“安全性”区域找到被阻止的 `Markdown Reader`
8. 点击“仍要打开”
9. 再次确认“打开”

之后通常就可以从启动台正常打开。

## DMG 和 ZIP 的区别

- DMG：更适合普通用户安装。双击打开后，把 app 拖到 Applications。
- ZIP：适合 GitHub Release、开发测试或手动解压使用。

普通用户建议下载 DMG。

## 项目结构

```text
dist/       网页端静态文件
electron/   Electron 主进程和 preload
release/    本地打包产物，不提交到 Git
```

## 技术栈

- Electron
- markdown-it
- KaTeX
- highlight.js

