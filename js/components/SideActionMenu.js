const SideActionMenu = ({ onAddNew, onExport, onImport, importFileRef }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const Plus = window.Plus;
    const Download = window.Download;
    const Upload = window.Upload;
    const ChevronRight = window.ChevronRight;
    const ChevronLeft = window.ChevronLeft || window.ChevronRight; // fallback

    const handleToggle = () => setIsOpen(!isOpen);

    return (
        <div className="fixed z-50" style={{ left: 0, top: '50%', transform: 'translateY(-50%)' }}>
            {/* Container for the slide-out menu */}
            <div className={`flex items-center transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-[72px]'}`}>
                {/* Menu buttons panel */}
                <div className="flex flex-col gap-3 bg-white/95 backdrop-blur-sm shadow-xl p-3 rounded-r-2xl">
                    <button onClick={() => { onAddNew(); setIsOpen(false); }}
                        className="w-12 h-12 bg-[#ff9a9e] text-white rounded-full shadow-lg hover:bg-[#ff8a8e] transition-all hover:scale-110 flex items-center justify-center"
                        title="新增行程">
                        <Plus size={24} />
                    </button>
                    <button onClick={() => { onExport(); setIsOpen(false); }}
                        className="w-12 h-12 bg-[#a8e6cf] text-white rounded-full shadow-lg hover:bg-[#8dd9b8] transition-all hover:scale-110 flex items-center justify-center"
                        title="下載備份">
                        <Download size={20} />
                    </button>
                    <button onClick={() => { onImport(); setIsOpen(false); }}
                        className="w-12 h-12 bg-[#ffd89b] text-white rounded-full shadow-lg hover:bg-[#ffc875] transition-all hover:scale-110 flex items-center justify-center"
                        title="匯入備份">
                        <Upload size={20} />
                    </button>
                </div>

                {/* Toggle arrow button */}
                <button
                    onClick={handleToggle}
                    className="w-6 h-20 bg-[#ff9a9e] rounded-r-lg flex items-center justify-center shadow-md hover:bg-[#ff8a8e] transition-colors"
                    title={isOpen ? "收起" : "展開選單"}>
                    <ChevronRight
                        size={18}
                        className={`text-white transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
                </button>
            </div>
        </div>
    );
};

window.SideActionMenu = SideActionMenu;

