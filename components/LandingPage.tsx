import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BookOpen, ChevronRight, Crown, Sparkles } from "lucide-react";

interface LandingPageProps {
    onStart: () => void;
}

export const LandingPage = ({ onStart }: LandingPageProps) => {
    return (
        <div className="fixed inset-0 z-[100] min-h-screen bg-[#0a0f1c] text-white relative overflow-hidden flex flex-col justify-center items-center px-6 py-12">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-nova-gold/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-nova-red/10 blur-[120px] rounded-full animate-pulse delay-1000" />
            </div>

            <div className="relative z-10 max-w-lg w-full text-center space-y-8">
                {/* Logo / Icon */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mx-auto w-24 h-24 bg-gradient-to-br from-nova-gold to-orange-500 rounded-3xl rotate-3 flex items-center justify-center shadow-2xl shadow-orange-500/20"
                >
                    <BookOpen className="w-12 h-12 text-white" />
                </motion.div>

                {/* Text Content */}
                <div className="space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-white leading-tight"
                    >
                        Sanctify Your <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-nova-gold to-amber-300">Mind & Spirit</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-lg text-white/60 leading-relaxed max-w-md mx-auto"
                    >
                        Enter the Sanctuary. Master the scriptures, discern the wisdom of ages, and walk the path of the faithful.
                    </motion.p>
                </div>

                {/* Features Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left py-4"
                >
                    {[
                        { title: "Scripture", desc: "Master verses", icon: BookOpen },
                        { title: "Wisdom", desc: "Learn proverbs", icon: Sparkles },
                        { title: "Legacy", desc: "Know the saints", icon: Crown },
                    ].map((f, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                            <f.icon className="w-5 h-5 text-nova-gold mb-2" />
                            <h3 className="font-bold text-sm text-white">{f.title}</h3>
                            <p className="text-xs text-white/50">{f.desc}</p>
                        </div>
                    ))}
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    <Button
                        onClick={onStart}
                        size="lg"
                        className="w-full sm:w-auto px-12 py-7 text-lg bg-white text-black hover:bg-gray-100 rounded-full font-bold shadow-xl shadow-white/10 group transition-all"
                    >
                        Enter Sanctuary
                        <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <p className="mt-4 text-xs text-white/30 uppercase tracking-widest">
                        Begin your journey today
                    </p>
                </motion.div>
            </div>
        </div>
    );
};
