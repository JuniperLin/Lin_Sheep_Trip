const WalkingSheep = () => {
    const [isWalking, setIsWalking] = React.useState(false);
    const [sheepImage, setSheepImage] = React.useState("https://i.imgur.com/8Fk4d5p.png");
    const [tempImage, setTempImage] = React.useState(null);
    const [isCropping, setIsCropping] = React.useState(false);
    const timeoutRef = React.useRef(null);
    const fileInputRef = React.useRef(null);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsWalking(true);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => setIsWalking(false), 150);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTempImage(reader.result);
                setIsCropping(true);
                e.target.value = '';
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <React.Fragment>
            {isCropping && <ImageCropper imageSrc={tempImage} onConfirm={(img) => { setSheepImage(img); setIsCropping(false); }} onCancel={() => setIsCropping(false)} />}
            <div className="fixed bottom-4 right-4 z-50 transition-transform duration-300">
                <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                <div onClick={() => fileInputRef.current.click()}
                    className={`relative w-32 h-32 md:w-40 md:h-40 transition-all duration-300 cursor-pointer group ${isWalking ? 'animate-bounce-walk' : ''}`}
                    title="點擊這裡更換小羊照片！">
                    <div className="w-full h-full rounded-full border-4 border-white shadow-xl overflow-hidden bg-white relative">
                        <img src={sheepImage} alt="林小羊" className="w-full h-full object-cover"
                            style={{ filter: 'contrast(1.1) sepia(0.2)' }}
                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1484557985045-edf25e08da73?auto=format&fit=crop&q=80&w=300' }} />
                        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Camera className="text-white w-8 h-8 mb-1" />
                            <span className="text-white text-xs font-bold">更換照片</span>
                        </div>
                        <div className={`absolute -top-12 -left-10 bg-white px-3 py-2 rounded-2xl shadow-md text-sm font-bold text-gray-600 transition-opacity duration-300 ${isWalking ? 'opacity-100' : 'opacity-0'}`}>
                            GOGOGO! 🌸
                            <div className="absolute bottom-[-6px] right-4 w-3 h-3 bg-white transform rotate-45"></div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
