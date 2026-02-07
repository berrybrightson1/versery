"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles, XCircle } from "lucide-react";

interface TheRevelationProps {
    visible: boolean;
    isCorrect: boolean;
    graceEarned: number;
    message: string;
    onClose: () => void;
}

export const TheRevelation = ({ visible, isCorrect, graceEarned, message, onClose }: TheRevelationProps) => {
    return (
        <AnimatePresence>
            {visible && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md bg-white rounded-[40px] p-10 text-center shadow-2xl border border-gray-100 overflow-hidden"
                    >
                        {/* Background Glow */}
                        <div className={cn(
                            "absolute -top-24 -left-24 w-64 h-64 blur-3xl rounded-full opacity-20",
                            isCorrect ? "bg-emerald-500" : "bg-nova-red"
                        )} />

                        <div className="relative z-10">
                            <div className={cn(
                                "w-20 h-20 rounded-[30px] mx-auto mb-8 flex items-center justify-center rotate-3 shadow-lg",
                                isCorrect ? "bg-emerald-500 text-white" : "bg-nova-red text-white"
                            )}>
                                {isCorrect ? <CheckCircle2 className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
                            </div>

                            <h2 className="text-3xl font-bold text-nova-text mb-4 tracking-tight">
                                {isCorrect ? "Holy Discernment" : "Seek Wisdom"}
                            </h2>

                            <p className="text-nova-subtext mb-10 leading-relaxed italic">
                                "{message}"
                            </p>

                            {isCorrect && (
                                <div className="bg-emerald-50 rounded-2xl p-6 mb-10 border border-emerald-100 flex items-center justify-center gap-4">
                                    <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-md">
                                        <Sparkles className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Divine Reward</p>
                                        <p className="text-xl font-bold text-emerald-900">+{graceEarned} Grace</p>
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={onClose}
                                className={cn(
                                    "w-full py-5 rounded-[24px] font-bold text-lg tracking-tight transition-all active:scale-95 flex items-center justify-center gap-3",
                                    isCorrect
                                        ? "bg-emerald-500 text-white shadow-xl shadow-emerald-500/20 hover:bg-emerald-600"
                                        : "bg-nova-text text-white shadow-xl shadow-black/10 hover:bg-black"
                                )}
                            >
                                {isCorrect ? "Walk in Light" : "Try Again"}
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
