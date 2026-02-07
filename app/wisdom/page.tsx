"use client";

import { SacredBriefing } from "@/components/SacredBriefing";
import { TheRevelation } from "@/components/TheRevelation";
import { TheScroll } from "@/components/TheScroll";
import { useVerseryStore } from "@/lib/store";
import { motion } from "framer-motion";
import { ArrowLeft, Quote, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import proverbsData from "../data/proverbs.json";

export default function WisdomPage() {
    const router = useRouter();
    const { addGrace, completeMode } = useVerseryStore();

    const [mounted, setMounted] = useState(false);
    const [roundProverbs, setRoundProverbs] = useState<typeof proverbsData>([]);
    const [round, setRound] = useState(1);
    const [options, setOptions] = useState<(string | number)[]>([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [selectedCompletion, setSelectedCompletion] = useState<string | null>(null);
    const [whisper, setWhisper] = useState<string | null>(null);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Pick 5 random unique proverbs for the session
        const shuffled = [...proverbsData].sort(() => 0.5 - Math.random());
        setRoundProverbs(shuffled.slice(0, 5));
    }, []);

    const currentProverb = roundProverbs[round - 1];

    useEffect(() => {
        if (currentProverb) {
            const allCompletions = proverbsData.map(p => p.second_half);
            const correct = currentProverb.second_half;
            const distractors = allCompletions
                .filter(c => c !== correct)
                .sort(() => 0.5 - Math.random())
                .slice(0, 3);

            setOptions([correct, ...distractors].sort());
            setSelectedCompletion(null);
            setWhisper(null);
        }
    }, [round, currentProverb]);

    const handleSelect = (val: string | number) => {
        const completion = val as string;
        setSelectedCompletion(completion);
        const isRight = completion === currentProverb.second_half;

        if (isRight) {
            if (round < 5) {
                addGrace(10);
                setWhisper(`Ancient wisdom recognized. Round ${round + 1} begins in 3s...`);
                setTimeout(() => {
                    setRound(prev => prev + 1);
                }, 3000);
            } else {
                addGrace(100);
                completeMode('wisdom');
                setIsCorrect(true);
                setModalVisible(true);
            }
        } else {
            setIsCorrect(false);
            setModalVisible(true);
        }
    };

    if (!mounted || !currentProverb) return null;

    if (!hasStarted) {
        return (
            <div className="min-h-screen py-4 md:py-8 px-4 flex flex-col pt-24 md:pt-8 bg-nova-offwhite">
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
                    title="Wisdom's Echo"
                    subtitle="Proverb Completion"
                    description="The ancient sages left their words half-spoken. Listen to the echo and complete the sacred logic. One error silenced the wisdom."
                    icon={Sparkles}
                    reward={150}
                    onStart={() => setHasStarted(true)}
                    themeColor="amber"
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
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span className="text-[10px] font-bold text-amber-600 uppercase tracking-[0.2em]">Wisdom's Echo</span>
                    </div>
                    <h1 className="text-lg md:text-xl font-bold text-nova-text">Sudden Death: {round}/5</h1>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-[9px] font-bold text-amber-600 uppercase tracking-wider mb-0.5">Potential Grace</span>
                    <span className="text-base md:text-lg font-black text-nova-text">+150</span>
                </div>
            </header>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-gray-100 rounded-full mb-8 md:mb-12 overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(round / 5) * 100}%` }}
                    className="h-full bg-amber-500"
                />
            </div>

            <motion.section
                key={round}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[24px] md:rounded-[48px] p-6 md:p-12 shadow-2xl shadow-black/5 border border-gray-100 mb-6 md:mb-8 text-center relative overflow-hidden flex flex-col items-center"
            >
                <Quote className="w-8 h-8 md:w-10 md:h-10 text-gray-100 mb-4 md:mb-6" />
                <div className="mb-4">
                    <p className="text-lg md:text-2xl font-serif leading-relaxed text-nova-text italic px-2">
                        "{currentProverb.first_half}..."
                    </p>
                </div>
                <div className="mt-4 pt-6 md:pt-8 border-t border-gray-50 flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <p className="text-[10px] font-bold text-nova-subtext uppercase tracking-widest">{currentProverb.reference}</p>
                </div>
            </motion.section>

            <div className="flex-1">
                {whisper ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-nova-text text-white py-4 px-6 rounded-2xl text-center text-sm font-bold mb-8 mx-auto max-w-sm flex items-center justify-center gap-3 shadow-xl"
                    >
                        <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                        {whisper}
                    </motion.div>
                ) : (
                    <p className="text-center text-[10px] font-bold text-nova-subtext uppercase tracking-[0.3em] mb-6 md:mb-10">
                        Complete the sacred logic (Round {round})
                    </p>
                )}

                <TheScroll
                    label="Provberb Completion"
                    value={selectedCompletion}
                    correctValue={currentProverb.second_half}
                    options={options}
                    onSelect={handleSelect}
                    disabled={!!selectedCompletion}
                />
            </div>

            <TheRevelation
                visible={modalVisible}
                isCorrect={isCorrect}
                graceEarned={isCorrect ? 150 : 0}
                message={isCorrect ? `The sages are pleased. You have mended 5 ancient echoes.` : `Silent echo. The wisdom was "${currentProverb.first_half} ${currentProverb.second_half}".`}
                onClose={() => {
                    setModalVisible(false);
                    router.push('/');
                }}
            />
        </div>
    );
}
