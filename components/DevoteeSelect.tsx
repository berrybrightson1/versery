import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Flame, Heart, Scroll, Shield, Sparkles, Star } from "lucide-react";

interface DevoteeSelectProps {
    selectedTitle: string;
    onSelect: (title: string) => void;
}

const titles = [
    { id: "Seeker", icon: Sparkles, color: "text-blue-400", bg: "bg-blue-500/10", desc: "Searching for truth" },
    { id: "Novice", icon: Scroll, color: "text-emerald-400", bg: "bg-emerald-500/10", desc: "Beginning the journey" },
    { id: "Disciple", icon: Star, color: "text-amber-400", bg: "bg-amber-500/10", desc: "Walking the path" },
    { id: "Apostle", icon: Flame, color: "text-orange-400", bg: "bg-orange-500/10", desc: "Spreading the word" },
    { id: "Guardian", icon: Shield, color: "text-indigo-400", bg: "bg-indigo-500/10", desc: "Protecting the faith" },
    { id: "Mystic", icon: Heart, color: "text-purple-400", bg: "bg-purple-500/10", desc: "Deep contemplation" },
];

export const DevoteeSelect = ({ selectedTitle, onSelect }: DevoteeSelectProps) => {
    return (
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {titles.map((title) => {
                const Icon = title.icon;
                const isSelected = selectedTitle === title.id;

                return (
                    <motion.button
                        key={title.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onSelect(title.id)}
                        className={cn(
                            "relative group flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300",
                            "hover:border-white/20 hover:bg-white/5",
                            isSelected
                                ? "bg-white/10 border-white/30 ring-1 ring-white/20"
                                : "bg-black/20 border-white/5"
                        )}
                    >
                        <div className={cn(
                            "p-3 rounded-full mb-3 transition-colors",
                            title.bg,
                            isSelected ? "bg-opacity-20" : "bg-opacity-10"
                        )}>
                            <Icon className={cn("w-6 h-6", title.color)} />
                        </div>

                        <h3 className={cn(
                            "font-serif font-bold text-lg mb-1",
                            isSelected ? "text-white" : "text-white/70 group-hover:text-white"
                        )}>
                            {title.id}
                        </h3>

                        <p className="text-xs text-white/40 font-medium">
                            {title.desc}
                        </p>

                        {isSelected && (
                            <motion.div
                                layoutId="selection-ring"
                                className="absolute inset-0 border-2 border-nova-gold/50 rounded-xl"
                                initial={false}
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                    </motion.button>
                );
            })}
        </div>
    );
};
