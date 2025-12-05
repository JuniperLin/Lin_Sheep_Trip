const WalkingSheep = () => {
    const [isWalking, setIsWalking] = React.useState(false);
    const [sheepImage, setSheepImage] = React.useState("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ctext x='50%25' y='50%25' font-size='60' text-anchor='middle' dominant-baseline='middle'%3E🐑%3C/text%3E%3C/svg%3E");
    const [tempImage, setTempImage] = React.useState(null);
    const [isCropping, setIsCropping] = React.useState(false);
    const [isUploading, setIsUploading] = React.useState(false);
    const timeoutRef = React.useRef(null);
    const fileInputRef = React.useRef(null);

    // Load saved avatar from Firebase on mount
    React.useEffect(() => {
        if (database) {
            database.ref('sheepAvatar').once('value', (snapshot) => {
                const savedAvatar = snapshot.val();
                if (savedAvatar) {
                    setSheepImage(savedAvatar);
                }
            });
        } else {
            // Fallback to localStorage
            const saved = localStorage.getItem('lin_sheep_avatar');
            if (saved) setSheepImage(saved);
        }
    }, []);

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

    const handleCropConfirm = async (croppedImageBase64) => {
        setIsCropping(false);
        setIsUploading(true);

        try {
            // Convert base64 to blob
            const response = await fetch(croppedImageBase64);
            const blob = await response.blob();

            // Create File object from blob
            const file = new File([blob], `avatar_${Date.now()}.png`, { type: 'image/png' });

            // Upload to Firebase Storage
            const url = await uploadImage(file);

            // Save URL to database and local state
            setSheepImage(url);
            if (database) {
                database.ref('sheepAvatar').set(url);
            }
            localStorage.setItem('lin_sheep_avatar', url);
        } catch (error) {
            console.error('Avatar upload failed, using base64:', error);
            // Fallback to base64
            setSheepImage(croppedImageBase64);
            if (database) {
                database.ref('sheepAvatar').set(croppedImageBase64);
            }
            localStorage.setItem('lin_sheep_avatar', croppedImageBase64);
        } finally {
            setIsUploading(false);
        }
    };
    const WalkingSheep = () => {
        const [isWalking, setIsWalking] = React.useState(false);
        const [sheepImage, setSheepImage] = React.useState("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ctext x='50%25' y='50%25' font-size='60' text-anchor='middle' dominant-baseline='middle'%3E🐑%3C/text%3E%3C/svg%3E");
        const [tempImage, setTempImage] = React.useState(null);
        const [isCropping, setIsCropping] = React.useState(false);
        const [isUploading, setIsUploading] = React.useState(false);
        const timeoutRef = React.useRef(null);
        const fileInputRef = React.useRef(null);

        // Load saved avatar from Firebase on mount
        React.useEffect(() => {
            if (database) {
                database.ref('sheepAvatar').once('value', (snapshot) => {
                    const savedAvatar = snapshot.val();
                    if (savedAvatar) {
                        setSheepImage(savedAvatar);
                    }
                });
            } else {
                // Fallback to localStorage
                const saved = localStorage.getItem('lin_sheep_avatar');
                if (saved) setSheepImage(saved);
            }
        }, []);

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

        const handleCropConfirm = async (croppedImageBase64) => {
            setIsCropping(false);
            setIsUploading(true);

            try {
                // Convert base64 to blob
                const response = await fetch(croppedImageBase64);
                const blob = await response.blob();

                // Create File object from blob
                const file = new File([blob], `avatar_${Date.now()}.png`, { type: 'image/png' });

                // Upload to Firebase Storage
                const url = await uploadImage(file);

                // Save URL to database and local state
                setSheepImage(url);
                if (database) {
                    database.ref('sheepAvatar').set(url);
                }
                localStorage.setItem('lin_sheep_avatar', url);
            } catch (error) {
                console.error('Avatar upload failed, using base64:', error);
                // Fallback to base64
                setSheepImage(croppedImageBase64);
                if (database) {
                    database.ref('sheepAvatar').set(croppedImageBase64);
                }
                localStorage.setItem('lin_sheep_avatar', croppedImageBase64);
            } finally {
                setIsUploading(false);
            }
        };

        return (
            <React.Fragment>
                {isCropping && <ImageCropper imageSrc={tempImage} onConfirm={handleCropConfirm} onCancel={() => setIsCropping(false)} />}
                <div className="fixed bottom-4 right-4 z-50 transition-transform duration-300">
                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                    <div onClick={() => !isUploading && fileInputRef.current.click()}
                        className={`relative w-32 h-32 md:w-40 md:h-40 transition-all duration-300 ${!isUploading && 'cursor-pointer'} group ${isWalking ? 'animate-bounce-walk' : ''}`}
                        title={isUploading ? "上傳中..." : "點擊這裡更換小羊照片！"}>
                        <div className="w-full h-full rounded-full border-4 border-white shadow-xl overflow-hidden bg-white relative">
                            <img src={sheepImage} alt="林小羊" className="w-full h-full object-cover"
                                style={{ filter: 'contrast(1.1) sepia(0.2)' }}
                                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1484557985045-edf25e08da73?auto=format&fit=crop&q=80&w=300' }} />

                            {/* Uploading overlay */}
                            {isUploading && (
                                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
                                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mb-2"></div>
                                    <span className="text-white text-xs font-bold">上傳中...</span>
                                </div>
                            )}

                            {/* Hover overlay */}
                            {!isUploading && (
                                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <Camera className="text-white w-8 h-8 mb-1" />
                                    <span className="text-white text-xs font-bold">更換照片</span>
                                </div>
                            )}

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
