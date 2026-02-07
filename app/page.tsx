"use client";

import { LandingPage } from "@/components/LandingPage";
import { OnboardingFlow } from "@/components/OnboardingFlow";
import { useVerseryStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Flame,
  Heart,
  Lightbulb,
  MapPin,
  ScrollText,
  Sparkles,
  Trophy
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// Helper component to manage Landing -> Onboarding transition locally
const OnboardingScreen = () => {
  const [hasStarted, setHasStarted] = useState(false);

  if (!hasStarted) {
    return <LandingPage onStart={() => setHasStarted(true)} />;
  }

  return <OnboardingFlow onComplete={() => { }} />; // The flow updates the store directly
};

export default function Dashboard() {
  const { graceCount, dailyStreak, checkStreak, onboardingCompleted } = useVerseryStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    checkStreak();
  }, [checkStreak]);

  const stats = [
    { label: "Faith Streak", value: dailyStreak, unit: "days", icon: Flame, color: "text-orange-500", bg: "bg-orange-50" },
    { label: "Grace Earned", value: graceCount, unit: "spirit", icon: Heart, color: "text-nova-red", bg: "bg-red-50" },
    { label: "Mastery Level", value: Math.floor(graceCount / 100) + 1, unit: "rank", icon: Trophy, color: "text-yellow-600", bg: "bg-yellow-50" },
  ];

  const games = [
    {
      title: "The Locator",
      description: "Navigate the maps of scripture to find the exact coordinates of the Word.",
      href: "/locator",
      icon: MapPin,
      gradient: "from-rose-500 to-red-600",
      accent: "text-rose-100",
      badge: "Scripture Mastery"
    },
    {
      title: "Wisdom's Echo",
      description: "Listen to the ancient sages and complete the sacred logic of proverbs.",
      href: "/wisdom",
      icon: Sparkles,
      gradient: "from-amber-400 to-orange-600",
      accent: "text-amber-100",
      badge: "Proverb Mastery"
    },
    {
      title: "Character Codex",
      description: "Discern the voices of prophets, kings, and believers across the ages.",
      href: "/codex",
      icon: ScrollText,
      gradient: "from-blue-600 to-indigo-700",
      accent: "text-blue-100",
      badge: "Identify Speaker"
    },
    {
      title: "Parable Mastery",
      description: "Unlock the secrets hidden in the Master's stories through revelation.",
      href: "/parables",
      icon: Lightbulb,
      gradient: "from-indigo-500 to-purple-600",
      accent: "text-indigo-100",
      badge: "Story Revelation"
    },
    {
      title: "Living Word",
      description: "Mend the broken verses by recalling the missing breath of the Spirit.",
      href: "/living-word",
      icon: BookOpen,
      gradient: "from-emerald-500 to-teal-600",
      accent: "text-emerald-100",
      badge: "Memory Verse"
    }
  ];

  if (!mounted) return null;

  // New Onboarding Logic
  // New Onboarding Logic
  if (!onboardingCompleted) {
    return <OnboardingScreen />;
  }

  return (
    <div className="py-4 md:py-6 space-y-8 md:space-y-12 px-2 md:px-0 pt-20 md:pt-4">
      {/* Hero / Header Section */}
      <header className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
        >
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nova-red/10 text-nova-red text-[10px] font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              Welcome to the Sanctuary
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-nova-text leading-tight md:leading-[1.1]">
              Grace be with you,<br />
              <span className="text-gray-400">Faithful Disciple.</span>
            </h2>
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:flex items-center gap-2 md:gap-3 p-2 bg-white rounded-[24px] md:rounded-[28px] shadow-xl shadow-black/5 border border-gray-100">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-3 px-4 md:px-5 py-2.5 md:py-3 rounded-[18px] md:rounded-2xl bg-nova-offwhite transition-all hover:bg-gray-50">
                <div className={cn("p-2 rounded-xl shrink-0", stat.bg)}>
                  <stat.icon className={cn("w-4 h-4", stat.color)} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider truncate">{stat.label}</p>
                  <p className="text-sm font-bold text-nova-text truncate">{stat.value} {stat.unit}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </header>

      {/* Main Grid */}
      <section>
        <div className="flex items-center justify-between mb-8 px-2">
          <h3 className="text-xl font-bold text-nova-text tracking-tight">Daily Liturgy</h3>
          <button className="text-sm font-bold text-nova-red hover:underline flex items-center gap-1 group">
            Global Sanctuary <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {games.map((game, i) => (
            <motion.div
              key={game.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={game.href} className="group block h-full">
                <article className={cn(
                  "relative h-full p-8 rounded-[40px] overflow-hidden transition-all duration-500",
                  "bg-gradient-to-br shadow-2xl shadow-transparent hover:shadow-black/10 hover:-translate-y-2",
                  game.gradient
                )}>
                  {/* Decorative Elements */}
                  <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                  <div className="absolute right-8 top-8 opacity-20 group-hover:opacity-40 transition-opacity">
                    <game.icon className="w-24 h-24 text-white" strokeWidth={1} />
                  </div>

                  {/* Content */}
                  <div className="relative flex flex-col h-full z-10">
                    <span className={cn("inline-block px-3 py-1 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-widest mb-6 w-fit", game.accent)}>
                      {game.badge}
                    </span>

                    <h4 className="text-3xl font-bold text-white mb-4 tracking-tight">{game.title}</h4>
                    <p className={cn("text-base leading-relaxed mb-10 line-clamp-2", game.accent)}>
                      {game.description}
                    </p>

                    <footer className="mt-auto flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map(j => (
                          <div key={j} className="w-8 h-8 rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-[10px] text-white font-bold">
                            {j}
                          </div>
                        ))}
                        <div className="w-8 h-8 rounded-full border-2 border-white/20 bg-white/30 backdrop-blur-md flex items-center justify-center text-[10px] text-white">
                          +4
                        </div>
                      </div>

                      <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all shadow-xl shadow-transparent group-hover:shadow-black/5">
                        <ArrowRight className="w-5 h-5 text-white group-hover:text-nova-red transition-colors" />
                      </div>
                    </footer>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Progress Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="p-6 md:p-10 rounded-[32px] md:rounded-[48px] bg-white border border-gray-100 shadow-xl shadow-black/5 flex flex-col md:flex-row items-center gap-8 md:gap-12 overflow-hidden relative"
      >
        <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-nova-offwhite to-transparent pointer-events-none hidden md:block" />

        <div className="flex-1 space-y-4 md:space-y-6 relative z-10 w-full">
          <h3 className="text-2xl md:text-3xl font-bold text-nova-text tracking-tight">Your Pilgrimage Progress</h3>
          <p className="text-nova-subtext text-base md:text-lg leading-relaxed max-w-xl">
            You have collected <span className="text-nova-red font-bold">{graceCount} Spirit points</span>. Each point strengthens your discernment of the holy word. Complete 3 masteries today to seal your day in grace.
          </p>

          <div className="space-y-3">
            <div className="w-full h-3 md:h-4 bg-gray-100 rounded-full overflow-hidden p-1 border border-gray-50">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (graceCount % 100))}%` }}
                className="h-full bg-gradient-to-r from-nova-red to-orange-500 rounded-full shadow-lg shadow-red-500/20"
              />
            </div>
            <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <span>Lvl {Math.floor(graceCount / 100) + 1}</span>
              <span>{(graceCount % 100)} / 100 XP</span>
              <span>Lvl {Math.floor(graceCount / 100) + 2}</span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-auto grid grid-cols-2 gap-3 md:gap-4 relative z-10">
          {['Prayer', 'Discipline', 'Focus', 'Grace'].map((tag) => (
            <div key={tag} className="px-4 md:px-6 py-3 md:py-4 rounded-[20px] md:rounded-3xl bg-nova-offwhite border border-gray-100 flex items-center justify-center gap-2 md:gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-nova-red shadow-sm animate-pulse" />
              <span className="font-bold text-xs md:text-sm tracking-tight text-nova-text">{tag}</span>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
