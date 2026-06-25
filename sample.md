# 轻量 Markdown 阅读器

欢迎使用轻量 Markdown 阅读器！本工具支持丰富的 Markdown 语法渲染，提供舒适的阅读体验。

## 功能特性

### 排版风格

参考 Typora LaTeX 主题，采用学术论文式排版：

- **衬线体**中文，暖白背景
- **两端对齐** + **首行缩进**
- 合理的行高与段间距

### 支持的语法

#### 代码高亮

```javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 55
```

```python
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)

print(quick_sort([3, 6, 8, 10, 1, 2, 1]))
```

#### 表格

| 功能 | 快捷键 | 说明 |
|------|--------|------|
| 切换目录 | `Ctrl+B` | 收起/展开左侧目录面板 |
| 打开文件 | `Ctrl+O` | 触发文件选择器 |
| 主题切换 | — | 亮色 ↔ 暗色 |
| 字号调节 | — | A⁻ / A⁺ 按钮 |

#### 引用

> 阅读是最好的旅行，文字是最美的风景。
> —— 某位不知名的书虫

#### 任务列表

- [x] Markdown 解析与渲染
- [x] 左侧目录树自动生成
- [x] 亮色/暗色主题切换
- [x] 字号调节
- [x] 多文件 Tab 切换
- [ ] 导出 PDF 功能
- [ ] 搜索功能

### LaTeX 公式

行内公式：质能方程 $E = mc^2$ 是物理学中最著名的公式之一。

块级公式：

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

$$
\nabla \times \mathbf{E} = -\frac{\partial \mathbf{B}}{\partial t}
$$

### 图片示例

![Markdown Logo](https://markdown-here.com/img/icon256.png)

---

## 快捷键说明

| 操作 | 快捷键 |
|------|--------|
| 切换目录面板 | `Ctrl+B` / `Cmd+B` |
| 打开文件 | `Ctrl+O` / `Cmd+O` |
| 缩小字号 | `Ctrl+-` |
| 放大字号 | `Ctrl+=` |

## 关于

本工具完全在浏览器端运行，**不会向任何服务器发送数据**，保护您的隐私安全。

*享受阅读，享受 Markdown。*