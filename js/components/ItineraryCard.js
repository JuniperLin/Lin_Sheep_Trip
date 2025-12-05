// Helper function to get icon component from string type
const getIconComponent = (iconType, size = 16) => {
    const iconMap = {
        'plane': window.React.createElement(Plane, { size }),
        'mappin': window.React.createElement(MapPin, { size }),
        'utensils': window.React.createElement(Utensils, { size }),
        'gift': window.React.createElement(Gift, { size }),
        'coffee': window.React.createElement(Coffee, { size }),
        'star': window.React.createElement(Star, { size }),
        'camera': window.React.createElement(Camera, { size })
    };
    return iconMap[iconType.toLowerCase()] || window.React.createElement(MapPin, { size });
};

const ItineraryCard = ({ day, date, title, content, image, align = 'left', sheepOS, onEdit, onDelete }) => {
    const [showActions, setShowActions] = React.useState(false);

    return (
        <div className={`flex flex-col md:flex-row items-center mb-24 relative ${align === 'right' ? 'md:flex-row-reverse' : ''}`}
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}>

            {/* Timeline circle */}
            <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-[#ff9a9e] rounded-full border-4 border-white shadow-lg z-10 items-center justify-center text-white font-bold text-center leading-tight">
                {date}
            </div>

            {/* Content card */}
            <div className={`w-full md:w-5/12 ${align === 'right' ? 'md:pl-12' : 'md:pr-12'} relative`}>
                {/* Edit/Delete buttons */}
                <div className={`absolute -top-3 right-2 z-20 flex gap-2 transition-opacity duration-300 ${showActions ? 'opacity-100' : 'opacity-0'}`}>
                    <button onClick={onEdit}
                        className="p-2 bg-[#a8e6cf] text-white rounded-full shadow-lg hover:bg-[#8dd9b8] transition-all hover:scale-110"
                        title="編輯">
                        <Edit size={16} />
                    </button>
                    <button onClick={onDelete}
                        className="p-2 bg-[#ff9a9e] text-white rounded-full shadow-lg hover:bg-[#ff8a8e] transition-all hover:scale-110"
                        title="刪除">
                        <Trash size={16} />
                    </button>
                </div>

                <div className="bg-white p-6 relative transform transition-transform hover:-translate-y-2 duration-300"
                    style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px', boxShadow: '10px 10px 0 rgba(0,0,0,0.05), 5px 5px 15px rgba(0,0,0,0.1)', border: '2px solid #333' }}>

                    {/* Decorative tape */}
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-[#a8e6cf] opacity-80"
                        style={{ clipPath: 'polygon(0 2%, 100% 0, 98% 98%, 2% 100%)', transform: 'translateX(-50%) rotate(-2deg)' }}></div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-[#e85a4f] mb-2 font-handwriting border-b-2 border-dashed border-gray-200 pb-2">
                        {day} <span className="text-sm text-gray-500 ml-2">{title}</span>
                    </h3>

                    {/* Content list */}
                    <ul className="space-y-3">
                        {(content || []).map((item, idx) => (
                            <li key={idx} className="flex items-start text-gray-700 text-sm md:text-base font-handwriting">
                                {item.time && (
                                    <span className="mr-2 text-[#ff9a9e] font-bold min-w-[3rem]">{item.time}</span>
                                )}
                                <span className="mr-2 mt-1 text-[#ff9a9e]">
                                    {typeof item.icon === 'string' ? getIconComponent(item.icon) : item.icon}
                                </span>
                                <span>{item.text}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Sheep's comment */}
                    {sheepOS && (
                        <div className="mt-6 p-4 bg-[#fff9c4] rounded-2xl relative border-2 border-[#f0f4c3] shadow-sm transform rotate-1 transition-transform hover:rotate-0 hover:scale-[1.02]">
                            <div className="absolute -top-3 -left-2 text-2xl filter drop-shadow-sm">🐑</div>
                            <div className="flex items-start">
                                <p className="text-gray-600 font-handwriting text-sm leading-relaxed pl-2 pt-1">
                                    <span className="font-bold text-[#ff9a9e] mr-1">小羊 OS:</span>{sheepOS}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Image */}
            <div className={`w-full md:w-5/12 mt-6 md:mt-0 ${align === 'right' ? 'md:pr-12' : 'md:pl-12'} flex justify-center`}>
                <div className="relative w-64 h-48 md:w-80 md:h-60 bg-white p-2 shadow-xl transform rotate-2 hover:rotate-0 transition-transform duration-500"
                    style={{ borderRadius: '3px' }}>
                    <div className="w-full h-full overflow-hidden relative">
                        <img src={image} alt={title} className="w-full h-full object-cover"
                            style={{ mixBlendMode: 'multiply', filter: 'contrast(1.2) brightness(1.1)' }} />
                        <div className="absolute inset-0 border-[8px] border-white opacity-80"
                            style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}></div>
                    </div>
                    <div className="absolute -bottom-8 right-0 text-gray-400 font-handwriting text-sm transform -rotate-6">
                        @ {title}
                    </div>
                </div>
            </div>
        </div>
    );
};
