"use client";

import { useVerseryStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
    BookOpen,
    Church,
    Cloud,
    Coffee,
    Cross,
    LayoutDashboard,
    Lightbulb,
    MapPin,
    Menu,
    ScrollText,
    Sparkles,
    Trophy,
    User,
    Volume2,
    VolumeX,
    Waves,
    X
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const Sidebar = () => {
    const pathname = usePathname();
    const { isAudioEnabled, toggleAudio, onboardingCompleted, userProfile } = useVerseryStore();
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [showVolume, setShowVolume] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const volumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleVolumeEnter = () => {
        if (volumeTimeoutRef.current) clearTimeout(volumeTimeoutRef.current);
        setShowVolume(true);
    };

    const handleVolumeLeave = () => {
        volumeTimeoutRef.current = setTimeout(() => {
            setShowVolume(false);
        }, 1200); // 1.2s delay for a relaxed transition
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    // Hide sidebar entirely during onboarding
    if (mounted && !onboardingCompleted) {
        return null;
    }


    const navItems = [
        { label: "Dashboard", href: "/", icon: LayoutDashboard },
        { label: "The Locator", href: "/locator", icon: MapPin },
        { label: "Wisdom's Echo", href: "/wisdom", icon: Sparkles },
        { label: "Character Codex", href: "/codex", icon: ScrollText },
        { label: "Parable Mastery", href: "/parables", icon: Lightbulb },
        { label: "Living Word", href: "/living-word", icon: BookOpen },
    ];

    return (
        <>
            {/* Mobile Toggle */}
            <button
                aria-label="Open Navigation"
                onClick={() => setIsOpen(true)}
                className="md:hidden fixed top-6 left-6 z-40 p-3 bg-white rounded-2xl shadow-lg border border-gray-100"
            >
                <Menu className="w-6 h-6 text-nova-text" />
            </button>

            {/* Sidebar Drawer */}
            <AnimatePresence mode="wait">
                {mounted && (isOpen || (typeof window !== 'undefined' && window.innerWidth >= 768)) && (
                    <motion.aside
                        initial={{ x: -300 }}
                        animate={{ x: 0 }}
                        exit={{ x: -300 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className={cn(
                            "fixed top-0 left-0 h-screen w-[280px] bg-white/90 backdrop-blur-xl border-r border-gray-100 z-50 flex flex-col pt-12 pb-8 px-6 shadow-2xl shadow-black/5",
                            !isOpen && "hidden md:flex"
                        )}
                    >
                        {/* Close Button Mobile */}
                        <button
                            aria-label="Close Navigation"
                            onClick={() => setIsOpen(false)}
                            className="md:hidden absolute top-6 right-6 p-2 text-gray-400"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Brand */}
                        <div className="flex items-center gap-3 mb-10 px-2 transition-transform hover:scale-105 duration-300">
                            <div className="w-12 h-12 bg-nova-text rounded-2xl flex items-center justify-center shadow-xl shadow-black/5 rotate-3 hover:rotate-0 transition-all">
                                <Cross className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="font-bold text-2xl tracking-tight text-nova-text">Versery</h1>
                                <p className="text-xs text-nova-subtext font-medium uppercase tracking-widest -mt-1">Sanctuary</p>
                            </div>
                        </div>

                        {/* Nav */}
                        <nav className="flex-1 space-y-2">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4 pl-4">Sacred Path</p>
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group",
                                            isActive
                                                ? "bg-nova-offwhite text-nova-text shadow-sm"
                                                : "text-gray-500 hover:bg-nova-offwhite/50 hover:text-nova-text"
                                        )}
                                    >
                                        <Icon className={cn(
                                            "w-5 h-5 transition-colors",
                                            isActive ? "text-nova-red" : "text-gray-400 group-hover:text-nova-text"
                                        )} />
                                        <span className={cn(
                                            "font-medium tracking-tight",
                                            isActive ? "font-bold text-nova-text" : "text-gray-500"
                                        )}>
                                            {item.label}
                                        </span>
                                        {isActive && (
                                            <motion.div
                                                layoutId="active-pill"
                                                className="ml-auto w-1.5 h-1.5 rounded-full bg-nova-red"
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Footer */}
                        <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col gap-3">
                            <div className="px-2">
                                <motion.div
                                    layout
                                    className={cn(
                                        "rounded-3xl transition-all duration-500 overflow-hidden",
                                        isAudioEnabled ? "bg-nova-offwhite/50 border border-nova-text/5 p-3 shadow-sm" : "p-1"
                                    )}
                                >
                                    <div className="flex items-center justify-between px-2 py-1">
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={toggleAudio}
                                                aria-label={isAudioEnabled ? "Silence Liturgy" : "Invoke Liturgy"}
                                                className={cn(
                                                    "w-10 h-10 rounded-2xl flex items-center justify-center transition-all shadow-sm",
                                                    isAudioEnabled ? "bg-nova-text text-white" : "bg-white border border-gray-100 text-gray-400 hover:text-nova-text"
                                                )}
                                            >
                                                {isAudioEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                                            </button>
                                            <div>
                                                <p className={cn(
                                                    "text-sm font-black transition-colors leading-tight",
                                                    isAudioEnabled ? "text-nova-text" : "text-gray-400"
                                                )}>
                                                    Liturgy
                                                </p>
                                                <p className="text-[10px] text-nova-subtext uppercase tracking-[0.15em] font-medium">Atmosphere</p>
                                            </div>
                                        </div>
                                        <div className={cn(
                                            "w-2 h-2 rounded-full transition-all",
                                            isAudioEnabled ? "bg-nova-red animate-pulse" : "bg-gray-200"
                                        )} />
                                    </div>

                                    <AnimatePresence>
                                        {isAudioEnabled && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="mt-4 space-y-4"
                                            >
                                                {/* Vertical Mood Selector (Scrollable) */}
                                                <div className="space-y-1.5">
                                                    <p className="text-[9px] font-black text-nova-subtext uppercase tracking-[0.2em] px-2 mb-2">Select Mood</p>
                                                    <div className="flex flex-col gap-1 max-h-[220px] overflow-y-auto pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                                                        {useVerseryStore.getState().audioTracks.map((track) => {
                                                            const Icon =
                                                                track.id === 'sanctuary' ? Church :
                                                                    track.id === 'celestial' ? Sparkles :
                                                                        track.id === 'wisdom' ? ScrollText :
                                                                            track.id === 'spirit' ? Coffee :
                                                                                track.id === 'aura' ? Cloud : Waves;
                                                            const isSelected = useVerseryStore.getState().selectedTrackId === track.id;
                                                            return (
                                                                <button
                                                                    key={track.id}
                                                                    onClick={() => useVerseryStore.getState().setTrack(track.id)}
                                                                    className={cn(
                                                                        "w-full py-2.5 px-3 rounded-2xl text-[11px] font-black uppercase tracking-tight transition-all flex items-center gap-3 shrink-0",
                                                                        isSelected
                                                                            ? "bg-nova-text text-white shadow-lg scale-[1.02]"
                                                                            : "text-gray-400 hover:bg-white hover:text-nova-text border border-transparent hover:border-gray-100"
                                                                    )}
                                                                >
                                                                    <Icon className={cn("w-3.5 h-3.5", isSelected ? "text-nova-red" : "text-gray-300")} />
                                                                    {track.name}
                                                                    {isSelected && <div className="ml-auto w-1 h-1 rounded-full bg-nova-red" />}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>

                                                {/* Refined Volume Slider */}
                                                <div className="pt-2 px-1">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex-1 relative h-6 flex items-center group/slider">
                                                            <div className="absolute inset-x-0 h-1 bg-gray-200/50 rounded-full" />
                                                            <div
                                                                className="absolute left-0 h-1 bg-nova-red rounded-full shadow-[0_0_10px_rgba(255,59,48,0.4)]"
                                                                style={{ width: `${useVerseryStore.getState().audioVolume * 100}%` }}
                                                            />
                                                            <input
                                                                type="range"
                                                                min="0"
                                                                max="1"
                                                                step="0.01"
                                                                title="Volume Level"
                                                                value={useVerseryStore.getState().audioVolume}
                                                                onChange={(e) => useVerseryStore.getState().setAudioVolume(parseFloat(e.target.value))}
                                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                            />
                                                            <div
                                                                className="absolute h-3.5 w-3.5 bg-white border-2 border-nova-red rounded-full shadow-md pointer-events-none transition-transform group-hover/slider:scale-125"
                                                                style={{ left: `calc(${useVerseryStore.getState().audioVolume * 100}% - 7px)` }}
                                                            />
                                                        </div>
                                                        <span className="text-[10px] font-black text-nova-text w-7 text-right">
                                                            {Math.round(useVerseryStore.getState().audioVolume * 100)}%
                                                        </span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </div>

                            <Link
                                href="/ranking"
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group",
                                    pathname === "/ranking"
                                        ? "bg-nova-offwhite text-nova-text shadow-sm"
                                        : "text-gray-500 hover:bg-nova-offwhite/50 hover:text-nova-text"
                                )}
                            >
                                <Trophy className={cn(
                                    "w-5 h-5 transition-colors",
                                    pathname === "/ranking" ? "text-nova-red" : "text-gray-400 group-hover:text-nova-text"
                                )} />
                                <span className={cn(
                                    "font-medium tracking-tight",
                                    pathname === "/ranking" ? "font-bold text-nova-text" : "text-gray-500"
                                )}>
                                    Hall of Grace
                                </span>
                                {pathname === "/ranking" && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="ml-auto w-1.5 h-1.5 rounded-full bg-nova-red"
                                    />
                                )}
                            </Link>

                            <button
                                onClick={() => setShowLogoutConfirm(true)}
                                className="w-full flex items-center gap-3 px-4 py-3 bg-nova-offwhite/50 rounded-2xl border border-gray-100/50 hover:bg-red-50 hover:border-red-100/50 transition-all text-left group"
                            >
                                <div className="w-10 h-10 rounded-xl bg-nova-red/10 flex items-center justify-center group-hover:bg-red-200/20 transition-colors">
                                    <User className="w-5 h-5 text-nova-red" />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-sm font-bold text-nova-text truncate group-hover:text-red-600 transition-colors">{userProfile.name || "Pilgrim"}</p>
                                    <p className="text-[10px] text-nova-subtext uppercase tracking-wider group-hover:text-red-400 transition-colors">{userProfile.title || "Faithful Devotee"}</p>
                                </div>
                            </button>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Backdrop Mobile */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
                />
            )}
            {/* Logout Confirmation Modal */}
            <AnimatePresence>
                {showLogoutConfirm && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setShowLogoutConfirm(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="relative bg-[#0a0f1c] border border-white/10 rounded-3xl p-6 w-full max-w-sm shadow-2xl overflow-hidden"
                        >
                            {/* Ambient background glow */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-red-500/20 blur-[60px] rounded-full -mt-16 pointer-events-none" />

                            <div className="relative text-center space-y-4">
                                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-2 ring-1 ring-red-500/20">
                                    <div className="w-8 h-8 text-red-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-white">Leave Sanctuary?</h3>
                                    <p className="text-sm text-white/50 leading-relaxed">
                                        Your progress for this session will be saved, but you will need to enter your details again to return.
                                    </p>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        onClick={() => setShowLogoutConfirm(false)}
                                        className="flex-1 h-12 rounded-xl text-sm font-bold text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                                    >
                                        Stay
                                    </button>
                                    <button
                                        onClick={() => {
                                            useVerseryStore.getState().logout();
                                            setShowLogoutConfirm(false);
                                        }}
                                        className="flex-1 h-12 rounded-xl text-sm font-bold bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-all shadow-lg shadow-red-900/20"
                                    >
                                        Log Out
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};
