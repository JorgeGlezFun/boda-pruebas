import { useEffect, useRef, useState } from "react";
import weddingSong from "../../../assets/audio/boda.mp3";

export default function SoundButton() {
    const audioRef = useRef(null);
    const fadeRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const maxVolume = 0.5;
    const fadeVolume = (from, to, duration, callback) => {

        if (fadeRef.current) {
            cancelAnimationFrame(fadeRef.current);
        }

        const startTime = performance.now();

        const animate = (currentTime) => {
            const progress = Math.min(
                (currentTime - startTime) / duration,
                1
            );
            const volume =
                from + (to - from) * progress;
            if (audioRef.current) {
                audioRef.current.volume = volume;
            }
            if (progress < 1) {
                fadeRef.current =
                    requestAnimationFrame(animate);
            } else {
                fadeRef.current = null;
                if (callback) {
                    callback();
                }
            }
        };
        fadeRef.current =
            requestAnimationFrame(animate);
    };

    const playMusic = async () => {
        const audio = audioRef.current;
        if (!audio) return;
        try {
            // Empezamos sin volumen
            audio.volume = 0;
            // El loop nativo reinicia la canción
            audio.loop = true;
            await audio.play();
            // Fade-in
            fadeVolume(
                0,
                maxVolume,
                1500
            );
            setIsPlaying(true);
        } catch (error) {
            console.error(
                "Error al reproducir el audio:",
                error
            );
        }
    };

    const pauseMusic = () => {
        const audio = audioRef.current;
        if (!audio) return;
        const currentVolume = audio.volume;
        // Fade-out
        fadeVolume(
            currentVolume,
            0,
            800,
            () => {
                audio.pause();
                setIsPlaying(false);
            }
        );
    };

    const toggleMusic = () => {
        if (isPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    };

    useEffect(() => {
        return () => {
            if (fadeRef.current) {
                cancelAnimationFrame(
                    fadeRef.current
                );
            }
        };
    }, []);

    return (
        <>
            <audio
                ref={audioRef}
                src={weddingSong}
                preload="auto"
                loop
            />
            <button
                type="button"
                onPointerDown={(e) => {
                    e.stopPropagation();
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    toggleMusic();
                }}
                className="
                    fixed
                    right-4
                    top-4
                    z-[100]
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/20
                    bg-black/40
                    text-white
                    shadow-lg
                    backdrop-blur-md
                    transition
                    hover:bg-black/60
                    active:scale-90
                    md:right-6
                    md:top-6
                "
                aria-label={
                    isPlaying
                        ? "Pausar música"
                        : "Reproducir música"
                }
            >
                {isPlaying ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M3 9v6h4l5 4V5L7 9H3Z" />
                        <path
                            d="M16 8.5a4.5 4.5 0 0 1 0 7"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                        <path
                            d="M19 5.5a8.5 8.5 0 0 1 0 13"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M3 9v6h4l5 4V5L7 9H3Z" />
                        <path
                            d="m16 9 5 5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                        <path
                            d="m21 9-5 5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                )}
            </button>
        </>
    );
}