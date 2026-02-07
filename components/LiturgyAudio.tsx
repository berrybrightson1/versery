"use client";

import { useVerseryStore } from "@/lib/store";
import { useEffect, useRef } from "react";

export const LiturgyAudio = () => {
    const { isAudioEnabled, toggleAudio, audioVolume, selectedTrackId, audioTracks } = useVerseryStore();
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const currentTrack = audioTracks.find(t => t.id === selectedTrackId) || audioTracks[0];

    // Volume effect
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = audioVolume;
        }
    }, [audioVolume]);

    // Playback control effect
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        // Ignore if no track (shouldn't happen with fallback)
        if (!currentTrack) return;

        const playAudio = async () => {
            try {
                // If the src has changed, we need to load.
                // But React handles the src prop update on the audio element.
                // We just need to ensure we play if enabled.

                if (isAudioEnabled) {
                    // We only call load() if we really need to force a reload, 
                    // but changing the `src` prop usually handles this. 
                    // Explicit load is safer for dynamic src changes in some browsers.
                    // However, calling load() unnecessarily interrupts playback.
                    // The `key` prop on the audio element is a better way to force reset if needed,
                    // but let's stick to refs for smooth transitions.

                    if (audio.paused) {
                        await audio.play();
                    }
                } else {
                    if (!audio.paused) {
                        audio.pause();
                    }
                }
            } catch (error: any) {
                // AbortError is expected if we pause/load while playing. Ignore it.
                if (error.name === 'AbortError') return;

                console.error("Audio playback error:", error);

                // Handle Autoplay Policy
                if (error.name === 'NotAllowedError' && isAudioEnabled) {
                    // This is expected. We just wait for interaction.
                    const resumeAudio = () => {
                        if (audioRef.current) {
                            audioRef.current.play().catch(() => { });
                        }
                        ['click', 'keydown', 'touchstart'].forEach(event =>
                            document.removeEventListener(event, resumeAudio)
                        );
                    };

                    ['click', 'keydown', 'touchstart'].forEach(event =>
                        document.addEventListener(event, resumeAudio)
                    );
                } else if (error.name !== 'AbortError') {
                    // Only log real errors
                    console.error("Audio playback error:", error);
                }
            }
        };

        playAudio();

    }, [currentTrack?.src, isAudioEnabled]); // React to track change or enable toggle

    return (
        <audio
            ref={audioRef}
            preload="auto"
            loop
            src={currentTrack?.src}
        >
            Your browser does not support the audio element.
        </audio>
    );
};
