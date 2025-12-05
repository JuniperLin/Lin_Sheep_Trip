// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDsT2YAN_WE9SIZT0q0Nw3c8r_sP5-zwRI",
    authDomain: "lin-sheep-trip.firebaseapp.com",
    databaseURL: "https://lin-sheep-trip-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "lin-sheep-trip",
    storageBucket: "lin-sheep-trip.firebasestorage.app",
    messagingSenderId: "949640502462",
    appId: "1:949640502462:web:14ef811b7ed4a7cbc252ef",
    measurementId: "G-SH074TFM23"
};

// Initialize Firebase
let app, database, storage;
if (typeof firebase !== 'undefined') {
    app = firebase.initializeApp(firebaseConfig);
    database = firebase.database();
    storage = firebase.storage();
}

// Database functions
const saveItineraries = (itineraries) => {
    // Save to Firebase
    if (database) {
        database.ref('itineraries').set(itineraries);
    }
    // Also save to localStorage as backup (with error handling)
    try {
        localStorage.setItem('lin_sheep_trip_itineraries', JSON.stringify(itineraries));
    } catch (e) {
        console.warn('localStorage quota exceeded, clearing old data...');
        // Clear old data and try again
        localStorage.removeItem('lin_sheep_trip_itineraries');
        localStorage.removeItem('lin_sheep_avatar');
        try {
            localStorage.setItem('lin_sheep_trip_itineraries', JSON.stringify(itineraries));
        } catch (e2) {
            console.error('localStorage still full, skipping local backup');
        }
    }
    return Promise.resolve();
};

const loadItineraries = (callback) => {
    if (database) {
        // Load from Firebase ONCE (not realtime listener to avoid infinite loops)
        database.ref('itineraries').once('value', (snapshot) => {
            const data = snapshot.val();
            // Always call callback, even if data is null
            // This allows app.js to distinguish between null (first time) and [] (deleted all)
            callback(data);
        });
    } else {
        // Fallback to localStorage
        const localData = localStorage.getItem('lin_sheep_trip_itineraries');
        callback(localData ? JSON.parse(localData) : null);
    }
    return Promise.resolve();
};

const uploadImage = async (file) => {
    if (storage) {
        const storageRef = storage.ref();
        const imageRef = storageRef.child(`images/${Date.now()}_${file.name}`);
        const snapshot = await imageRef.put(file);
        return await snapshot.ref.getDownloadURL();
    } else {
        // Fallback to base64
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(file);
        });
    }
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

// Expose functions to window for Babel scripts
window.saveItineraries = saveItineraries;
window.loadItineraries = loadItineraries;
window.uploadImage = uploadImage;
window.exportData = exportData;
window.importData = importData;
