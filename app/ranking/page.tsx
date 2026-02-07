"use client";

import { ShareCard } from "@/components/ShareCard";
import { useVerseryStore } from "@/lib/store";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import { ArrowLeft, Download, Edit2, Medal, Trophy, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Pilgrim {
    name: string;
    grace: number;
    isUser?: boolean;
}

export default function RankingPage() {
    const router = useRouter();
    const { graceCount, pilgrimName, updatePilgrimName, getPilgrimTitle } = useVerseryStore();
    const [isEditing, setIsEditing] = useState(false);
    const [tempName, setTempName] = useState(pilgrimName);
    const [mounted, setMounted] = useState(false);
    const [isSharing, setIsSharing] = useState(false);

    const title = getPilgrimTitle();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Only the user on the leaderboard for now
    const allPilgrims = [
        { name: pilgrimName, grace: graceCount, isUser: true }
    ];

    const userRank = 1;

    const handleUpdateName = () => {
        if (tempName.trim()) {
            updatePilgrimName(tempName.trim());
            setIsEditing(false);
        }
    };

    const handleShare = async () => {
        setIsSharing(true);
        // Small delay to ensure the card is rendered in the hidden container
        setTimeout(async () => {
            const element = document.getElementById('sacred-seal-card');
            if (element) {
                try {
                    const canvas = await html2canvas(element, {
                        backgroundColor: null,
                        scale: 2, // Higher quality
                        logging: false,
                    });
                    const image = canvas.toDataURL("image/png");
                    const link = document.createElement('a');
                    link.href = image;
                    link.download = `versery-seal-${new Date().getTime()}.png`;
                    link.click();
                } catch (err) {
                    console.error("Capture failed", err);
                } finally {
                    setIsSharing(false);
                }
            } else {
                setIsSharing(false);
            }
        }, 100);
    };

    return (
        <div className="min-h-screen py-4 md:py-8 px-4 flex flex-col max-w-4xl mx-auto pt-20 md:pt-8">
            <header className="flex items-center justify-between mb-8 md:mb-12">
                <button
                    title="Go Back"
                    onClick={() => router.back()}
                    className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-nova-subtext" />
                </button>
                <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                        <Trophy className="w-4 h-4 text-amber-500" />
                        <span className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.2em]">Hall of Grace</span>
                    </div>
                    <h1 className="text-xl font-bold text-nova-text">Global Rankings</h1>
                </div>
                <button
                    title="Edit Pilgrim Name"
                    onClick={() => setIsEditing(true)}
                    className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors"
                >
                    <Edit2 className="w-5 h-5 text-nova-subtext" />
                </button>
            </header>

            {/* User Focus Card */}
            <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-nova-text rounded-[32px] md:rounded-[40px] p-6 md:p-8 mb-8 md:mb-12 relative overflow-hidden shadow-2xl shadow-black/20"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-20 h-20 bg-white/10 rounded-[28px] flex items-center justify-center mb-6 backdrop-blur-md border border-white/20">
                        <User className="w-10 h-10 text-white" />
                    </div>

                    {isEditing ? (
                        <div className="flex flex-col items-center gap-4 w-full max-w-xs">
                            <input
                                value={tempName}
                                onChange={(e) => setTempName(e.target.value)}
                                className="bg-white/10 border border-white/20 rounded-2xl px-6 py-3 text-white text-center font-bold focus:outline-none focus:ring-2 focus:ring-amber-500 w-full"
                                placeholder="Enter Pilgrim Name"
                                autoFocus
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={handleUpdateName}
                                    className="bg-amber-500 text-nova-text px-6 py-2 rounded-xl font-bold text-sm"
                                >
                                    Confirm
                                </button>
                                <button
                                    onClick={() => { setIsEditing(false); setTempName(pilgrimName); }}
                                    className="bg-white/10 text-white px-6 py-2 rounded-xl font-bold text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <p className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.3em] mb-2">{title}</p>
                            <h2 className="text-3xl font-black text-white mb-2">{pilgrimName}</h2>
                            <div className="flex items-center gap-6">
                                <div className="text-center">
                                    <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">Rank</p>
                                    <p className="text-xl font-black text-amber-500">#{userRank}</p>
                                </div>
                                <div className="w-px h-8 bg-white/10" />
                                <div className="text-center">
                                    <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">Total Grace</p>
                                    <p className="text-xl font-black text-white">{graceCount}</p>
                                </div>
                            </div>
                        </>
                    )}

                    <button
                        onClick={handleShare}
                        disabled={isSharing}
                        className="mt-8 flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl text-white font-bold transition-all active:scale-95 disabled:opacity-50"
                    >
                        <Download className="w-4 h-4" />
                        {isSharing ? "Sealing..." : "Share My Progress"}
                    </button>
                </div>
            </motion.section>

            {/* Simple Status */}
            <div className="flex items-center justify-between mb-8 px-4">
                <p className="text-[10px] font-bold text-nova-subtext uppercase tracking-[0.3em]">The Lone Pilgrim</p>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Active Standing</span>
                </div>
            </div>

            {/* Leaderboard List */}
            <div className="space-y-3 mb-12">
                {allPilgrims.map((pilgrim, idx) => (
                    <motion.div
                        key={pilgrim.name + idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3 md:gap-4 p-4 md:p-5 rounded-[20px] md:rounded-[24px] border bg-amber-50 border-amber-200 shadow-lg shadow-amber-500/5"
                    >
                        <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center font-black text-sm bg-amber-500 text-white shadow-lg shadow-amber-500/20 shrink-0">
                            <Medal className="w-4 h-4 md:w-5 md:h-5" />
                        </div>

                        <div className="flex-1">
                            <h3 className="font-bold tracking-tight text-nova-text">
                                {pilgrim.name}
                                <span className="ml-2 text-[10px] bg-amber-500 text-white px-2 py-0.5 rounded-full uppercase tracking-tighter">You</span>
                            </h3>
                            <p className="text-[10px] text-nova-subtext uppercase tracking-widest font-medium">{title}</p>
                        </div>

                        <div className="text-right">
                            <p className="text-lg font-black text-nova-text">{pilgrim.grace.toLocaleString()}</p>
                            <p className="text-[9px] font-bold text-nova-subtext uppercase tracking-tighter">Grace Points</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <p className="text-center text-[10px] text-nova-subtext font-medium italic opacity-50 px-8">
                The Hall of Grace is currently quiet. You are the first to walk this path in this generation.
            </p>

            {/* Hidden Share Card Container */}
            <div className="fixed -left-[9999px] top-0 pointer-events-none">
                <ShareCard />
            </div>
        </div>
    );
}

// Utility class merger helper (duplicated from lib/utils if needed, but keeping it simple here)
function cn(...classes: (string | boolean | undefined)[]) {
    return classes.filter(Boolean).join(" ");
}
