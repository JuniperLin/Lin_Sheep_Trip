const ImageCropper = ({ imageSrc, onCancel, onConfirm }) => {
    const [zoom, setZoom] = React.useState(1);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = React.useState(false);
    const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });
    const containerRef = React.useRef(null);
    const imgRef = React.useRef(null);

    const handleMouseDown = (e) => {
        e.preventDefault();
        setIsDragging(true);
        setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const handleTouchStart = (e) => {
        setIsDragging(true);
        const touch = e.touches[0];
        setDragStart({ x: touch.clientX - position.x, y: touch.clientY - position.y });
    };

    React.useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isDragging) return;
            setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
        };

        const handleTouchMove = (e) => {
            if (!isDragging) return;
            const touch = e.touches[0];
            setPosition({ x: touch.clientX - dragStart.x, y: touch.clientY - dragStart.y });
        };

        const handleMouseUp = () => setIsDragging(false);

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchmove', handleTouchMove);
            window.addEventListener('touchend', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleMouseUp);
        };
    }, [isDragging, dragStart]);

    const handleCrop = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const size = 300;
        canvas.width = size;
        canvas.height = size;
        const img = imgRef.current;

        ctx.clearRect(0, 0, size, size);
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.clip();

        const scaleFactor = size / 256;
        const drawWidth = size * zoom;
        const drawHeight = (img.naturalHeight / img.naturalWidth) * drawWidth;
        const dx = (size / 2) + (position.x * scaleFactor) - (drawWidth / 2);
        const dy = (size / 2) + (position.y * scaleFactor) - (drawHeight / 2);

        ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, dx, dy, drawWidth, drawHeight);
        onConfirm(canvas.toDataURL('image/png'));
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-sm p-4 animate-scale-in">
                <h3 className="text-center text-gray-700 font-bold mb-4 font-handwriting text-lg">調整小羊的照片</h3>
                <div className="relative w-64 h-64 mx-auto mb-6 bg-gray-100 rounded-full overflow-hidden border-4 border-[#ff9a9e] shadow-inner cursor-move touch-none"
                    ref={containerRef}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}>
                    <img ref={imgRef} src={imageSrc} className="max-w-none absolute top-1/2 left-1/2 origin-center pointer-events-none select-none"
                        style={{
                            transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                            width: '100%',
                            height: 'auto'
                        }}
                        draggable={false} />
                    <div className="absolute inset-0 pointer-events-none border border-white/30 rounded-full"></div>
                </div>
                <div className="flex items-center space-x-4 mb-6 px-2">
                    <ZoomOut size={20} className="text-gray-400" />
                    <input type="range" min="1" max="3" step="0.1" value={zoom}
                        onChange={(e) => setZoom(parseFloat(e.target.value))}
                        className="w-full accent-[#ff9a9e] h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                    <ZoomIn size={20} className="text-gray-400" />
                </div>
                <div className="flex justify-between space-x-3">
                    <button onClick={onCancel} className="flex-1 py-2 rounded-xl border-2 border-gray-300 text-gray-500 font-bold hover:bg-gray-50 transition-colors flex items-center justify-center">
                        <XIcon size={18} className="mr-1" /> 取消
                    </button>
                    <button onClick={handleCrop} className="flex-1 py-2 rounded-xl bg-[#ff9a9e] text-white font-bold shadow-md hover:bg-[#ff8a8e] transition-colors flex items-center justify-center">
                        <Check size={18} className="mr-1" /> 完成
                    </button>
                </div>
            </div>
        </div>
    );
};
