import { motion } from "motion/react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-dvh grid grid-cols-1 md:grid-cols-2 relative bg-black text-white overflow-hidden"
    >
      {/* Slanted, prominent, horizontal reflective bar animation for entire section */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-white/10 origin-center"
          initial={{ rotate: 20, x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut",
          }}
          style={{
            background: "linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col justify-center px-6 pt-16 pb-8 sm:px-12 md:py-20 md:pl-16 lg:pl-32 md:pr-8">
        <h1 className="font-serif font-bold leading-[0.95] -tracking-[0.02em]">
          <motion.span
            className="block text-[clamp(1.5rem,1.1rem+1.5vw,3rem)] mb-6 md:mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            Hi, I am
          </motion.span>
          <motion.span
            className="block text-[clamp(2.4rem,1.5rem+4vw,6rem)] mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Sami Majdi
          </motion.span>
          <motion.span
            className="block text-[clamp(2.4rem,1.5rem+4vw,6rem)] mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            Aboulabbada
          </motion.span>
        </h1>

        <motion.p
          className="text-xs sm:text-sm font-sans uppercase tracking-[0.28em] sm:tracking-[0.4em] text-accent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            delay: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          Graphic Designer · Event Architect
        </motion.p>
      </div>

      <motion.div
        className="relative z-10 h-full w-full overflow-hidden flex items-end justify-center md:justify-end"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <picture className="w-full md:w-[120%] h-full flex items-end justify-center md:justify-end">
          <source
            type="image/webp"
            srcSet="/sami_hero_section-800w.webp 800w, /sami_hero_section.webp 1414w"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <img
            src="/sami_hero_section.png"
            alt="Portrait of Sami Majdi Aboulabbada"
            width={1414}
            height={2000}
            fetchPriority="high"
            className="w-full max-h-[65dvh] md:max-h-none md:w-[120%] md:h-[120%] object-contain object-bottom grayscale"
            referrerPolicy="no-referrer"
          />
        </picture>
      </motion.div>
    </section>
  );
}
