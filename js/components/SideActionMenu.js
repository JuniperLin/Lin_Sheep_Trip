const SideActionMenu = ({ onAddNew, onExport, onImport, importFileRef }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);
    const menuRef = React.useRef(null);

    // 桌面版：根據 hover 狀態自動開關
    // 手機版：根據點擊狀態開關
    const shouldMenuBeOpen = window.innerWidth >= 768 ? isHovered : isOpen;

    // 處理手機版點擊
    const handleToggle = () => {
        if (window.innerWidth < 768) {
            setIsOpen(!isOpen);
        }
    };

    // 處理桌面版 hover
    const handleMouseEnter = () => {
        if (window.innerWidth >= 768) {
            setIsHovered(true);
        }
    };

    const handleMouseLeave = () => {
        if (window.innerWidth >= 768) {
            setIsHovered(false);
        }
    };

    return (
        <div
            ref={menuRef}
            className="fixed right-0 top-1/2 -translate-y-1/2 z-50"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* 觸發區域 & 箭頭按鈕 */}
            <div className="relative">
                {/* 桌面版觸發區 */}
                <div className="hidden md:block absolute right-0 top-0 w-16 h-full"></div>

                {/* 手機版箭頭按鈕 */}
                <button
                    onClick={handleToggle}
                    className={`md:hidden absolute right-0 top-1/2 -translate-y-1/2 w-10 h-20 bg-gradient-to-l from-[#ff9a9e] to-transparent flex items-center justify-start pl-1 rounded-l-2xl transition-all duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
                        }`}
                    aria-label="開啟選單"
                >
                    <div className="animate-shimmer">
                        <ChevronLeft size={20} className="text-white" />
                    </div>
                </button>

                {/* 選單內容 */}
                <div
                    className={`flex flex-col gap-3 bg-white/95 backdrop-blur-sm rounded-l-2xl shadow-2xl p-4 pr-6 transition-all duration-500 ease-out ${shouldMenuBeOpen || isOpen
                            ? 'translate-x-0 opacity-100'
                            : 'translate-x-full opacity-0'
                        }`}
                    style={{
                        transform: shouldMenuBeOpen || isOpen ? 'translateX(0)' : 'translateX(100%)',
                    }}
                >
                    {/* 新增行程按鈕 */}
                    <button
                        onClick={() => {
                            onAddNew();
                            setIsOpen(false);
                        }}
                        className="group flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#ff9a9e] to-[#ffc3a0] text-white rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 min-w-[160px]"
                        title="新增行程"
                    >
                        <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                        <span className="font-handwriting font-bold">新增行程</span>
                    </button>

                    {/* 下載按鈕 */}
                    <button
                        onClick={() => {
                            onExport();
                            setIsOpen(false);
                        }}
                        className="group flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#a8e6cf] to-[#7fd8be] text-white rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 min-w-[160px]"
                        title="下載備份"
                    >
                        <Download size={20} className="group-hover:translate-y-1 transition-transform duration-300" />
                        <span className="font-handwriting font-bold">下載</span>
                    </button>

                    {/* 上傳按鈕 */}
                    <button
                        onClick={() => {
                            onImport();
                            setIsOpen(false);
                        }}
                        className="group flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#ffd89b] to-[#ffc875] text-white rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 min-w-[160px]"
                        title="匯入備份"
                    >
                        <Upload size={20} className="group-hover:-translate-y-1 transition-transform duration-300" />
                        <span className="font-handwriting font-bold">上傳</span>
                    </button>

                    {/* 手機版關閉按鈕 */}
                    <button
                        onClick={handleToggle}
                        className="md:hidden flex items-center justify-center w-full py-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
};
