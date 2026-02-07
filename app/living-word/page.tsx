"use client";

import { SacredBriefing } from "@/components/SacredBriefing";
import { TheRevelation } from "@/components/TheRevelation";
import { TheScroll } from "@/components/TheScroll";
import { TheWhisper } from "@/components/TheWhisper";
import { useVerseryStore } from "@/lib/store";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import versesData from "../data/verses.json";

export default function LivingWordPage() {
    const router = useRouter();
    // Optimize store subscription
    const addGrace = useVerseryStore(state => state.addGrace);
    const completeMode = useVerseryStore(state => state.completeMode);

    const [mounted, setMounted] = useState(false);
    const [pilgrimageVerses, setPilgrimageVerses] = useState<typeof versesData>([]);
    const [pilgrimageStep, setPilgrimageStep] = useState(1);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [options, setOptions] = useState<(string | number)[]>([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [selectedWord, setSelectedWord] = useState<string | null>(null);
    const [whisper, setWhisper] = useState<string | null>(null);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Select 3 random verses for the pilgrimage
        const shuffled = [...versesData].sort(() => 0.5 - Math.random());
        setPilgrimageVerses(shuffled.slice(0, 3));
    }, []);

    const currentVerse = pilgrimageVerses[pilgrimageStep - 1];

    useEffect(() => {
        if (mounted && currentVerse && currentVerse.missing_words[selectedIndex]) {
            const correct = currentVerse.missing_words[selectedIndex];
            const distractors = ['faith', 'love', 'hope', 'grace', 'spirit', 'lord', 'god', 'heaven', 'earth', 'peace']
                .filter(w => w.toLowerCase() !== correct.toLowerCase())
                .sort(() => 0.5 - Math.random())
                .slice(0, 3);
            setOptions([correct, ...distractors].sort());
            setSelectedWord(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mounted, currentVerse, selectedIndex]);

    const handleSelect = (val: string | number) => {
        const word = val as string;
        setSelectedWord(word);
        const correct = currentVerse.missing_words[selectedIndex];
        const isRight = word.toLowerCase() === correct.toLowerCase();

        if (isRight) {
            addGrace(5);
            if (selectedIndex < currentVerse.missing_words.length - 1) {
                setWhisper("The Word is restored. Reflecting...");
                setTimeout(() => {
                    setSelectedIndex(prev => prev + 1);
                    setWhisper(null);
                }, 4000);
            } else {
                // Verse complete
                addGrace(10);
                if (pilgrimageStep < 3) {
                    setWhisper(`Verse fully mended. Pilgrimage continues in 4s...`);
                    setTimeout(() => {
                        setPilgrimageStep(prev => prev + 1);
                        setSelectedIndex(0);
                        setWhisper(null);
                    }, 4000);
                } else {
                    // Pilgrimage complete
                    addGrace(50);
                    completeMode('livingWord');
                    setIsCorrect(true);
                    setModalVisible(true);
                }
            }
        } else {
            setIsCorrect(false);
            setModalVisible(true);
        }
    };

    const renderMaskedText = () => {
        if (!currentVerse) return "";
        let masked = currentVerse.text;
        currentVerse.missing_words.forEach((word: string, index: number) => {
            if (index >= selectedIndex) {
                // Use a case-insensitive regex to find the word accurately
                const regex = new RegExp(`\\b${word}\\b`, 'gi');
                masked = masked.replace(regex, '_____');
            }
        });
        return masked;
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
                    title="Living Word"
                    subtitle="3-Verse Pilgrimage"
                    description="The Bread of Life must be mended. Restore the missing pieces of three sacred verses to complete your journey. A single omission ends the pilgrimage."
                    icon={BookOpen}
                    reward={100}
                    onStart={() => setHasStarted(true)}
                    themeColor="indigo"
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
                        <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                        <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em]">Living Word</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {[1, 2, 3].map((s) => (
                            <div
                                key={s}
                                className={`h-1 rounded-full transition-all duration-500 ${s < pilgrimageStep ? "w-8 bg-indigo-600" :
                                    s === pilgrimageStep ? "w-12 bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.5)]" :
                                        "w-4 bg-gray-200"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
                <div className="w-12 h-12" />
            </header>

            <motion.section
                key={pilgrimageStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[24px] md:rounded-[48px] p-6 md:p-16 shadow-2xl shadow-black/5 border border-gray-100 mb-6 md:mb-8 text-center relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-50/20 pointer-events-none" />
                <p className="text-lg md:text-3xl font-serif leading-[1.6] text-nova-text italic px-2">
                    "{renderMaskedText()}"
                </p>
                <div className="mt-8 flex items-center justify-center gap-4 relative z-10">
                    <div className="px-6 py-2 bg-indigo-50 rounded-full flex items-center gap-3 border border-indigo-100/50">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                        <span className="text-[11px] font-black text-indigo-900 uppercase tracking-widest">{currentVerse.book} {currentVerse.chapter}:{currentVerse.verse}</span>
                    </div>
                </div>
            </motion.section>

            <div className="flex-1">
                <div className="flex items-center justify-between mb-8 px-4">
                    <p className="text-[10px] font-bold text-nova-subtext uppercase tracking-[0.3em]">
                        Restoring Word {selectedIndex + 1} of {currentVerse.missing_words.length}
                    </p>
                    <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.3em]">
                        Verse {pilgrimageStep} of 3
                    </p>
                </div>
                <TheScroll
                    label="Sacred Word"
                    value={selectedWord}
                    correctValue={currentVerse.missing_words[selectedIndex]}
                    options={options}
                    onSelect={handleSelect}
                    disabled={!!selectedWord}
                />
            </div>

            <TheWhisper visible={!!whisper} message={whisper} />
            <TheRevelation
                visible={modalVisible}
                isCorrect={isCorrect}
                graceEarned={isCorrect ? 100 : 0}
                message={isCorrect ? "The Bread of Life has been fully mended through your pilgrimage." : "The Word remains incomplete. Seek deeper reflection."}
                onClose={() => {
                    setModalVisible(false);
                    if (isCorrect) router.push('/');
                    else router.back();
                }}
            />
        </div>
    );
}
