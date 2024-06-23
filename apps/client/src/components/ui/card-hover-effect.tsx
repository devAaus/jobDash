import { cn } from "@/lib/utils";
import { Job } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { differenceInDays } from 'date-fns';
import JobCard from "../JobCard";

export const HoverEffect = ({
    items,
    className,
}: {
    items: Job[]
    className?: string;
}) => {
    let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-6",
                className
            )}
        >
            {items.map((item, idx) => {
                return (
                    <Link
                        href={`/jobs/${item.id}`}
                        key={`/jobs/${item.id}`}
                        className="relative group  block p-2 h-full w-full"
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <AnimatePresence>
                            {hoveredIndex === idx && (
                                <motion.span
                                    className="absolute inset-0 h-full w-full bg-black/80 block -z-10 rounded-3xl"
                                    layoutId="hoverBackground"
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        opacity: 1,
                                        transition: { duration: 0.15 },
                                    }}
                                    exit={{
                                        opacity: 0,
                                        transition: { duration: 0.15, delay: 0.2 },
                                    }}
                                />
                            )}
                        </AnimatePresence>
                        <JobCard item={item} />
                    </Link>
                );
            })}
        </div>
    );
};
