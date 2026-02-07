"use client";

import { useVerseryStore } from "@/lib/store";
import { CheckCircle2, Cross } from "lucide-react";

export const ShareCard = () => {
    const { pilgrimName, dailyStreak, getPilgrimTitle, hasSealedDay } = useVerseryStore();
    const title = getPilgrimTitle();

    return (
        <div
            id="sacred-seal-card"
            className="w-[300px] aspect-[9/16] bg-white p-8 flex flex-col items-center justify-between text-nova-text relative overflow-hidden shrink-0"
            style={{ borderRadius: '24px' }}
        >
            {/* Subtle Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                <Cross className="w-64 h-64" />
            </div>

            {/* Header */}
            <div className="text-center relative z-10 w-full">
                <div className="w-12 h-12 bg-nova-text rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-xl">
                    <Cross className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-black tracking-tight">Versery</h1>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Sacred Sanctuary</p>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col items-center justify-center gap-6 relative z-10 w-full">
                <div className="text-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-nova-subtext mb-2">Pilgrim Identity</p>
                    <h2 className="text-3xl font-black leading-tight">{title}</h2>
                    <p className="text-sm font-medium opacity-60">{pilgrimName}</p>
                </div>

                <div className="w-full h-px bg-gray-100" />

                <div className="flex gap-8 justify-center w-full">
                    <div className="text-center">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-nova-subtext mb-1">Streak</p>
                        <p className="text-2xl font-black">{dailyStreak} Days</p>
                    </div>
                    {hasSealedDay && (
                        <div className="text-center">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-nova-subtext mb-1">Status</p>
                            <div className="flex items-center gap-1 justify-center text-nova-red">
                                <CheckCircle2 className="w-5 h-5" />
                                <span className="text-lg font-black uppercase tracking-tighter">Sealed</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="text-center relative z-10 w-full">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-nova-subtext mb-3">Join the Pilgrimage</p>
                <div className="px-4 py-2 bg-nova-offwhite rounded-full border border-gray-100 mx-auto w-fit">
                    <p className="text-[10px] font-bold text-nova-text">versery.app</p>
                </div>
            </div>
        </div>
    );
};
