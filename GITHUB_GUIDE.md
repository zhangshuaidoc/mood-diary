# GitHub 提交指南

## 准备工作

### 1. 确保 Git 已安装
```bash
git --version
```

### 2. 配置 Git 用户信息（首次使用）
```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```

### 3. 配置 SSH 密钥（推荐）

#### 生成 SSH 密钥
```bash
ssh-keygen -t ed25519 -C "你的邮箱"
# 一路回车使用默认设置
```

#### 查看公钥
```bash
cat ~/.ssh/id_ed25519.pub
```

#### 添加到 GitHub
1. 打开 https://github.com/settings/keys
2. 点击 "New SSH key"
3. 粘贴公钥内容
4. 保存

---

## 提交步骤

### 方式一：在 GitHub 网页创建仓库后提交

#### 1. 在 GitHub 创建新仓库
- 访问 https://github.com/new
- 仓库名称：`mood-diary`
- 描述：`极简心情记录微信小程序`
- 选择 Public 或 Private
- **不要**勾选 "Add a README file"（我们已经有了）
- 点击 "Create repository"

#### 2. 在本地初始化并提交
```bash
# 进入项目目录
cd /root/.openclaw/workspace-xiaohongshu/mood-diary

# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 查看将要提交的文件
git status

# 提交
git commit -m "Initial commit: 心情日志小程序 V1.0

- 实现心情选择功能（8种emoji）
- 实现日历视图展示
- 实现本地存储
- 完善项目文档"

# 关联远程仓库（替换为你的用户名）
git remote add origin git@github.com:你的用户名/mood-diary.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

---

### 方式二：使用 GitHub CLI（推荐）

#### 1. 安装 GitHub CLI
```bash
# Ubuntu/Debian
sudo apt install gh

# macOS
brew install gh
```

#### 2. 登录 GitHub
```bash
gh auth login
```

#### 3. 创建仓库并推送
```bash
# 进入项目目录
cd /root/.openclaw/workspace-xiaohongshu/mood-diary

# 初始化
git init
git add .
git commit -m "Initial commit: 心情日志小程序 V1.0"

# 创建 GitHub 仓库并推送（一条命令搞定）
gh repo create mood-diary --public --source=. --push

# 或者创建私有仓库
gh repo create mood-diary --private --source=. --push
```

---

## 后续更新

### 修改代码后提交
```bash
# 查看修改
git status

# 添加修改的文件
git add .

# 提交
git commit -m "描述你的修改"

# 推送
git push
```

### 常用 Git 命令
```bash
# 查看提交历史
git log --oneline

# 查看远程仓库
git remote -v

# 拉取最新代码
git pull

# 创建新分支
git checkout -b feature/new-feature

# 切换分支
git checkout main
```

---

## 项目文件清单

已准备好的文件：
- ✅ README.md - 项目说明文档
- ✅ LICENSE - MIT 开源协议
- ✅ .gitignore - Git 忽略配置
- ✅ app.js/json/wxss - 小程序入口
- ✅ pages/ - 页面代码
- ✅ utils/ - 工具函数
- ✅ assets/ - 静态资源

---

## 注意事项

1. **AppID**: `project.config.json` 中的 `appid` 需要替换为你自己的
2. **图标**: `assets/icons/` 中的图标建议替换为设计好的 PNG
3. **隐私**: 不要提交敏感信息（AppSecret、API Key 等）

---

**准备好后，按照上述步骤提交即可！** 🚀
