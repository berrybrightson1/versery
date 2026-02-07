"use client";

import { DevoteeSelect } from "@/components/DevoteeSelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useVerseryStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Church, Crown, User } from "lucide-react";
import { useState } from "react";

interface OnboardingFlowProps {
    onComplete: () => void;
}

export const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
    const [step, setStep] = useState(0);
    const [name, setName] = useState("");
    const [church, setChurch] = useState("");
    const [title, setTitle] = useState("Seeker");

    const { updateUserProfile, completeOnboarding } = useVerseryStore();

    const handleNext = () => {
        setStep(prev => prev + 1);
    };

    const handleBack = () => {
        setStep(prev => prev - 1);
    };

    const handleFinish = (isGuest = false) => {
        updateUserProfile({
            name: isGuest ? "Faithful Pilgrim" : name,
            church: isGuest ? "" : church,
            title: title
        });
        completeOnboarding();
        // Allow animation to complete before parent re-renders if needed, 
        // but onComplete/completeOnboarding will trigger store update immediately.
    };

    const steps = [
        {
            id: "identity",
            title: "Who approaches the Sanctuary?",
            desc: "Enter your name to begin your pilgrimage.",
            icon: User,
            isValid: name.length > 2
        },
        {
            id: "affiliation",
            title: "Where do you worship?",
            desc: "Tell us your church or community (Optional).",
            icon: Church,
            isValid: true // Optional
        },
        {
            id: "title",
            title: "Choose your path",
            desc: "Select a title that reflects your spiritual journey.",
            icon: Crown,
            isValid: true // Default selected
        },
        {
            id: "confirm",
            title: "Ready to enter?",
            desc: "Sign up to save your progress forever, or continue as a guest.",
            icon: Check,
            isValid: true
        }
    ];

    const currentStep = steps[step];

    return (
        <div className="fixed inset-0 z-[100] min-h-screen bg-nova-bg text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Progress Bar */}
            <div className="absolute top-10 left-0 w-full px-10 flex gap-2 justify-center">
                {steps.map((s, i) => (
                    <div
                        key={s.id}
                        className={cn(
                            "h-1 rounded-full transition-all duration-500",
                            i <= step ? "w-8 bg-nova-gold" : "w-4 bg-white/10"
                        )}
                    />
                ))}
            </div>

            <div className="max-w-md w-full space-y-8 z-10">

                {/* Header */}
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="text-center space-y-2"
                >
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10">
                        <currentStep.icon className="w-8 h-8 text-nova-gold" />
                    </div>
                    <h2 className="text-3xl font-serif font-bold">{currentStep.title}</h2>
                    <p className="text-white/50">{currentStep.desc}</p>
                </motion.div>

                {/* Content Area */}
                <motion.div
                    key={`content-${step}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="min-h-[200px]"
                >
                    {step === 0 && (
                        <div className="space-y-4">
                            <Input
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="h-14 text-lg bg-white/5 border-white/10 text-white placeholder:text-white/20 text-center"
                                autoFocus
                            />
                            <p className="text-xs text-center text-white/30">This will be displayed on your profile.</p>
                        </div>
                    )}

                    {step === 1 && (
                        <div className="space-y-4">
                            <Input
                                placeholder="Church Name (e.g. Grace Community)"
                                value={church}
                                onChange={(e) => setChurch(e.target.value)}
                                className="h-14 text-lg bg-white/5 border-white/10 text-white placeholder:text-white/20 text-center"
                                autoFocus
                            />
                            <p className="text-xs text-center text-white/30">We verify this to connect you with your community.</p>
                        </div>
                    )}

                    {step === 2 && (
                        <DevoteeSelect selectedTitle={title} onSelect={setTitle} />
                    )}

                    {step === 3 && (
                        <div className="space-y-4">
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center space-y-4">
                                <div className="space-y-1">
                                    <p className="uppercase text-xs font-bold tracking-widest text-white/40">Identity</p>
                                    <h3 className="text-xl font-bold text-white">{name}</h3>
                                </div>
                                <div className="w-px h-8 bg-white/10 mx-auto" />
                                <div className="space-y-1">
                                    <p className="uppercase text-xs font-bold tracking-widest text-white/40">Title</p>
                                    <p className="text-nova-gold font-serif text-lg">{title}</p>
                                </div>
                                {church && (
                                    <>
                                        <div className="w-px h-8 bg-white/10 mx-auto" />
                                        <div className="space-y-1">
                                            <p className="uppercase text-xs font-bold tracking-widest text-white/40">Church</p>
                                            <p className="text-white/70">{church}</p>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="pt-4 space-y-3">
                                <Button onClick={() => handleFinish(false)} size="lg" className="w-full h-14 bg-nova-gold text-black hover:bg-nova-gold/90 font-bold text-lg">
                                    Sign Up & Enter (Recommended)
                                </Button>
                                <button onClick={() => handleFinish(true)} className="w-full py-3 text-sm text-white/40 hover:text-white transition-colors">
                                    Skip & Enter as Guest
                                </button>
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* Navigation Buttons */}
                {step < 3 && (
                    <div className="flex gap-4 pt-4">
                        {step > 0 && (
                            <Button onClick={handleBack} variant="ghost" className="h-14 w-14 rounded-full p-0 text-white/50 hover:text-white hover:bg-white/10">
                                <ArrowLeft className="w-6 h-6" />
                            </Button>
                        )}
                        <Button
                            onClick={handleNext}
                            disabled={!currentStep.isValid}
                            className={cn(
                                "flex-1 h-14 rounded-full font-bold text-lg transition-all",
                                currentStep.isValid ? "bg-white text-black hover:bg-white/90" : "bg-white/10 text-white/20 cursor-not-allowed"
                            )}
                        >
                            Continue
                        </Button>
                    </div>
                )}

            </div>
        </div>
    );
};
