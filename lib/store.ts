import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface VerseryState {
    graceCount: number;
    dailyStreak: number;
    lastCompletedDate: string | null;
    completedModes: {
        locator: boolean;
        codex: boolean;
        livingWord: boolean;
        wisdom: boolean;
        parables: boolean;
    };
    hasSealedDay: boolean;
    pilgrimName: string;
    isAudioEnabled: boolean;
    audioVolume: number;
    selectedTrackId: string;
    audioTracks: { id: string, name: string, src: string }[];

    // Onboarding & Profile
    onboardingCompleted: boolean;
    userProfile: {
        name: string;
        church: string;
        title: string; // e.g. Seeker, Novice, Disciple
    };

    // Actions
    addGrace: (amount: number) => void;
    completeMode: (mode: 'locator' | 'codex' | 'livingWord' | 'wisdom' | 'parables') => void;
    checkStreak: () => void;
    resetProgress: () => void;
    updatePilgrimName: (name: string) => void;
    updateUserProfile: (profile: Partial<VerseryState['userProfile']>) => void;
    completeOnboarding: () => void;
    getPilgrimTitle: () => string;
    toggleAudio: () => void;
    setAudioVolume: (volume: number) => void;
    setTrack: (trackId: string) => void;
}

export const useVerseryStore = create<VerseryState>()(
    persist(
        (set, get) => ({
            graceCount: 0,
            dailyStreak: 0,
            lastCompletedDate: null,
            completedModes: {
                locator: false,
                codex: false,
                livingWord: false,
                wisdom: false,
                parables: false,
            },
            hasSealedDay: false,
            pilgrimName: "Faithful Pilgrim",
            isAudioEnabled: false,
            audioVolume: 0.3,
            selectedTrackId: 'sanctuary',
            audioTracks: [
                { id: 'sanctuary', name: 'Sanctuary', src: '/sounds/sanctuary.mp3' },
                { id: 'celestial', name: 'Celestial', src: '/sounds/celestial.mp3' },
                { id: 'wisdom', name: 'Wisdom', src: '/sounds/wisdom.mp3' },
                { id: 'spirit', name: 'Spirit', src: '/sounds/spirit.mp3' },
                { id: 'aura', name: 'Aura', src: '/sounds/aura.mp3' },
                { id: 'zen', name: 'Zen', src: '/sounds/zen.mp3' },
            ],

            onboardingCompleted: false,
            userProfile: {
                name: "Faithful Pilgrim",
                church: "",
                title: "Seeker"
            },

            addGrace: (amount) => set((state) => ({ graceCount: state.graceCount + amount })),

            updateUserProfile: (profile) => set((state) => ({
                userProfile: { ...state.userProfile, ...profile },
                // Sync legacy name if updated
                pilgrimName: profile.name || state.pilgrimName
            })),

            completeOnboarding: () => set({ onboardingCompleted: true }),

            completeMode: (mode) => {
                const today = new Date().toISOString().split('T')[0];
                const { lastCompletedDate, dailyStreak, completedModes } = get();

                set((state) => {
                    const newCompletedModes = { ...state.completedModes, [mode]: true };
                    const isSealed = Object.values(newCompletedModes).some((completed) => completed);

                    let newStreak = state.dailyStreak;
                    if (state.lastCompletedDate !== today && isSealed) {
                        const yesterday = new Date();
                        yesterday.setDate(yesterday.getDate() - 1);
                        const yesterdayStr = yesterday.toISOString().split('T')[0];

                        if (state.lastCompletedDate === yesterdayStr) {
                            newStreak += 1;
                        } else {
                            newStreak = 1;
                        }
                    }

                    return {
                        completedModes: newCompletedModes,
                        hasSealedDay: isSealed,
                        lastCompletedDate: isSealed ? today : state.lastCompletedDate,
                        dailyStreak: state.lastCompletedDate !== today && isSealed ? newStreak : state.dailyStreak
                    };
                });
            },

            checkStreak: () => {
                const today = new Date().toISOString().split('T')[0];
                const state = get();

                if (state.lastCompletedDate !== today) {
                    set({
                        completedModes: {
                            locator: false,
                            codex: false,
                            livingWord: false,
                            wisdom: false,
                            parables: false
                        },
                        hasSealedDay: false
                    });
                }
            },

            resetProgress: () => set({
                graceCount: 0,
                dailyStreak: 0,
                lastCompletedDate: null,
                completedModes: {
                    locator: false,
                    codex: false,
                    livingWord: false,
                    wisdom: false,
                    parables: false
                },
                hasSealedDay: false,
                pilgrimName: "Faithful Pilgrim",
            }),

            updatePilgrimName: (name) => set({ pilgrimName: name }),

            getPilgrimTitle: () => {
                const grace = get().graceCount;
                if (grace >= 12000) return "Apostle";
                if (grace >= 7000) return "Master";
                if (grace >= 3500) return "Steward";
                if (grace >= 1500) return "Sower";
                if (grace >= 500) return "Disciple";
                return "Seeker";
            },

            toggleAudio: () => set((state) => ({ isAudioEnabled: !state.isAudioEnabled })),
            setAudioVolume: (volume) => set({ audioVolume: volume }),
            setTrack: (trackId) => set({ selectedTrackId: trackId }),
        }),
        {
            name: 'versery-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                graceCount: state.graceCount,
                dailyStreak: state.dailyStreak,
                lastCompletedDate: state.lastCompletedDate,
                completedModes: state.completedModes,
                hasSealedDay: state.hasSealedDay,
                pilgrimName: state.pilgrimName,
                isAudioEnabled: state.isAudioEnabled,
                audioVolume: state.audioVolume,
                selectedTrackId: state.selectedTrackId,
                userProfile: state.userProfile,
                onboardingCompleted: state.onboardingCompleted,
            }),
            merge: (persistedState, currentState) => ({
                ...currentState,
                ...(persistedState as object),
                audioTracks: currentState.audioTracks, // Always use the tracks associated with the latest deployment
            }),
        }
    )
);
