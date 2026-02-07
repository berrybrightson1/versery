"use client";

import { SacredBriefing } from "@/components/SacredBriefing";
import { TheRevelation } from "@/components/TheRevelation";
import { TheScroll } from "@/components/TheScroll";
import { useVerseryStore } from "@/lib/store";
import { motion } from "framer-motion";
import { ArrowLeft, Quote, ScrollText } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import versesData from "../data/verses.json";

export default function CodexPage() {
    const router = useRouter();
    // Optimize store subscription
    const addGrace = useVerseryStore(state => state.addGrace);
    const completeMode = useVerseryStore(state => state.completeMode);

    const [mounted, setMounted] = useState(false);
    const [roundVerses, setRoundVerses] = useState<typeof versesData>([]);
    const [round, setRound] = useState(1);
    const [options, setOptions] = useState<(string | number)[]>([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [selectedSpeaker, setSelectedSpeaker] = useState<string | null>(null);
    const [whisper, setWhisper] = useState<string | null>(null);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Pick 5 random unique verses for the session
        const shuffled = [...versesData].sort(() => 0.5 - Math.random());
        setRoundVerses(shuffled.slice(0, 5));
    }, []);

    const currentVerse = roundVerses[round - 1];

    useEffect(() => {
        if (currentVerse) {
            const speakers = Array.from(new Set(versesData.map(v => v.speaker)));
            const correct = currentVerse.speaker;
            const distractors = speakers.filter(s => s !== correct).sort(() => 0.5 - Math.random()).slice(0, 3);
            setOptions([correct, ...distractors].sort());
            setSelectedSpeaker(null);
            setWhisper(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [round, currentVerse]); // Keep dependencies minimal

    const handleSelect = (val: string | number) => {
        const speaker = val as string;
        setSelectedSpeaker(speaker);
        const isRight = speaker === currentVerse.speaker;

        if (isRight) {
            if (round < 5) {
                addGrace(10);
                setWhisper(`Divine discernment. Round ${round + 1} begins in 4s...`);
                setTimeout(() => {
                    setRound(prev => prev + 1);
                }, 4000);
            } else {
                addGrace(100);
                completeMode('codex');
                setIsCorrect(true);
                setModalVisible(true);
            }
        } else {
            setIsCorrect(false);
            setModalVisible(true);
        }
    };

    if (!mounted || !currentVerse) return null;

    if (!hasStarted) {
        return (
            <div className="min-h-screen py-4 md:py-8 px-4 flex flex-col pt-24 md:pt-8">
                <header className="flex items-center mb-6 md:mb-12">
                    <button
                        aria-label="Go Back"
                        onClick={() => router.back()}
                        className="p-2 md:p-3 bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-nova-subtext" />
                    </button>
                    <div className="flex-1" />
                </header>
                <SacredBriefing
                    title="Character Codex"
                    subtitle="Sudden Death Mode"
                    description="Five voices, one single chance. Correctly identify the speaker of each sacred verse to complete the higher pilgrimage. One mistake ends the journey."
                    icon={ScrollText}
                    reward={140}
                    onStart={() => setHasStarted(true)}
                    themeColor="red"
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen py-4 md:py-8 px-4 flex flex-col max-w-4xl mx-auto pt-24 md:pt-8">
            <header className="flex items-center justify-between mb-6 md:mb-12">
                <button
                    aria-label="Go Back"
                    onClick={() => router.back()}
                    className="p-2 md:p-3 bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-nova-subtext" />
                </button>
                <div className="text-center">
                    <div className="flex items-center justify-center gap-1.5 mb-0.5">
                        <ScrollText className="w-3.5 h-3.5 text-nova-red" />
                        <span className="text-[10px] font-bold text-nova-red uppercase tracking-[0.2em]">Character Codex</span>
                    </div>
                    <h1 className="text-lg md:text-xl font-bold text-nova-text">Sudden Death: {round}/5</h1>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-[9px] font-bold text-nova-red uppercase tracking-wider mb-0.5">Potential Grace</span>
                    <span className="text-base md:text-lg font-black text-nova-text">+140</span>
                </div>
            </header>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-gray-100 rounded-full mb-8 md:mb-12 overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(round / 5) * 100}%` }}
                    className="h-full bg-nova-red"
                />
            </div>

            <motion.section
                key={round}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[24px] md:rounded-[48px] p-6 md:p-12 shadow-2xl shadow-black/5 border border-gray-100 mb-6 md:mb-8 text-center relative overflow-hidden flex flex-col items-center"
            >
                <Quote className="w-8 h-8 md:w-10 md:h-10 text-gray-100 mb-4 md:mb-6" />
                <p className="text-lg md:text-2xl font-serif leading-relaxed text-nova-text italic px-2">
                    "{currentVerse.text}"
                </p>
                <div className="mt-8 pt-6 border-t border-gray-50 flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-nova-red" />
                    <p className="text-xs font-bold text-nova-subtext uppercase tracking-widest">{currentVerse.book} {currentVerse.chapter}:{currentVerse.verse}</p>
                </div>
            </motion.section>

            <div className="flex-1">
                {whisper ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-nova-text text-white py-4 px-6 rounded-2xl text-center text-sm font-bold mb-8 mx-auto max-w-sm flex items-center justify-center gap-3 shadow-xl"
                    >
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        {whisper}
                    </motion.div>
                ) : (
                    <p className="text-center text-[10px] font-bold text-nova-subtext uppercase tracking-[0.3em] mb-8">
                        Discern the speaker (Round {round})
                    </p>
                )}

                <TheScroll
                    label="Speaker"
                    value={selectedSpeaker}
                    correctValue={currentVerse.speaker}
                    options={options}
                    onSelect={handleSelect}
                    disabled={!!selectedSpeaker}
                />
            </div>

            <TheRevelation
                visible={modalVisible}
                isCorrect={isCorrect}
                graceEarned={isCorrect ? 140 : 0}
                message={isCorrect ? `The pilgrimage is complete! All 5 voices correctly identified.` : `Incorrect. The spirit spoke through ${currentVerse.speaker}. The pilgrimage ends here.`}
                onClose={() => {
                    setModalVisible(false);
                    router.push('/');
                }}
            />
        </div>
    );
}
