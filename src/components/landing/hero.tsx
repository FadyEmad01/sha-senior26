"use client";

import { motion, AnimatePresence } from "motion/react";
import Floating, { FloatingElement } from "@/components/fancy/image/parallax-floating";
import { useEffect, useState, useRef } from "react";
import { easings } from "@/lib/animation-config";
import OnHover01 from "@/components/shared/on-hover-01";

const TOTAL_STUDENTS = 600;
const IMAGE_IDS = Array.from({ length: TOTAL_STUDENTS }, (_, i) => i + 1);

// ── Animation Variants ──
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
    visible: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: { duration: 0.8, ease: easings.gentle },
    },
};

const textVariants = {
    hidden: { opacity: 0, filter: "blur(12px)" },
    visible: {
        opacity: 1,
        filter: "blur(0px)",
        transition: { duration: 1, delay: 1.2, ease: easings.reveal },
    },
};

export default function Hero() {
    const [slots, setSlots] = useState<number[]>([]);
    const deckRef = useRef<number[]>([]);

    useEffect(() => {
        const shuffled = [...IMAGE_IDS].sort(() => Math.random() - 0.5);
        deckRef.current = shuffled;
        setSlots(deckRef.current.splice(0, 8));
    }, []);

    const swapImage = (indexToReplace: number) => {
        const nextStudent = deckRef.current.shift();
        if (!nextStudent) return;

        const currentStudent = slots[indexToReplace];
        deckRef.current.push(currentStudent);

        const newSlots = [...slots];
        newSlots[indexToReplace] = nextStudent;
        setSlots(newSlots);
    };

    const getRotation = (i: number) => [-3, 2, -2, 4, -4, 3, -1, 5][i % 8];

    if (slots.length === 0) return null;

    return (
        <motion.div
            className="flex w-full h-dvh justify-center items-center overflow-hidden relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}  // ← added
        >
            {/* ── Center Text ── */}
            <motion.div
                variants={textVariants}  // ← added
                className="z-50 text-center pointer-events-none select-none mix-blend-difference"
            >
                <h1 className="text-white text-6xl md:text-8xl font-serif italic">
                    memories.
                </h1>
                <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase mt-4">
                    Class of 2026
                </p>
            </motion.div>

            {/* ── Floating ── */}
            <Floating sensitivity={-0.1}>
                {[
                    { depth: 1,   pos: "top-[10%] left-[10%]",    size: "w-24 md:w-32" },
                    { depth: 2,   pos: "top-[5%] left-[40%]",     size: "w-32 md:w-40" },
                    { depth: 1.5, pos: "top-[15%] right-[15%]",   size: "w-40 md:w-52" },
                    { depth: 1,   pos: "bottom-[20%] left-[5%]",  size: "w-28 md:w-36" },
                    { depth: 2.5, pos: "bottom-[10%] left-[30%]", size: "w-36 md:w-48" },
                    { depth: 1,   pos: "bottom-[5%] right-[35%]", size: "w-24 md:w-32" },
                    { depth: 2,   pos: "top-[45%] right-[5%]",    size: "w-32 md:w-44" },
                ].map((config, i) => (
                    <FloatingElement key={i} depth={config.depth} className={config.pos}>
                        <motion.div
                            variants={itemVariants}  // ← added; inherits hidden/visible from parent
                            style={{ rotate: `${getRotation(i)}deg`, width: "fit-content" }}
                            whileHover={{ scale: 1.1, rotate: 0, zIndex: 100 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            {i === 6 ? (
                                // No polaroid frame for OnHover01
                                <div className={config.size} onClick={() => swapImage(i)}>
                                    <OnHover01
                                        image={`https://picsum.photos/seed/${slots[i]}/400/500`}
                                    />
                                </div>
                            ) : (
                                // With polaroid frame
                                <div className="p-[6%] pb-[18%] bg-[#D1C5AF] shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-black/5 cursor-pointer">
                                    <AnimatePresence mode="popLayout">
                                        <motion.img
                                            key={slots[i]}
                                            src={`https://picsum.photos/seed/${slots[i]}/400/500`}
                                            onClick={() => swapImage(i)}
                                            initial={{ opacity: 0, filter: "brightness(2) blur(12px)" }}
                                            animate={{ opacity: 1, filter: "brightness(1) blur(0px)" }}
                                            exit={{ opacity: 0, filter: "brightness(0) blur(12px)" }}
                                            transition={{ duration: 0.8, ease: easings.reveal }}
                                            className={`${config.size} aspect-[4/5] object-cover bg-gray-200`}
                                        />
                                    </AnimatePresence>
                                </div>
                            )}
                        </motion.div>
                    </FloatingElement>
                ))}
            </Floating>
        </motion.div>
    );
}