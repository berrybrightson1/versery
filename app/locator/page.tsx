"use client";

import { SacredBriefing } from "@/components/SacredBriefing";
import { TheRevelation } from "@/components/TheRevelation";
import { TheScroll } from "@/components/TheScroll";
import { TheWhisper } from "@/components/TheWhisper";
import { useVerseryStore } from "@/lib/store";
import { motion } from "framer-motion";
import { ArrowLeft, MapIcon, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import versesData from "../data/verses.json";

const generateOptions = (correct: string | number, type: 'book' | 'chapter' | 'verse') => {
    if (type === 'book') {
        const books = ['Genesis', 'Exodus', 'Psalms', 'Proverbs', 'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', 'Jeremiah', 'Isaiah'];
        const distractors = books.filter(b => b !== correct).sort(() => 0.5 - Math.random()).slice(0, 3);
        return [correct as string, ...distractors].sort();
    }
    const correctNum = Number(correct);
    const distractors = [correctNum + 1, correctNum + 2, Math.max(1, correctNum - 1), Math.max(1, correctNum - 3)]
        .filter(n => n !== correctNum);
    const unique = new Set([correctNum, ...distractors.sort(() => 0.5 - Math.random()).slice(0, 3)]);
    return Array.from(unique).sort((a, b) => (a as number) - (b as number));
};

export default function LocatorPage() {
    const router = useRouter();
    // Optimize store subscription to avoid re-renders on audio/track changes
    const addGrace = useVerseryStore(state => state.addGrace);
    const completeMode = useVerseryStore(state => state.completeMode);

    const [mounted, setMounted] = useState(false);
    const [currentVerse, setCurrentVerse] = useState(versesData[0]);
    const [step, setStep] = useState(1); // 1: Book, 2: Chapter, 3: Verse

    const [selectedBook, setSelectedBook] = useState<string | null>(null);
    const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
    const [selectedVerse, setSelectedVerse] = useState<number | null>(null);

    const [modalVisible, setModalVisible] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [whisper, setWhisper] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);
        setCurrentVerse(versesData[Math.floor(Math.random() * versesData.length)]);
    }, []);

    const handleSelect = (val: string | number) => {
        if (step === 1) {
            const isRight = val === currentVerse.book;
            setSelectedBook(val as string);
            if (isRight) {
                setWhisper("Faith moves correctly. Reflecting for a moment...");
            } else {
                setWhisper(`The correct book was ${currentVerse.book}. Sacred path continues in 4s...`);
            }
            setTimeout(() => {
                setStep(2);
                setWhisper(null);
            }, 4000);
        } else if (step === 2) {
            const isRight = val === currentVerse.chapter;
            setSelectedChapter(val as number);
            if (isRight) {
                setWhisper("Divine precision. Prepare for the verse coordinates...");
            } else {
                setWhisper(`The correct chapter was ${currentVerse.chapter}. Sacred path continues in 4s...`);
            }
            setTimeout(() => {
                setStep(3);
                setWhisper(null);
            }, 4000);
        } else if (step === 3) {
            const isRight = val === currentVerse.verse;
            setSelectedVerse(val as number);
            const finalCorrect = selectedBook === currentVerse.book &&
                selectedChapter === currentVerse.chapter &&
                val === currentVerse.verse;

            setIsCorrect(finalCorrect);
            if (finalCorrect) {
                addGrace(20);
                completeMode('locator');
            }
            setModalVisible(true);
        }
    };

    // Memoize options to prevent regeneration on unrelated re-renders (like audio changes)
    const options = useMemo(() => {
        return step === 1
            ? generateOptions(currentVerse.book, 'book')
            : step === 2
                ? generateOptions(currentVerse.chapter, 'chapter')
                : generateOptions(currentVerse.verse, 'verse');
    }, [step, currentVerse.book, currentVerse.chapter, currentVerse.verse]);

    const [hasStarted, setHasStarted] = useState(false);

    if (!mounted) return null;

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
                    title="The Locator"
                    subtitle="Divine Coordinates"
                    description="Navigate the sacred geography of scripture. Discern the Book, Chapter, and Verse in a three-step pilgrimage of precision."
                    icon={MapIcon}
                    reward={20}
                    onStart={() => setHasStarted(true)}
                    themeColor="blue"
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
                        <MapPin className="w-3.5 h-3.5 text-nova-red" />
                        <span className="text-[10px] font-bold text-nova-red uppercase tracking-[0.2em]">Sacred Geography</span>
                    </div>
                    <h1 className="text-lg md:text-xl font-bold text-nova-text">The Locator</h1>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12" />
            </header>

            <motion.section
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[24px] md:rounded-[48px] p-6 md:p-16 shadow-2xl shadow-black/5 border border-gray-100 mb-6 md:mb-12 text-center relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-1.5 md:h-2 bg-gradient-to-r from-rose-400 via-nova-red to-orange-400" />
                <p className="text-lg md:text-3xl font-serif leading-relaxed text-nova-text italic px-2">
                    "{currentVerse.text}"
                </p>
            </motion.section>

            <div className="flex-1">
                <p className="text-center text-[10px] font-bold text-nova-subtext uppercase tracking-[0.3em] mb-6 md:mb-10">
                    Step {step} of 3: {step === 1 ? 'Identify the Book' : step === 2 ? 'Identify the Chapter' : 'Identify the Verse'}
                </p>
                <TheScroll
                    label={step === 1 ? "Book" : step === 2 ? "Chapter" : "Verse"}
                    value={step === 1 ? selectedBook : step === 2 ? selectedChapter : selectedVerse}
                    correctValue={step === 1 ? currentVerse.book : step === 2 ? currentVerse.chapter : currentVerse.verse}
                    options={options}
                    onSelect={handleSelect}
                    disabled={!!whisper}
                />
            </div>

            <TheWhisper visible={!!whisper} message={whisper} />
            <TheRevelation
                visible={modalVisible}
                isCorrect={isCorrect}
                graceEarned={20}
                message={isCorrect ? "You have navigated the word with divine accuracy." : "The coordinates remain hidden. Seek and you shall find."}
                onClose={() => {
                    setModalVisible(false);
                    if (isCorrect) router.push('/');
                }}
            />
        </div>
    );
}
