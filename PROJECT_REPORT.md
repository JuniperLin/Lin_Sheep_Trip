# 🐑 Lin Sheep Trip - 專案進度報告

## 專案概述
一個可愛的東京旅行行程規劃網站，以「小羊」為主角，使用手繪風格設計。

## 專案位置
- **本地路徑**: `e:\Data\juniperlin\Desktop\Lin_Sheep_Trip`
- **GitHub**: https://github.com/JuniperLin/Lin_Sheep_Trip
- **GitHub Pages**: https://juniperlin.github.io/Lin_Sheep_Trip/

## 技術架構

### 前端
- **React 18** (透過 CDN + Babel 即時編譯)
- **Tailwind CSS** (CDN)
- **Google Fonts**: Zen Maru Gothic, Patrick Hand

### 後端/資料儲存
- **Firebase Realtime Database**: 儲存行程資料
- **Firebase Storage**: 儲存上傳的圖片
- **localStorage**: 備用儲存

### Firebase 設定
- **專案名稱**: lin-sheep-trip
- **Database URL**: https://lin-sheep-trip-default-rtdb.asia-southeast1.firebasedatabase.app
- **Storage Bucket**: lin-sheep-trip.firebasestorage.app

---

## 檔案結構

```
Lin_Sheep_Trip/
├── index.html              # 主頁面入口
├── css/
│   └── styles.css          # 自定義動畫和字體
├── js/
│   ├── app.js              # 主應用邏輯 (React App 組件)
│   ├── firebase-config.js  # Firebase 設定和 API 函數
│   ├── icons.js            # Lucide 圖示組件
│   └── components/
│       ├── ItineraryCard.js    # 行程卡片顯示
│       ├── ItineraryEditor.js  # 行程編輯器
│       ├── SideActionMenu.js   # 側邊動作選單
│       ├── WalkingSheep.js     # 走路小羊 (可換頭像)
│       ├── FallingPetals.js    # 飄落櫻花動畫
│       ├── PaperTexture.js     # 紙張紋理背景
│       └── ImageCropper.js     # 圖片裁切工具
└── main.html               # 舊版靜態頁面 (可忽略)
```

---

## 已完成功能

### 🎯 核心功能
- [x] 行程卡片 CRUD (新增、讀取、編輯、刪除)
- [x] Firebase 資料持久化 (刷新後資料保留)
- [x] Firebase Storage 圖片上傳
- [x] 匯出/匯入 JSON 備份功能
- [x] 響應式設計 (電腦/手機)

### 🎨 UI/UX 功能
- [x] 手繪風格卡片設計
- [x] 時間軸式行程展示
- [x] 飄落櫻花動畫背景
- [x] 走路小羊動畫 (可點擊換頭像)
- [x] 側邊動作選單 (點擊滑出)
- [x] 行程卡片 hover 顯示編輯/刪除按鈕

### 📝 編輯器功能
- [x] Day 文字輸入框
- [x] 日期月曆選擇器
- [x] Emoji 圖示選單 (✈️交通、📍景點、🍴美食 等)
- [x] 時間下拉選單 (每30分鐘)
- [x] 小羊OS 心情欄位
- [x] 封面圖片上傳

---

## 重要程式碼說明

### Firebase 函數 (`firebase-config.js`)
```javascript
saveItineraries(itineraries)  // 儲存行程到 Firebase
loadItineraries(callback)     // 載入行程
uploadImage(file)             // 上傳圖片到 Storage
exportData(itineraries)       // 匯出 JSON
importData(file, callback)    // 匯入 JSON
```

### 資料清除機制 (`app.js`)
使用版本旗標 `lin_sheep_data_cleared_v6` 控制一次性清除舊資料。
如需再次清除，可將版本號改為 v7、v8...

---

## 本地開發

### 啟動開發伺服器
```powershell
cd e:\Data\juniperlin\Desktop\Lin_Sheep_Trip
npx http-server -p 8000
```
然後開啟 http://localhost:8000

### 推送到 GitHub
```powershell
git add -A
git commit -m "你的提交訊息"
git push origin main
```

---

## Firebase 安全規則

### Realtime Database Rules
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

### Storage Rules
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

> ⚠️ 目前規則是完全開放的，僅適合個人/開發使用。正式上線需加入身份驗證。

---

## 已知問題與注意事項

1. **GitHub Pages 競爭寫入**
   - GitHub Pages 部署的舊版本可能會寫入預設資料到 Firebase
   - 解決方式：停用 GitHub Pages 或確保部署最新程式碼

2. **資料版本控制**
   - 如需清除所有資料重來，修改 `app.js` 中的 `CLEAR_VERSION` 為新版本號

3. **Firebase 警告**
   - 「安全性規則定義為公開」是正常警告，個人專案可忽略

---

## 未來可能的改進

- [ ] 加入使用者登入 (Firebase Auth)
- [ ] 多行程切換 (如：東京行、大阪行)
- [ ] 拖放排序行程項目
- [ ] 地圖整合 (Google Maps)
- [ ] 分享行程連結功能
- [ ] PWA 支援 (離線使用)

---

## 快速 Debug 指令

```javascript
// 在瀏覽器 Console 執行

// 查看目前 localStorage
console.log(localStorage);

// 清除所有 localStorage
localStorage.clear();

// 強制從 Firebase 重新載入
location.reload();

// 查看 Firebase 連線狀態
console.log(typeof database !== 'undefined' ? 'Firebase OK' : 'Firebase Error');
```

---

*最後更新: 2025-12-06*
