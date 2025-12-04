# 小羊旅行規劃網站

一個可愛的手繪風格旅行規劃網站，支援完整的編輯功能和雲端同步。

![東京櫻花之旅](https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=600&auto=format&fit=crop)

## ✨ 功能特色

- 🎨 **手繪風格設計** - 溫馨可愛的介面
- ✏️ **即時編輯** - 點擊即可編輯行程
- ➕ **輕鬆管理** - 新增、刪除行程
- 🖼️ **圖片上傳** - 支援自訂圖片
- 💾 **資料持久化** - localStorage 自動儲存
- 📥 **備份功能** - JSON 匯出/匯入
- 🌸 **動畫效果** - 櫻花飄落、小羊動畫
- 📱 **響應式設計** - 支援手機、平板、電腦

## 🚀 快速開始

### 本地執行

需要 HTTP 伺服器來執行（因為使用了 React/Babel CDN）：

```bash
# 使用 Python
cd Lin_Sheep_Trip
python -m http.server 8000
```

然後打開瀏覽器訪問 `http://localhost:8000/index.html`

### 使用方式

1. **新增行程**：點擊左下角的 ➕ 按鈕
2. **編輯行程**：滑鼠移到卡片上，點擊鉛筆圖示
3. **刪除行程**：滑鼠移到卡片上，點擊垃圾桶圖示
4. **備份資料**：點擊左下角綠色下載按鈕
5. **匯入資料**：點擊左下角黃色上傳按鈕

## 📁 專案結構

```
Lin_Sheep_Trip/
├── index.html              # 主要入口檔案
├── main.html              # 原始檔案備份
├── css/
│   └── styles.css         # 所有樣式
└── js/
    ├── icons.js           # SVG Icon 元件
    ├── firebase-config.js # Firebase 設定
    ├── app.js            # 主要應用程式
    └── components/        # React 元件
        ├── PaperTexture.js
        ├── FallingPetals.js
        ├── ImageCropper.js
        ├── WalkingSheep.js
        ├── ItineraryCard.js
        └── ItineraryEditor.js
```

## ☁️ Firebase 雲端同步（可選）

### 1. 建立 Firebase 專案

1. 前往 [Firebase Console](https://console.firebase.google.com/)
2. 建立新專案
3. 啟用 Realtime Database
4. 啟用 Storage

### 2. 設定 Firebase

在 `js/firebase-config.js` 中填入你的 Firebase 配置：

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

取消註解 Firebase 相關程式碼，並在 `index.html` 中啟用 Firebase SDK。

## 🌐 部署到 GitHub Pages

1. 建立 GitHub Repository
2. 推送程式碼：
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/Lin_Sheep_Trip.git
   git push -u origin main
   ```
3. 在 Repository Settings → Pages 中：
   - Source: Deploy from a branch
   - Branch: main / (root)
   - 儲存

4. 訪問 `https://yourusername.github.io/Lin_Sheep_Trip`

## 🛠️ 技術棧

- **React 18** - UI 框架
- **Tailwind CSS** - 樣式框架
- **Firebase** - 雲端資料庫（可選）
- **Babel** - JSX 轉譯
- **localStorage** - 本地資料儲存

## 📝 修改預設資料

預設行程資料在 `js/app.js` 的 `defaultItineraries` 陣列中。可以直接修改或使用編輯功能調整。

## 🎨 自訂樣式

所有 CSS 樣式集中在 `css/styles.css`，包括：
- 字體定義
- 動畫效果
- 自訂樣式類別

## 📦 備份與還原

### 備份資料
點擊左下角綠色按鈕，會下載 JSON 檔案到本地。

### 還原資料
點擊左下角黃色按鈕，選擇之前備份的 JSON 檔案即可還原。

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📄 授權

MIT License

---

**Created with ❤️ by Juniper & Gemini**
