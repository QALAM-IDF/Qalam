"use client";

import { motion } from "framer-motion";

type TestimonialCardProps = {
  quote: string;
  author: string;
  role: string;
  theme?: "hommes" | "femmes" | "enfants";
};

const tone = {
  hommes: "bg-[#2b1609]/70 border-[#c17f24aa] text-[#f5e6c8]",
  femmes: "bg-[#f9f0e8]/75 border-[#c4927a88] text-[#4a2e28]",
  enfants: "bg-[#142f66]/80 border-[#4ecdc488] text-[#fff8dc]",
};

export default function TestimonialCard({
  quote,
  author,
  role,
  theme = "hommes",
}: TestimonialCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.4 }}
      className={`card-hover rounded-2xl border p-5 ${tone[theme]}`}
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="h-9 w-9 rounded-full border border-current/35 bg-black/15" />
        <div>
          <p className="font-display text-lg leading-none">{author}</p>
          <p className="text-xs opacity-80">{role}</p>
        </div>
      </div>
      <p className="text-sm leading-relaxed">“{quote}”</p>
    </motion.article>
  );
}
