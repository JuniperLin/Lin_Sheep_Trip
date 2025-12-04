const FallingPetals = () => {
    const [petals, setPetals] = React.useState([]);

    React.useEffect(() => {
        const createPetal = () => {
            const id = Math.random();
            const left = Math.random() * 100;
            const animationDuration = 5 + Math.random() * 10;
            const size = 10 + Math.random() * 15;
            return { id, left, animationDuration, size };
        };
        const initialPetals = Array.from({ length: 15 }).map(createPetal);
        setPetals(initialPetals);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {petals.map(petal => (
                <div
                    key={petal.id}
                    className="absolute"
                    style={{
                        left: `${petal.left}%`,
                        top: '-20px',
                        width: `${petal.size}px`,
                        height: `${petal.size}px`,
                        backgroundColor: '#ffd7e6',
                        borderRadius: '100% 0 100% 0',
                        opacity: 0.6,
                        animation: `fall ${petal.animationDuration}s linear infinite, sway 3s ease-in-out infinite alternate`,
                    }}
                />
            ))}
        </div>
    );
};
