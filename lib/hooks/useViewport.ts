import { useState, useEffect } from 'react';

export interface Viewport {
    width: number;
    height: number;
}

function getViewport(): Viewport {
    return {
        width: window.innerWidth,
        height: window.innerHeight,
    };
}

export default () => {
    const [viewport, setViewport] = useState<Viewport>({ width: 0, height: 0 });

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const handleResize = () => {
            setViewport(getViewport);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return viewport;
};
