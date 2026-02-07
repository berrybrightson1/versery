"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TheScrollProps {
    label: string;
    value: string | number | null;
    correctValue?: string | number | null;
    options: (string | number)[];
    onSelect: (val: string | number) => void;
    disabled?: boolean;
}

export const TheScroll = ({ label, value, correctValue, options, onSelect, disabled }: TheScrollProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {options.map((option, i) => {
                const isSelected = value === option;
                const isCorrectSelection = isSelected && option === correctValue;
                const isWrongSelection = isSelected && option !== correctValue;
                const isRevealedCorrect = disabled && option === correctValue && !isSelected;

                return (
                    <motion.button
                        key={option}
                        disabled={disabled}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => !disabled && onSelect(option)}
                        className={cn(
                            "p-4 md:p-6 rounded-[24px] md:rounded-[28px] text-left transition-all duration-300 border-2 active:scale-95 group relative overflow-hidden",
                            isSelected
                                ? isCorrectSelection
                                    ? "bg-emerald-500 border-emerald-500 text-white shadow-xl shadow-emerald-500/20"
                                    : "bg-rose-500 border-rose-500 text-white shadow-xl shadow-rose-500/20"
                                : isRevealedCorrect
                                    ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                                    : "bg-white border-gray-100 text-nova-text hover:border-gray-200 hover:bg-gray-50/50",
                            disabled && !isSelected && !isRevealedCorrect && "opacity-50 grayscale",
                            disabled && "cursor-default active:scale-100"
                        )}
                    >
                        <div className="flex items-center justify-between relative z-10">
                            <span className={cn(
                                "text-lg md:text-xl font-bold tracking-tight",
                                isSelected ? "text-white" : isRevealedCorrect ? "text-emerald-700" : "text-nova-text"
                            )}>{option}</span>
                            {isSelected && (
                                <motion.div
                                    layoutId="check"
                                    className={cn(
                                        "w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center",
                                        isCorrectSelection ? "bg-white/20" : "bg-white/20"
                                    )}
                                >
                                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white" />
                                </motion.div>
                            )}
                        </div>

                        {/* Decorative background number */}
                        <span className={cn(
                            "absolute -right-2 -bottom-4 md:-right-4 md:-bottom-6 text-4xl md:text-5xl font-black opacity-5 pointer-events-none select-none",
                            value === option ? "text-white" : "text-black"
                        )}>
                            {i + 1}
                        </span>
                    </motion.button>
                )
            })}
        </div>
    );
};
