const ItineraryEditor = ({ itinerary, onSave, onCancel }) => {
    const [formData, setFormData] = React.useState(itinerary || {
        day: 'Day 1',
        date: '3/18',
        title: '',
        image: 'https://images.unsplash.com/photo-1554797589-7241bb691973?q=80&w=600&auto=format&fit=crop',
        align: 'left',
        sheepOS: '',
        content: []
    });

    const [newItem, setNewItem] = React.useState({ icon: 'Plane', time: '', text: '' });
    const [editingItemIndex, setEditingItemIndex] = React.useState(null);
    const fileInputRef = React.useRef(null);

    const iconComponents = {
        'Plane': Plane,
        'MapPin': MapPin,
        'Utensils': Utensils,
        'Gift': Gift,
        'Coffee': Coffee,
        'Star': Star,
        'Camera': Camera
    };

    const handleAddItem = () => {
        if (newItem.text.trim()) {
            setFormData({
                ...formData,
                content: [...formData.content, { icon: newItem.icon.toLowerCase(), time: newItem.time, text: newItem.text }]
            });
            setNewItem({ icon: 'Plane', time: '', text: '' });
        }
    };

    const handleEditItem = (index) => {
        setEditingItemIndex(index);
        const item = formData.content[index];
        setNewItem({
            icon: item.icon.charAt(0).toUpperCase() + item.icon.slice(1),
            time: item.time || '',
            text: item.text
        });
    };

    const handleUpdateItem = () => {
        if (editingItemIndex !== null && newItem.text.trim()) {
            const updatedContent = [...formData.content];
            updatedContent[editingItemIndex] = {
                icon: newItem.icon.toLowerCase(),
                time: newItem.time,
                text: newItem.text
            };
            setFormData({ ...formData, content: updatedContent });
            setEditingItemIndex(null);
            setNewItem({ icon: 'Plane', time: '', text: '' });
        }
    };

    const handleCancelEdit = () => {
        setEditingItemIndex(null);
        setNewItem({ icon: 'Plane', time: '', text: '' });
    };

    const handleRemoveItem = (index) => {
        setFormData({
            ...formData,
            content: formData.content.filter((_, i) => i !== index)
        });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result });
                e.target.value = '';
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        if (formData.title.trim()) {
            onSave(formData);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-[#fdfbf7] rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 my-8 animate-scale-in"
                style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px', border: '3px solid #333' }}>

                <h2 className="text-2xl md:text-3xl font-bold text-[#e85a4f] mb-6 font-handwriting text-center">
                    {itinerary ? '編輯行程' : '新增行程'} ✏️
                </h2>

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 font-handwriting">Day</label>
                        <input type="text" value={formData.day}
                            onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                            className="w-full px-3 py-2 border-2 border-gray-300 rounded-xl font-handwriting focus:border-[#ff9a9e] focus:outline-none"
                            placeholder="Day 1" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 font-handwriting">日期</label>
                        <input type="text" value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full px-3 py-2 border-2 border-gray-300 rounded-xl font-handwriting focus:border-[#ff9a9e] focus:outline-none"
                            placeholder="3/18" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 font-handwriting">對齊</label>
                        <select value={formData.align}
                            onChange={(e) => setFormData({ ...formData, align: e.target.value })}
                            className="w-full px-3 py-2 border-2 border-gray-300 rounded-xl font-handwriting focus:border-[#ff9a9e] focus:outline-none">
                            <option value="left">左</option>
                            <option value="right">右</option>
                        </select>
                    </div>
                </div>

                {/* Title */}
                <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-700 mb-2 font-handwriting">標題</label>
                    <input type="text" value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-xl font-handwriting focus:border-[#ff9a9e] focus:outline-none"
                        placeholder="阿美橫町大冒險" />
                </div>

                {/* Image */}
                <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-700 mb-2 font-handwriting">圖片</label>
                    <div className="flex gap-3 items-center">
                        <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                        <button onClick={() => fileInputRef.current.click()}
                            className="px-4 py-2 bg-[#a8e6cf] text-white rounded-xl font-bold hover:bg-[#8dd9b8] transition-colors flex items-center">
                            <Upload size={16} className="mr-2" /> 上傳圖片
                        </button>
                        {formData.image && (
                            <img src={formData.image} alt="Preview" className="w-20 h-20 object-cover rounded-xl border-2 border-gray-300" />
                        )}
                    </div>
                </div>

                {/* Content Items */}
                <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-700 mb-2 font-handwriting">行程內容</label>
                    <div className="space-y-2 mb-3">
                        {formData.content.map((item, index) => (
                            <div key={index} className={`flex items-center gap-2 bg-white p-3 rounded-xl border-2 ${editingItemIndex === index ? 'border-[#ff9a9e] bg-[#fff9f9]' : 'border-gray-200'}`}>
                                {item.time && (
                                    <span className="text-[#ff9a9e] font-bold text-sm">{item.time}</span>
                                )}
                                <span className="text-[#ff9a9e]">{item.icon}</span>
                                <span className="flex-1 font-handwriting text-sm">{item.text}</span>
                                <button onClick={() => handleEditItem(index)}
                                    className="text-blue-500 hover:text-blue-700"
                                    title="編輯">
                                    <Edit size={16} />
                                </button>
                                <button onClick={() => handleRemoveItem(index)}
                                    className="text-red-500 hover:text-red-700"
                                    title="刪除">
                                    <XIcon size={16} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Add/Edit item */}
                    <div className="flex flex-col gap-2">
                        {editingItemIndex !== null && (
                            <div className="text-sm font-bold text-blue-600 mb-1">
                                ✏️ 編輯模式
                            </div>
                        )}
                        <div className="flex flex-col sm:flex-row gap-2">
                            <input type="time" value={newItem.time}
                                onChange={(e) => setNewItem({ ...newItem, time: e.target.value })}
                                className="w-28 px-2 py-2 border-2 border-gray-300 rounded-xl font-handwriting focus:border-[#ff9a9e] focus:outline-none text-sm"
                                placeholder="時間" />
                            <select value={newItem.icon}
                                onChange={(e) => setNewItem({ ...newItem, icon: e.target.value })}
                                className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-xl font-handwriting focus:border-[#ff9a9e] focus:outline-none text-sm">
                                <option value="Plane">✈️ 飛機</option>
                                <option value="MapPin">📍 地點</option>
                                <option value="Utensils">🍴 美食</option>
                                <option value="Gift">🎁 購物</option>
                                <option value="Coffee">☕ 咖啡</option>
                                <option value="Star">⭐ 推薦</option>
                                <option value="Camera">📷 拍照</option>
                            </select>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <input type="text" value={newItem.text}
                                onChange={(e) => setNewItem({ ...newItem, text: e.target.value })}
                                onKeyPress={(e) => e.key === 'Enter' && (editingItemIndex !== null ? handleUpdateItem() : handleAddItem())}
                                className="w-full px-3 py-2 border-2 border-gray-300 rounded-xl font-handwriting focus:border-[#ff9a9e] focus:outline-none text-sm"
                                placeholder="輸入行程項目..." />
                            <div className="flex gap-2 self-end sm:self-auto">
                                {editingItemIndex !== null && (
                                    <button onClick={handleCancelEdit}
                                        className="px-4 py-2 bg-gray-400 text-white rounded-xl font-bold hover:bg-gray-500 transition-colors flex-shrink-0">
                                        取消
                                    </button>
                                )}
                                <button onClick={editingItemIndex !== null ? handleUpdateItem : handleAddItem}
                                    className="px-6 py-2 bg-[#ff9a9e] text-white rounded-xl font-bold hover:bg-[#ff8a8e] transition-colors flex-shrink-0">
                                    {editingItemIndex !== null ? '更新' : <Plus size={16} />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sheep OS */}
                <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-700 mb-2 font-handwriting">小羊 OS 🐑</label>
                    <textarea value={formData.sheepOS}
                        onChange={(e) => setFormData({ ...formData, sheepOS: e.target.value })}
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-xl font-handwriting focus:border-[#ff9a9e] focus:outline-none resize-none"
                        rows="3"
                        placeholder="小羊想說什麼呢..."></textarea>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                    <button onClick={onCancel}
                        className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-600 font-bold hover:bg-gray-50 transition-colors font-handwriting">
                        取消
                    </button>
                    <button onClick={handleSubmit}
                        className="px-6 py-3 rounded-xl bg-[#ff9a9e] text-white font-bold shadow-md hover:bg-[#ff8a8e] transition-colors font-handwriting">
                        {itinerary ? '儲存' : '新增'}
                    </button>
                </div>
            </div>
        </div>
    );
};
