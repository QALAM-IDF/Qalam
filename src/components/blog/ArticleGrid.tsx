"use client";

import { motion } from "framer-motion";
import type { SanityPostListItem } from "@/types/sanity";
import ArticleCard from "./ArticleCard";

type ArticleGridProps = {
  posts: SanityPostListItem[];
};

export default function ArticleGrid({ posts }: ArticleGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, i) => (
        <motion.div
          key={post._id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ delay: Math.min(i * 0.05, 0.3) }}
        >
          <ArticleCard post={post} />
        </motion.div>
      ))}
    </div>
  );
}
