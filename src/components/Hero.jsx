import { motion } from "framer-motion";
import { profile } from "../data/profile";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } },
};

export default function Hero() {
  return (
    <section id="top" className="pt-40 pb-24 px-6">
      <motion.div
        className="mx-auto max-w-5xl"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p variants={item} className="text-indigo-400 font-medium mb-4">
          {profile.role}
        </motion.p>
        <motion.h1
          variants={item}
          className="text-4xl sm:text-6xl font-bold tracking-tight text-neutral-50 max-w-3xl"
        >
          {profile.name}
        </motion.h1>
        <motion.p variants={item} className="mt-6 text-lg text-neutral-400 max-w-xl">
          {profile.tagline}
        </motion.p>
        <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            href="#projects"
            className="inline-flex items-center rounded-full bg-indigo-500 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-400 transition-colors"
          >
            View my work
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            href="#contact"
            className="inline-flex items-center rounded-full border border-neutral-700 px-6 py-3 text-sm font-medium text-neutral-200 hover:border-neutral-500 transition-colors"
          >
            Get in touch
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
