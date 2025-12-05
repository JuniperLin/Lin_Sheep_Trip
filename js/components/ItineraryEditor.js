const ItineraryEditor = ({ itinerary, onSave, onCancel }) => {
    const safeItinerary = itinerary ? {
        ...itinerary,
        content: itinerary.content || []
    } : null;

    const [formData, setFormData] = React.useState(safeItinerary || {
        day: 'Day 1',
        date: '3/18',
        title: '',
        image: 'https://images.unsplash.com/photo-1554797589-7241bb691973?q=80&w=600&auto=format&fit=crop',
        align: 'left',
        sheepOS: '',
        content: []
    });

    const [newItem, setNewItem] = React.useState({ icon: 'plane', time: '09:00', text: '' });
    const [editingItemIndex, setEditingItemIndex] = React.useState(null);
    const [isUploading, setIsUploading] = React.useState(false);
    const fileInputRef = React.useRef(null);

    // Icon with emoji mapping
    const iconOptions = [
        { value: 'plane', emoji: '✈️', label: '✈️ 交通' },
        { value: 'mappin', emoji: '📍', label: '📍 景點' },
        { value: 'utensils', emoji: '🍴', label: '🍴 美食' },
        { value: 'gift', emoji: '🎁', label: '🎁 購物' },
        { value: 'coffee', emoji: '☕', label: '☕ 咖啡' },
        { value: 'star', emoji: '⭐', label: '⭐ 特別' },
        { value: 'camera', emoji: '📷', label: '📷 拍照' },
        { value: 'hotel', emoji: '🏨', label: '🏨 住宿' },
        { value: 'train', emoji: '🚃', label: '🚃 電車' },
        { value: 'walk', emoji: '🚶', label: '🚶 步行' }
    ];

    const iconComponents = {
        'Plane': Plane,
        'MapPin': MapPin,
        'Utensils': Utensils,
        'Gift': Gift,
        'Coffee': Coffee,
        'Star': Star,
        'Camera': Camera
    };

    // Generate time options (every 30 minutes)
    const timeOptions = [];
    for (let h = 0; h < 24; h++) {
        for (let m = 0; m < 60; m += 30) {
            const hour = h.toString().padStart(2, '0');
            const min = m.toString().padStart(2, '0');
            timeOptions.push(`${hour}:${min}`);
        }
    }

    // Generate date options (March 18-23, 2025)
    const dateOptions = [
        { value: '3/18', label: '3/18 (二)' },
        { value: '3/19', label: '3/19 (三)' },
        { value: '3/20', label: '3/20 (四)' },
        { value: '3/21', label: '3/21 (五)' },
        { value: '3/22', label: '3/22 (六)' },
        { value: '3/23', label: '3/23 (日)' }
    ];

    // Generate Day options
    const dayOptions = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'];

    const getEmojiForIcon = (iconValue) => {
        const found = iconOptions.find(opt => opt.value === iconValue.toLowerCase());
        return found ? found.emoji : '📍';
    };

    const handleAddItem = () => {
        if (newItem.text.trim()) {
            setFormData({
                ...formData,
                content: [...formData.content, { icon: newItem.icon, time: newItem.time, text: newItem.text }]
            });
            setNewItem({ icon: 'plane', time: '09:00', text: '' });
        }
    };

    const handleEditItem = (index) => {
        setEditingItemIndex(index);
        const item = formData.content[index];
        setNewItem({
            icon: item.icon.toLowerCase(),
            time: item.time || '09:00',
            text: item.text
        });
    };

    const handleUpdateItem = () => {
        if (editingItemIndex !== null && newItem.text.trim()) {
            const updatedContent = [...formData.content];
            updatedContent[editingItemIndex] = {
                icon: newItem.icon,
                time: newItem.time,
                text: newItem.text
            };
            setFormData({ ...formData, content: updatedContent });
            setNewItem({ icon: 'plane', time: '09:00', text: '' });
            setEditingItemIndex(null);
        }
    };

    const handleDeleteItem = (index) => {
        setFormData({
            ...formData,
            content: formData.content.filter((_, i) => i !== index)
        });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setIsUploading(true);
            try {
                const url = await uploadImage(file);
                setFormData({ ...formData, image: url });
            } catch (error) {
                console.error('Upload failed:', error);
            }
            setIsUploading(false);
            e.target.value = '';
        }
    };

    const handleSubmit = () => {
        if (formData.title.trim()) {
            onSave(formData);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in"
                style={{ border: '3px solid #333', borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}>

                {/* Header */}
                <div className="bg-gradient-to-r from-[#ff9a9e] to-[#fecfef] p-6 text-center"
                    style={{ borderRadius: '250px 12px 0 0 / 12px 220px 0 0' }}>
                    <h2 className="text-2xl font-bold text-white font-handwriting drop-shadow-md">
                        {itinerary ? '編輯行程 ✏️' : '新增行程 🌸'}
                    </h2>
                </div>

                <div className="p-6 space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold mb-1 text-gray-700">📅 Day</label>
                            <select value={formData.day}
                                onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-[#ffd89b] rounded-2xl font-handwriting focus:border-[#ff9a9e] focus:outline-none bg-[#fffef5] transition-colors text-lg">
                                {dayOptions.map(day => (
                                    <option key={day} value={day}>{day}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1 text-gray-700">📆 日期</label>
                            <select value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-[#ffd89b] rounded-2xl font-handwriting focus:border-[#ff9a9e] focus:outline-none bg-[#fffef5] transition-colors text-lg">
                                {dateOptions.map(d => (
                                    <option key={d.value} value={d.value}>{d.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-bold mb-1 text-gray-700">✨ 標題</label>
                            <input type="text" value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-[#ffd89b] rounded-2xl font-handwriting focus:border-[#ff9a9e] focus:outline-none bg-[#fffef5] transition-colors text-lg"
                                placeholder="今日行程標題" />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-bold mb-1 text-gray-700">🐑 小羊OS</label>
                            <input type="text" value={formData.sheepOS || ''}
                                onChange={(e) => setFormData({ ...formData, sheepOS: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-[#a8e6cf] rounded-2xl font-handwriting focus:border-[#ff9a9e] focus:outline-none bg-[#f0fff4] transition-colors"
                                placeholder="小羊的心情或感想..." />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1 text-gray-700">↔️ 對齊</label>
                            <select value={formData.align}
                                onChange={(e) => setFormData({ ...formData, align: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-[#ffd89b] rounded-2xl font-handwriting focus:border-[#ff9a9e] focus:outline-none bg-[#fffef5] transition-colors">
                                <option value="left">⬅️ 左</option>
                                <option value="right">➡️ 右</option>
                            </select>
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div className="p-4 bg-gradient-to-r from-[#fff5f5] to-[#fff0f5] rounded-2xl border-2 border-dashed border-[#ff9a9e]">
                        <label className="block text-sm font-bold mb-3 text-gray-700">🖼️ 封面圖片</label>
                        <div className="flex gap-4 items-center">
                            <img src={formData.image} alt="Preview"
                                className="w-28 h-28 object-cover rounded-2xl border-3 border-white shadow-lg" />
                            <div className="flex-1">
                                <input type="file" ref={fileInputRef} onChange={handleImageUpload}
                                    accept="image/*" className="hidden" />
                                <button onClick={() => fileInputRef.current.click()}
                                    disabled={isUploading}
                                    className="w-full px-6 py-3 bg-gradient-to-r from-[#a8e6cf] to-[#88d8b0] text-white rounded-2xl font-bold hover:shadow-lg transition-all disabled:opacity-50 transform hover:scale-105">
                                    {isUploading ? '⏳ 上傳中...' : '📷 更換圖片'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Content Items */}
                    <div className="p-4 bg-[#f8f9fa] rounded-2xl">
                        <label className="block text-sm font-bold mb-3 text-gray-700">📝 行程內容</label>

                        {/* Existing items */}
                        <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                            {(formData.content || []).map((item, index) => (
                                <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                    <span className="text-xl">{getEmojiForIcon(item.icon)}</span>
                                    <span className="text-sm text-[#ff9a9e] font-bold min-w-[50px]">{item.time}</span>
                                    <span className="flex-1 font-handwriting text-gray-700">{item.text}</span>
                                    <button onClick={() => handleEditItem(index)}
                                        className="p-2 text-[#a8e6cf] hover:bg-[#a8e6cf]/20 rounded-full transition-colors">
                                        <Edit size={16} />
                                    </button>
                                    <button onClick={() => handleDeleteItem(index)}
                                        className="p-2 text-[#ff9a9e] hover:bg-[#ff9a9e]/20 rounded-full transition-colors">
                                        <Trash size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Add new item */}
                        <div className="flex gap-2 items-center flex-wrap p-3 bg-white rounded-xl border-2 border-dashed border-gray-200">
                            <select value={newItem.icon}
                                onChange={(e) => setNewItem({ ...newItem, icon: e.target.value })}
                                className="px-3 py-2 border-2 border-gray-200 rounded-xl text-sm focus:border-[#ff9a9e] focus:outline-none bg-white min-w-[100px]">
                                {iconOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                            <select value={newItem.time}
                                onChange={(e) => setNewItem({ ...newItem, time: e.target.value })}
                                className="px-3 py-2 border-2 border-gray-200 rounded-xl text-sm focus:border-[#ff9a9e] focus:outline-none bg-white min-w-[90px]">
                                {timeOptions.map(t => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                            <input type="text" value={newItem.text}
                                onChange={(e) => setNewItem({ ...newItem, text: e.target.value })}
                                placeholder="內容描述"
                                className="flex-1 min-w-[120px] px-3 py-2 border-2 border-gray-200 rounded-xl text-sm focus:border-[#ff9a9e] focus:outline-none" />
                            {editingItemIndex !== null ? (
                                <div className="flex gap-2">
                                    <button onClick={handleUpdateItem}
                                        className="px-4 py-2 bg-[#a8e6cf] text-white rounded-xl text-sm font-bold hover:bg-[#88d8b0] transition-colors">
                                        ✓ 更新
                                    </button>
                                    <button onClick={() => { setEditingItemIndex(null); setNewItem({ icon: 'plane', time: '09:00', text: '' }); }}
                                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-400 transition-colors">
                                        ✕ 取消
                                    </button>
                                </div>
                            ) : (
                                <button onClick={handleAddItem}
                                    className="px-4 py-2 bg-[#ff9a9e] text-white rounded-xl text-sm font-bold hover:bg-[#ff8a8e] transition-colors">
                                    + 新增
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 justify-center pt-4">
                        <button onClick={onCancel}
                            className="px-8 py-3 bg-gray-200 text-gray-700 rounded-2xl font-bold hover:bg-gray-300 transition-all transform hover:scale-105 shadow-md">
                            取消
                        </button>
                        <button onClick={handleSubmit}
                            className="px-8 py-3 bg-gradient-to-r from-[#ff9a9e] to-[#fecfef] text-white rounded-2xl font-bold hover:shadow-lg transition-all transform hover:scale-105 shadow-md">
                            💾 儲存
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.ItineraryEditor = ItineraryEditor;
