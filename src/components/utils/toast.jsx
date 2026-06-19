// Toast.jsx
import { useEffect } from "react";

export default function Toast({ message, show, onClose}) {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    if (!show) return null;

    return (
        <div className="fixed top-24 right-20 z-50 class">
            <div
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur-sm bg-green-500/10 border-green-500/40`}
            >
                <span
                    className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-500/20`}
                >
                        <svg className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                    
                </span>
                <p className={`text-sm font-medium text-green-400`}>
                    {message}
                </p>
            </div>
        </div>
    );
}
