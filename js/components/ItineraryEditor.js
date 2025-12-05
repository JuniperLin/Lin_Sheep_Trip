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

    const [newItem, setNewItem] = React.useState({ icon: 'Plane', time: '', text: '' });
    const [editingItemIndex, setEditingItemIndex] = React.useState(null);
    const [isUploading, setIsUploading] = React.useState(false);
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
            setNewItem({ icon: 'Plane', time: '', text: '' });
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
                alert('Image upload failed');
            }
            setIsUploading(false);
            e.target.value = '';
        }
    };

    const handleSubmit = () => {
        if (formData.title.trim()) {
            onSave(formData);
        } else {
            alert('Please enter a title');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl animate-scale-in">
                <h2 className="text-2xl font-bold text-center mb-6 font-handwriting text-[#ff9a9e]">
                    {itinerary ? 'Edit Itinerary' : 'New Itinerary'}
                </h2>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-bold mb-1">Day</label>
                        <input type="text" value={formData.day}
                            onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                            className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl font-handwriting focus:border-[#ff9a9e] focus:outline-none"
                            placeholder="Day 1" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1">Date</label>
                        <input type="text" value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl font-handwriting focus:border-[#ff9a9e] focus:outline-none"
                            placeholder="3/18" />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-bold mb-1">Title</label>
                        <input type="text" value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl font-handwriting focus:border-[#ff9a9e] focus:outline-none"
                            placeholder="Today's title" />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-bold mb-1">Sheep OS</label>
                        <input type="text" value={formData.sheepOS || ''}
                            onChange={(e) => setFormData({ ...formData, sheepOS: e.target.value })}
                            className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl font-handwriting focus:border-[#ff9a9e] focus:outline-none"
                            placeholder="Sheep's thoughts..." />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1">Align</label>
                        <select value={formData.align}
                            onChange={(e) => setFormData({ ...formData, align: e.target.value })}
                            className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl font-handwriting focus:border-[#ff9a9e] focus:outline-none">
                            <option value="left">Left</option>
                            <option value="right">Right</option>
                        </select>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-bold mb-2">Cover Image</label>
                    <div className="flex gap-4 items-center">
                        <img src={formData.image} alt="Preview"
                            className="w-24 h-24 object-cover rounded-xl border-2 border-gray-200" />
                        <div>
                            <input type="file" ref={fileInputRef} onChange={handleImageUpload}
                                accept="image/*" className="hidden" />
                            <button onClick={() => fileInputRef.current.click()}
                                disabled={isUploading}
                                className="px-4 py-2 bg-[#a8e6cf] text-white rounded-xl hover:bg-[#8dd9b8] transition-colors disabled:opacity-50">
                                {isUploading ? 'Uploading...' : 'Change Image'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-bold mb-2">Content Items</label>

                    <div className="space-y-2 mb-4">
                        {(formData.content || []).map((item, index) => {
                            const IconComp = iconComponents[item.icon.charAt(0).toUpperCase() + item.icon.slice(1)] || MapPin;
                            return (
                                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-xl">
                                    <IconComp size={16} className="text-[#ff9a9e]" />
                                    <span className="text-sm text-gray-500">{item.time}</span>
                                    <span className="flex-1 font-handwriting">{item.text}</span>
                                    <button onClick={() => handleEditItem(index)}
                                        className="p-1 text-[#a8e6cf] hover:text-[#8dd9b8]">
                                        <Edit size={14} />
                                    </button>
                                    <button onClick={() => handleDeleteItem(index)}
                                        className="p-1 text-[#ff9a9e] hover:text-[#ff8a8e]">
                                        <Trash size={14} />
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex gap-2 items-center flex-wrap">
                        <select value={newItem.icon}
                            onChange={(e) => setNewItem({ ...newItem, icon: e.target.value })}
                            className="px-2 py-1 border-2 border-gray-200 rounded-lg text-sm focus:border-[#ff9a9e] focus:outline-none">
                            {Object.keys(iconComponents).map(icon => (
                                <option key={icon} value={icon}>{icon}</option>
                            ))}
                        </select>
                        <input type="text" value={newItem.time}
                            onChange={(e) => setNewItem({ ...newItem, time: e.target.value })}
                            placeholder="Time"
                            className="w-20 px-2 py-1 border-2 border-gray-200 rounded-lg text-sm focus:border-[#ff9a9e] focus:outline-none" />
                        <input type="text" value={newItem.text}
                            onChange={(e) => setNewItem({ ...newItem, text: e.target.value })}
                            placeholder="Description"
                            className="flex-1 min-w-[150px] px-2 py-1 border-2 border-gray-200 rounded-lg text-sm focus:border-[#ff9a9e] focus:outline-none" />
                        {editingItemIndex !== null ? (
                            <div className="flex gap-1">
                                <button onClick={handleUpdateItem}
                                    className="px-3 py-1 bg-[#a8e6cf] text-white rounded-lg text-sm hover:bg-[#8dd9b8]">
                                    Update
                                </button>
                                <button onClick={() => { setEditingItemIndex(null); setNewItem({ icon: 'Plane', time: '', text: '' }); }}
                                    className="px-3 py-1 bg-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-400">
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <button onClick={handleAddItem}
                                className="px-3 py-1 bg-[#ff9a9e] text-white rounded-lg text-sm hover:bg-[#ff8a8e]">
                                Add
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex gap-4 justify-center">
                    <button onClick={onCancel}
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-colors">
                        Cancel
                    </button>
                    <button onClick={handleSubmit}
                        className="px-6 py-2 bg-[#ff9a9e] text-white rounded-xl font-bold hover:bg-[#ff8a8e] transition-colors">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

window.ItineraryEditor = ItineraryEditor;
