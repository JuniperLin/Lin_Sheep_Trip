const App = () => {
    const [itineraries, setItineraries] = React.useState([]);
    const [editingIndex, setEditingIndex] = React.useState(null);
    const [showEditor, setShowEditor] = React.useState(false);
    const [isInitialized, setIsInitialized] = React.useState(false);
    const importFileRef = React.useRef(null);

    // 初始資料 - 預設為空
    const defaultItineraries = [];

    // 初始化載入資料
    React.useEffect(() => {
        // 強制清除所有舊資料（使用 v5 版本旗標）
        const CLEAR_VERSION = 'lin_sheep_data_cleared_v5';
        const shouldClear = !localStorage.getItem(CLEAR_VERSION);

        if (shouldClear) {
            console.log('🧹 強制清除所有舊資料 v4...');
            // 清除 localStorage 所有相關資料
            localStorage.clear(); // 清除所有 localStorage

            // 用 remove() 徹底刪除 Firebase 節點（不是設為空陣列）
            if (typeof database !== 'undefined' && database) {
                database.ref('itineraries').remove()
                    .then(() => console.log('✅ Firebase itineraries 節點已刪除'))
                    .catch(err => console.error('❌ Firebase 刪除失敗:', err));
            }

            // 設定旗標防止下次再清除
            localStorage.setItem(CLEAR_VERSION, 'true');

            // 設定空陣列並初始化
            setItineraries([]);
            setIsInitialized(true);
            return;
        }

        // 正常載入資料流程
        loadItineraries((loadedData) => {
            // 只有真正有資料時才載入
            if (loadedData && Array.isArray(loadedData) && loadedData.length > 0) {
                setItineraries(loadedData);
            } else {
                setItineraries([]);
            }
            setIsInitialized(true);
        });
    }, []);

    // 儲存資料 - 當資料變更時同步到 Firebase 和 localStorage
    React.useEffect(() => {
        // 只在初始化完成後才儲存，避免初始載入時重複儲存
        if (isInitialized) {
            saveItineraries(itineraries);
        }
    }, [itineraries, isInitialized]);

    const handleAddNew = () => {
        setEditingIndex(null);
        setShowEditor(true);
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setShowEditor(true);
    };

    const handleDelete = (index) => {
        if (confirm('確定要刪除這個行程嗎？')) {
            setItineraries(itineraries.filter((_, i) => i !== index));
        }
    };

    const handleSave = (newItinerary) => {
        if (editingIndex !== null) {
            // Edit existing
            const updated = [...itineraries];
            updated[editingIndex] = newItinerary;
            setItineraries(updated);
        } else {
            // Add new
            setItineraries([...itineraries, newItinerary]);
        }
        setShowEditor(false);
        setEditingIndex(null);
    };

    const handleExport = () => {
        exportData(itineraries);
    };

    const handleImport = () => {
        importFileRef.current.click();
    };

    const handleImportFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            importData(file, (data) => {
                setItineraries(data);
                saveItineraries(data);
                alert('資料匯入成功！');
            });
            e.target.value = '';
        }
    };

    return (
        <div className="min-h-screen">
            <PaperTexture />
            <FallingPetals />
            <WalkingSheep />

            {/* Editor Modal */}
            {showEditor && (
                <ItineraryEditor
                    itinerary={editingIndex !== null ? itineraries[editingIndex] : null}
                    onSave={handleSave}
                    onCancel={() => { setShowEditor(false); setEditingIndex(null); }}
                />
            )}

            {/* Header */}
            <header className="h-screen flex flex-col justify-center items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#a1c4fd20] to-[#c2e9fb20] z-[-1]"></div>
                <div className="text-center z-10 px-4">
                    <div className="inline-block px-6 py-2 bg-white/80 rounded-full mb-4 shadow-sm backdrop-blur-sm transform -rotate-2">
                        <span className="text-[#ff9a9e] font-bold font-display tracking-widest">TOKYO TRIP 2025</span>
                    </div>
                    <h1 className="text-4xl md:text-7xl font-bold text-gray-800 mb-6 font-handwriting text-shadow-sm">
                        小羊的<br /><span className="text-[#ff9a9e]">春日大冒險</span>
                    </h1>
                    <p className="text-lg md:text-2xl text-gray-600 font-handwriting bg-white/60 inline-block px-8 py-3 rounded-[30px_10px_30px_10px] shadow-lg">
                        2025.03.18 - 03.23 | Ueno Base 🌸
                    </p>
                </div>
                <div className="absolute bottom-0 left-0 w-full z-10 leading-none text-[#fdfbf7] translate-y-[2px]">
                    <svg className="w-full h-16 md:h-24 block fill-current" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <path d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128V320H0Z"></path>
                    </svg>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 py-20 relative">
                <div className="absolute left-4 md:left-1/2 top-20 bottom-20 w-1 bg-dashed border-l-2 border-[#ff9a9e] border-dashed transform md:-translate-x-1/2 opacity-30 z-0"></div>

                {itineraries.map((itinerary, index) => (
                    <ItineraryCard
                        key={index}
                        {...itinerary}
                        onEdit={() => handleEdit(index)}
                        onDelete={() => handleDelete(index)}
                    />
                ))}
            </main>

            {/* Footer */}
            <footer className="relative bg-[#ff9a9e]/85 text-white pt-32 pb-10 mt-20 overflow-hidden">
                <div className="absolute top-0 left-0 w-full leading-none text-[#fdfbf7] translate-y-[-2px] z-10">
                    <svg className="w-full h-16 md:h-24 block fill-current" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <path d="M0,0H1440V128C1392,122.7,1344,117.3,1248,128C1152,138.7,1056,165.3,960,186.7C864,208,768,224,672,213.3C576,202.7,480,165.3,384,160C288,154.7,192,181.3,96,186.7C48,189.3,24,170.7,0,160V0Z"></path>
                    </svg>
                </div>
                <div className="container mx-auto text-center font-handwriting relative z-10 px-4">
                    <p className="text-2xl mb-4 font-bold">Bon Voyage!</p>
                    <p className="opacity-90">Created with ❤️ by Juniper & Gemini</p>
                    <div className="mt-6 opacity-60 text-sm">東京櫻花季 • 上野 • 2025</div>
                </div>
            </footer>

            {/* Side Action Menu */}
            <SideActionMenu
                onAddNew={handleAddNew}
                onExport={handleExport}
                onImport={handleImport}
                importFileRef={importFileRef}
            />
            <input type="file" ref={importFileRef} onChange={handleImportFile} accept=".json" className="hidden" />
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
