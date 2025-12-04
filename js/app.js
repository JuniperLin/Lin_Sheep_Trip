const App = () => {
    const [itineraries, setItineraries] = React.useState([]);
    const [editingIndex, setEditingIndex] = React.useState(null);
    const [showEditor, setShowEditor] = React.useState(false);
    const importFileRef = React.useRef(null);

    // 初始資料
    const defaultItineraries = [
        {
            day: "Day 1",
            date: "3/18",
            title: "阿美橫町大冒險",
            image: "https://images.unsplash.com/photo-1554797589-7241bb691973?q=80&w=600&auto=format&fit=crop",
            align: "left",
            sheepOS: "終於到了！Skyliner好快喔，我的羊毛有沒有被風吹亂？媽咪說今晚有章魚燒吃，我要吃三顆！",
            content: [
                { icon: 'plane', text: "14:00 抵達東京！Skyliner 直奔上野" },
                { icon: 'mappin', text: "16:00 Check-in 放行李，小羊要睡靠窗" },
                { icon: 'utensils', text: "17:30 阿美橫町吃鐵火丼 & 章魚燒" },
                { icon: 'gift', text: "19:00 Yamashiroya 玩具店尋寶" }
            ]
        },
        {
            day: "Day 2",
            date: "3/19",
            title: "上野粉紅櫻花海",
            image: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=600&auto=format&fit=crop",
            align: "right",
            sheepOS: "哇～好多粉紅色的花花！不知道熊貓前輩會不會理我？聽說雷門那邊有很大的燈籠，不可以被我撞壞喔！",
            content: [
                { icon: 'coffee', text: "09:00 上野公園樹下野餐 (記得帶墊子!)" },
                { icon: 'star', text: "11:00 上野動物園，看真正的熊貓前輩" },
                { icon: 'mappin', text: "15:00 淺草雷門散步，幫大家求籤" },
                { icon: 'camera', text: "18:00 隅田川公園看晴空塔夜景" }
            ]
        },
        {
            day: "Day 3",
            date: "3/20",
            title: "潮流澀谷 & 展望台",
            image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=600&auto=format&fit=crop",
            align: "left",
            sheepOS: "這裡人好多喔...如果不小心走丟，我就在八公像那邊等媽咪！晚上要去看高高的夕陽，腳會不會發抖呀？",
            content: [
                { icon: 'mappin', text: "10:00 澀谷十字路口與八公像合照" },
                { icon: 'coffee', text: "13:00 中目黑星巴克，目黑川賞櫻散步" },
                { icon: 'camera', text: "16:30 Shibuya Sky 看絕美夕陽 (已預約)" },
                { icon: 'gift', text: "19:30 Parco 任天堂 & 寶可夢中心" }
            ]
        },
        {
            day: "Day 4",
            date: "3/21",
            title: "富士山河口湖",
            image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?q=80&w=600&auto=format&fit=crop",
            align: "right",
            sheepOS: "那個山好像布丁喔！上面白白的好像很好吃～我要跟薰衣草冰淇淋合照，但不能融化在羊毛上！",
            content: [
                { icon: 'utensils', text: "08:00 搭乘富士回遊號，吃火車便當" },
                { icon: 'camera', text: "11:00 下吉田商店街，拍日式街景" },
                { icon: 'star', text: "14:00 大石公園吃薰衣草霜淇淋" },
                { icon: 'utensils', text: "18:00 回上野吃一蘭拉麵 + 替玉" }
            ]
        },
        {
            day: "Day 5",
            date: "3/22",
            title: "吉祥寺雜貨巡禮",
            image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600&auto=format&fit=crop",
            align: "left",
            sheepOS: "天鵝船長得呆呆的，跟我有點像？我也要買酷酷的古著，這樣回台灣就是最潮的小羊了！",
            content: [
                { icon: 'star', text: "10:00 井之頭公園踩天鵝船 (小心別掉下去)" },
                { icon: 'gift', text: "12:30 吉祥寺商店街買藥妝 & 雜貨" },
                { icon: 'utensils', text: "15:30 下北澤吃湯咖哩、逛古著" },
                { icon: 'mappin', text: "19:00 新宿歌舞伎町感受熱鬧氣氛" }
            ]
        },
        {
            day: "Day 6",
            date: "3/23",
            title: "滿載而歸",
            image: "https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=600&auto=format&fit=crop",
            align: "right",
            sheepOS: "嗚嗚...不想回家...行李箱好像被我的零食塞滿了？媽咪說下次還可以再來，那我們打勾勾喔！",
            content: [
                { icon: 'gift', text: "10:00 上野二木の菓子最後補貨" },
                { icon: 'coffee', text: "12:00 Check-out，便利商店炸雞當午餐" },
                { icon: 'plane', text: "14:00 搭乘 Skyliner 前往成田機場" },
                { icon: 'star', text: "16:00 小羊回家囉！期待下次旅行" }
            ]
        }
    ];

    // 初始化載入資料
    React.useEffect(() => {
        loadItineraries((loadedData) => {
            if (loadedData && loadedData.length > 0) {
                setItineraries(loadedData);
            } else {
                setItineraries(defaultItineraries);
                saveItineraries(defaultItineraries);
            }
        });
    }, []);

    // 儲存資料
    React.useEffect(() => {
        if (itineraries.length > 0) {
            saveItineraries(itineraries);
        }
    }, [itineraries]);

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

            {/* Floating Action Buttons */}
            <div className="fixed bottom-24 md:bottom-4 left-4 z-50 flex flex-col gap-3">
                <button onClick={handleAddNew}
                    className="w-14 h-14 bg-[#ff9a9e] text-white rounded-full shadow-xl hover:bg-[#ff8a8e] transition-all hover:scale-110 flex items-center justify-center"
                    title="新增行程">
                    <Plus size={24} />
                </button>
                <button onClick={handleExport}
                    className="w-14 h-14 bg-[#a8e6cf] text-white rounded-full shadow-xl hover:bg-[#8dd9b8] transition-all hover:scale-110 flex items-center justify-center"
                    title="下載備份">
                    <Download size={20} />
                </button>
                <button onClick={handleImport}
                    className="w-14 h-14 bg-[#ffd89b] text-white rounded-full shadow-xl hover:bg-[#ffc875] transition-all hover:scale-110 flex items-center justify-center"
                    title="匯入備份">
                    <Upload size={20} />
                </button>
                <input type="file" ref={importFileRef} onChange={handleImportFile} accept=".json" className="hidden" />
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
