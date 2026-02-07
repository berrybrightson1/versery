"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bell } from "lucide-react";

interface TheWhisperProps {
    message: string | null;
    visible: boolean;
}

export const TheWhisper = ({ message, visible }: TheWhisperProps) => {
    return (
        <AnimatePresence>
            {visible && message && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[110] w-[90%] max-w-sm"
                >
                    <div className="bg-nova-text/95 backdrop-blur-md text-white p-5 rounded-3xl shadow-2xl flex items-center gap-4 border border-white/10">
                        <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                            <Bell className="w-5 h-5 text-white/80" />
                        </div>
                        <p className="text-sm font-medium leading-relaxed font-sans">{message}</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
