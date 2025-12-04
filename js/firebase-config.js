// Firebase Configuration
// 請在 Firebase Console 建立專案後，將配置資訊填入下方

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// 暫時使用 localStorage 作為後備方案
// 當 Firebase 設定完成後，取消下方註解即可啟用

/*
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const storage = firebase.storage();

// Database functions
const saveItineraries = (itineraries) => {
    return database.ref('itineraries').set(itineraries);
};

const loadItineraries = (callback) => {
    database.ref('itineraries').on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            callback(data);
        }
    });
};

const uploadImage = async (file) => {
    const storageRef = storage.ref();
    const imageRef = storageRef.child(`images/${Date.now()}_${file.name}`);
    const snapshot = await imageRef.put(file);
    return await snapshot.ref.getDownloadURL();
};
*/

// LocalStorage 暫時方案
const saveItineraries = (itineraries) => {
    localStorage.setItem('lin_sheep_trip_itineraries', JSON.stringify(itineraries));
    return Promise.resolve();
};

const loadItineraries = (callback) => {
    const data = localStorage.getItem('lin_sheep_trip_itineraries');
    if (data) {
        callback(JSON.parse(data));
    }
    return Promise.resolve();
};

const uploadImage = async (file) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
    });
};

// Export/Import functions
const exportData = (itineraries) => {
    const dataStr = JSON.stringify(itineraries, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `小羊旅行計畫_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
};

const importData = (file, callback) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            callback(data);
        } catch (error) {
            alert('匯入失敗：檔案格式不正確');
        }
    };
    reader.readAsText(file);
};
