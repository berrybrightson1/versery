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

                            <div className="flex items-center gap-3 px-4 py-3 bg-nova-offwhite/50 rounded-2xl border border-gray-100/50">
                                <div className="w-10 h-10 rounded-xl bg-nova-red/10 flex items-center justify-center">
                                    <User className="w-5 h-5 text-nova-red" />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-sm font-bold text-nova-text truncate">{userProfile.name || "Pilgrim"}</p>
                                    <p className="text-[10px] text-nova-subtext uppercase tracking-wider">{userProfile.title || "Faithful Devotee"}</p>
                                </div>
                            </div>
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
        </>
    );
};
