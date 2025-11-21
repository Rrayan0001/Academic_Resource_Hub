import { useState, useEffect, useCallback, useMemo } from "react";
import { motion as Motion } from "framer-motion";
import { cn } from "../lib/utils";

const LetterState = {
    char: '',
    isMatrix: false,
    isSpace: false,
};

export const MatrixText = ({
    text = "HelloWorld!",
    className,
    initialDelay = 200,
    letterAnimationDuration = 500,
    letterInterval = 100,
    repeatDelay = 0, // Delay before repeating animation (in ms)
}) => {
    const [letters, setLetters] = useState(() =>
        text.split("").map((char) => ({
            char,
            isMatrix: false,
            isSpace: char === " ",
        }))
    );
    const [isAnimating, setIsAnimating] = useState(false);

    const getRandomChar = useCallback(
        () => (Math.random() > 0.5 ? "1" : "0"),
        []
    );

    const animateLetter = useCallback(
        (index) => {
            if (index >= text.length) return;

            requestAnimationFrame(() => {
                setLetters((prev) => {
                    const newLetters = [...prev];
                    if (!newLetters[index].isSpace) {
                        newLetters[index] = {
                            ...newLetters[index],
                            char: getRandomChar(),
                            isMatrix: true,
                        };
                    }
                    return newLetters;
                });

                setTimeout(() => {
                    setLetters((prev) => {
                        const newLetters = [...prev];
                        newLetters[index] = {
                            ...newLetters[index],
                            char: text[index],
                            isMatrix: false,
                        };
                        return newLetters;
                    });
                }, letterAnimationDuration);
            });
        },
        [getRandomChar, text, letterAnimationDuration]
    );

    const startAnimation = useCallback(() => {
        setIsAnimating(true);
        let currentIndex = 0;

        const animate = () => {
            if (currentIndex >= text.length) {
                setIsAnimating(false);
                // If repeatDelay is set, restart animation after delay
                if (repeatDelay > 0) {
                    setTimeout(() => {
                        // Reset letters to initial state
                        setLetters(text.split("").map((char) => ({
                            char,
                            isMatrix: false,
                            isSpace: char === " ",
                        })));
                        // Restart animation
                        startAnimation();
                    }, repeatDelay);
                }
                return;
            }

            animateLetter(currentIndex);
            currentIndex++;
            setTimeout(animate, letterInterval);
        };

        animate();
    }, [animateLetter, text, letterInterval, repeatDelay]);

    useEffect(() => {
        const timer = setTimeout(startAnimation, initialDelay);
        return () => clearTimeout(timer);
    }, [startAnimation, initialDelay]);

    const motionVariants = useMemo(
        () => ({
            matrix: {
                color: "#3b82f6",
                textShadow: "0 2px 4px rgba(59, 130, 246, 0.5)",
            },
        }),
        []
    );

    return (
        <div
            className={cn(
                "flex items-center justify-center",
                className
            )}
            aria-label="Matrix text animation"
        >
            <div className="flex items-center justify-center">
                <div className="flex flex-wrap items-center justify-center">
                    {letters.map((letter, index) => (
                        <Motion.div
                            key={`${index}-${letter.char}`}
                            className="font-mono w-[1ch] text-center overflow-hidden"
                            initial="initial"
                            animate={letter.isMatrix ? "matrix" : "normal"}
                            variants={motionVariants}
                            transition={{
                                duration: 0.1,
                                ease: "easeInOut",
                            }}
                            style={{
                                display: "inline-block",
                                fontVariantNumeric: "tabular-nums",
                            }}
                        >
                            {letter.isSpace ? "\u00A0" : letter.char}
                        </Motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
