"use client";

import { motion } from "framer-motion";
import { LucideIcon, Play } from "lucide-react";

interface SacredBriefingProps {
    title: string;
    subtitle: string;
    description: string;
    icon: LucideIcon;
    reward: string | number;
    onStart: () => void;
    themeColor?: "red" | "blue" | "emerald" | "amber" | "indigo";
}

export const SacredBriefing = ({
    title,
    subtitle,
    description,
    icon: Icon,
    reward,
    onStart,
    themeColor = "red"
}: SacredBriefingProps) => {
    const colorMap = {
        red: {
            bg: "bg-nova-red/10",
            glow: "bg-nova-red/20",
            text: "text-nova-red",
            btn: "from-nova-red to-orange-500",
            rewardBg: "bg-nova-red shadow-nova-red/20",
            rewardText: "text-white/70",
            rewardValue: "text-white"
        },
        blue: {
            bg: "bg-blue-500/10",
            glow: "bg-blue-400/20",
            text: "text-blue-600",
            btn: "from-blue-600 to-indigo-600",
            rewardBg: "bg-blue-600 shadow-blue-600/20",
            rewardText: "text-blue-50/70",
            rewardValue: "text-white"
        },
        emerald: {
            bg: "bg-emerald-500/10",
            glow: "bg-emerald-400/20",
            text: "text-emerald-600",
            btn: "from-emerald-600 to-teal-600",
            rewardBg: "bg-emerald-600 shadow-emerald-600/20",
            rewardText: "text-emerald-50/70",
            rewardValue: "text-white"
        },
        amber: {
            bg: "bg-amber-500/10",
            glow: "bg-amber-400/20",
            text: "text-amber-600",
            btn: "from-amber-600 to-orange-600",
            rewardBg: "bg-amber-500 shadow-amber-500/20",
            rewardText: "text-amber-50/70",
            rewardValue: "text-white"
        },
        indigo: {
            bg: "bg-indigo-500/10",
            glow: "bg-indigo-400/20",
            text: "text-indigo-600",
            btn: "from-indigo-600 to-purple-600",
            rewardBg: "bg-indigo-600 shadow-indigo-600/20",
            rewardText: "text-indigo-50/70",
            rewardValue: "text-white"
        }
    };

    const theme = colorMap[themeColor];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col items-center justify-center text-center max-w-2xl mx-auto px-4 md:px-6"
        >
            <div className={`w-16 h-16 md:w-20 md:h-20 ${theme.bg} rounded-[24px] md:rounded-[32px] flex items-center justify-center mb-6 md:mb-8 relative`}>
                <Icon className={`w-8 h-8 md:w-10 md:h-10 ${theme.text}`} />
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className={`absolute inset-0 ${theme.glow} rounded-[24px] md:rounded-[32px] -z-10 blur-xl`}
                />
            </div>

            <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] font-bold ${theme.text} uppercase tracking-[0.3em]`}>{subtitle}</span>
            </div>

            <h1 className="text-2xl md:text-4xl font-black text-nova-text mb-4 md:mb-6 tracking-tight">{title}</h1>

            <p className="text-base md:text-lg text-nova-subtext leading-relaxed mb-8 md:mb-12 font-serif italic">
                "{description}"
            </p>

            <div className={`rounded-[32px] md:rounded-[40px] p-6 md:p-8 shadow-2xl w-full mb-8 md:mb-12 overflow-hidden relative ${theme.rewardBg}`}>
                <div className="flex items-center justify-between relative z-10">
                    <div className="text-left">
                        <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${theme.rewardText}`}>Pilgrimage Reward</p>
                        <p className={`text-2xl md:text-3xl font-black ${theme.rewardValue}`}>+{reward} <span className="text-sm font-medium opacity-80">Grace</span></p>
                    </div>
                    <div className="w-px h-10 md:h-12 bg-white/20" />
                    <div className="text-right">
                        <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${theme.rewardText}`}>Difficulty</p>
                        <p className={`text-sm font-bold ${theme.rewardValue}`}>Divine Discernment</p>
                    </div>
                </div>

                {/* Subtle pattern background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-12 -mb-12 blur-xl" />
            </div>

            <button
                onClick={onStart}
                className="group relative bg-nova-text text-white px-10 py-5 md:px-12 md:py-6 rounded-[24px] md:rounded-[32px] font-bold text-base md:text-lg hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/20 overflow-hidden"
            >
                <div className={`absolute inset-0 bg-gradient-to-r ${theme.btn} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative flex items-center gap-3">
                    <Play className="w-5 h-5 fill-current" />
                    <span>Begin Pilgrimage</span>
                </div>
            </button>

            <p className="mt-8 text-[10px] font-bold text-nova-subtext uppercase tracking-[0.2em] opacity-50">
                Faith is the key to all coordinates
            </p>
        </motion.div>
    );
};
