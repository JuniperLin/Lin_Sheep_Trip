const SideActionMenu = ({ onAddNew, onExport, onImport, importFileRef }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const Plus = window.Plus;
    const Download = window.Download;
    const Upload = window.Upload;
    const XIcon = window.XIcon;
    const ChevronRight = window.ChevronRight;

    const handleToggle = () => setIsOpen(!isOpen);

    return (
        <div className="fixed bottom-24 md:bottom-4 left-0 z-50">
            {/* Desktop: Hover to expand - fixed to left edge, vertically centered */}
            <div className="hidden md:flex fixed left-0 top-1/2 -translate-y-1/2 z-50 group">
                {/* Menu panel - slides out from left */}
                <div className={`flex flex-col gap-3 bg-white/90 backdrop-blur-sm shadow-xl p-3 rounded-r-2xl transition-all duration-300 -translate-x-full group-hover:translate-x-0`}>
                    <button onClick={onAddNew}
                        className="w-12 h-12 bg-[#ff9a9e] text-white rounded-full shadow-lg hover:bg-[#ff8a8e] transition-all hover:scale-110 flex items-center justify-center"
                        title="新增行程">
                        <Plus size={24} />
                    </button>
                    <button onClick={onExport}
                        className="w-12 h-12 bg-[#a8e6cf] text-white rounded-full shadow-lg hover:bg-[#8dd9b8] transition-all hover:scale-110 flex items-center justify-center"
                        title="下載備份">
                        <Download size={20} />
                    </button>
                    <button onClick={onImport}
                        className="w-12 h-12 bg-[#ffd89b] text-white rounded-full shadow-lg hover:bg-[#ffc875] transition-all hover:scale-110 flex items-center justify-center"
                        title="匯入備份">
                        <Upload size={20} />
                    </button>
                </div>
                {/* Arrow tab - always visible, flush with left edge */}
                <div className="w-6 h-24 bg-[#ff9a9e]/80 rounded-r-lg flex items-center justify-center cursor-pointer group-hover:bg-[#ff9a9e] transition-colors">
                    <ChevronRight size={18} className="text-white group-hover:animate-pulse" />
                </div>
            </div>

            {/* Mobile: Click to expand */}
            <div className="md:hidden">
                <div className={`flex flex-col gap-3 bg-white/90 backdrop-blur-sm rounded-r-2xl shadow-xl p-3 transition-all duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <button onClick={() => { onAddNew(); setIsOpen(false); }}
                        className="w-12 h-12 bg-[#ff9a9e] text-white rounded-full shadow-lg hover:bg-[#ff8a8e] transition-all flex items-center justify-center"
                        title="新增行程">
                        <Plus size={24} />
                    </button>
                    <button onClick={() => { onExport(); setIsOpen(false); }}
                        className="w-12 h-12 bg-[#a8e6cf] text-white rounded-full shadow-lg hover:bg-[#8dd9b8] transition-all flex items-center justify-center"
                        title="下載備份">
                        <Download size={20} />
                    </button>
                    <button onClick={() => { onImport(); setIsOpen(false); }}
                        className="w-12 h-12 bg-[#ffd89b] text-white rounded-full shadow-lg hover:bg-[#ffc875] transition-all flex items-center justify-center"
                        title="匯入備份">
                        <Upload size={20} />
                    </button>
                    {/* Mobile close button */}
                    <button onClick={handleToggle}
                        className="w-12 h-12 bg-gray-400 text-white rounded-full shadow-lg hover:bg-gray-500 transition-all flex items-center justify-center"
                        title="關閉">
                        <XIcon size={20} />
                    </button>
                </div>
                {/* Mobile toggle button */}
                {!isOpen && (
                    <button onClick={handleToggle}
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-16 bg-[#ff9a9e] rounded-r-xl flex items-center justify-center shadow-lg animate-pulse">
                        <ChevronRight size={24} className="text-white" />
                    </button>
                )}
            </div>
        </div>
    );
};

window.SideActionMenu = SideActionMenu;
