"use client";

import { SacredBriefing } from "@/components/SacredBriefing";
import { TheRevelation } from "@/components/TheRevelation";
import { TheScroll } from "@/components/TheScroll";
import { useVerseryStore } from "@/lib/store";
import { motion } from "framer-motion";
import { ArrowLeft, Lightbulb } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import parablesData from "../data/parables.json";

export default function ParablesPage() {
    const router = useRouter();
    const { addGrace, completeMode } = useVerseryStore();

    const [mounted, setMounted] = useState(false);
    const [pilgrimageParables, setPilgrimageParables] = useState<typeof parablesData>([]);
    const [step, setStep] = useState(1);
    const [options, setOptions] = useState<(string | number)[]>([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [selectedRevelation, setSelectedRevelation] = useState<string | null>(null);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Select 3 random parables for the pilgrimage
        const shuffled = [...parablesData].sort(() => 0.5 - Math.random());
        setPilgrimageParables(shuffled.slice(0, 3));
    }, []);

    const currentParable = pilgrimageParables[step - 1];

    useEffect(() => {
        if (currentParable) {
            const allRevelations = parablesData.map(p => p.revelation);
            const correct = currentParable.revelation;
            const distractors = allRevelations
                .filter(r => r !== correct)
                .sort(() => 0.5 - Math.random())
                .slice(0, 3);

            setOptions([correct, ...distractors].sort());
            setSelectedRevelation(null);
        }
    }, [step, currentParable]);

    const handleSelect = (val: string | number) => {
        const revelation = val as string;
        setSelectedRevelation(revelation);
        const isRight = revelation === currentParable.revelation;

        if (isRight) {
            addGrace(20);
            if (step < 3) {
                setTimeout(() => {
                    setStep(prev => prev + 1);
                }, 2000);
            } else {
                addGrace(40);
                completeMode('parables');
                setIsCorrect(true);
                setModalVisible(true);
            }
        } else {
            setIsCorrect(false);
            setModalVisible(true);
        }
    };

    if (!mounted || !currentParable) return null;

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
                    title="Parable of the Sower"
                    subtitle="Meaning Matching"
                    description="The Master spoke in stories to reveal the secrets of the heart. Discern the spiritual revelation hidden within each sacred parable."
                    icon={Lightbulb}
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
                        <Lightbulb className="w-3.5 h-3.5 text-indigo-600" />
                        <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em]">Parable Mastery</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {[1, 2, 3].map((s) => (
                            <div
                                key={s}
                                className={`h-1 rounded-full transition-all duration-500 ${s < step ? "w-8 bg-indigo-600" :
                                    s === step ? "w-12 bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.5)]" :
                                        "w-4 bg-gray-200"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12" />
            </header>

            <motion.section
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[24px] md:rounded-[48px] p-6 md:p-12 shadow-2xl shadow-black/5 border border-gray-100 mb-6 md:mb-8 text-center relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-50/20 pointer-events-none" />
                <h2 className="text-xl md:text-2xl font-bold text-nova-text mb-4">Parable of {currentParable.parable}</h2>
                <p className="text-base md:text-xl font-serif leading-relaxed text-nova-text italic px-2">
                    "{currentParable.description}"
                </p>
            </motion.section>

            <div className="flex-1">
                <p className="text-center text-[10px] font-bold text-nova-subtext uppercase tracking-[0.3em] mb-6 md:mb-10">
                    Discern the spiritual revelation (Step {step} of 3)
                </p>

                <TheScroll
                    label="Spiritual Revelation"
                    value={selectedRevelation}
                    correctValue={currentParable.revelation}
                    options={options}
                    onSelect={handleSelect}
                    disabled={!!selectedRevelation}
                />
            </div>

            <TheRevelation
                visible={modalVisible}
                isCorrect={isCorrect}
                graceEarned={isCorrect ? 100 : 0}
                message={isCorrect ? "Your heart is good soil. All parables discerned." : `The seed fell elsewhere. The revelation was: ${currentParable.revelation}`}
                onClose={() => {
                    setModalVisible(false);
                    router.push('/');
                }}
            />
        </div>
    );
}
