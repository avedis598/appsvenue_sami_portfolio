import { motion } from "motion/react";
import { useState, useRef } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

export default function About() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        void audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const restartAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      void audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section id="about" className="px-6 sm:px-12 md:px-20 py-16 md:py-20 border-t border-off-white/10">
      <motion.div
        className="max-w-2xl mx-auto space-y-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-xl uppercase tracking-[0.2em]">About Me</h2>

        <div className="text-lg sm:text-xl text-off-white/80 font-sans leading-relaxed max-w-[60ch] text-pretty">
          <motion.p whileHover={{ x: 5 }}>
            I'm a graphic designer, event planner, and founder of Appsvenue. I love taking
            creative ideas and turning them into reality, whether that's designing something
            visually stunning or pulling off a flawlessly executed event. Based in Kuwait,
            I've been doing this since 2004. It's all about blending artistic vision with
            solid planning to make things happen.
          </motion.p>
        </div>

        <div className="flex flex-row items-center gap-4">
          <button
            type="button"
            className="flex items-center gap-4 hover:scale-105 transition-transform cursor-pointer"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause audio introduction" : "Play audio introduction"}
          >
            {isPlaying ? (
              <Pause fill="currentColor" className="w-8 h-8 text-accent" aria-hidden="true" />
            ) : (
              <Play fill="currentColor" className="w-8 h-8 text-accent" aria-hidden="true" />
            )}

            {isPlaying ? (
              <img
                src="/sound_waves.gif"
                alt=""
                width={40}
                height={40}
                loading="lazy"
                className="w-10 h-auto object-contain"
              />
            ) : (
              <picture>
                <source type="image/webp" srcSet="/sound_waves.webp" />
                <img
                  src="/sound_waves.png"
                  alt=""
                  width={40}
                  height={40}
                  loading="lazy"
                  className="w-10 h-auto object-contain"
                />
              </picture>
            )}
          </button>

          {isPlaying && (
            <button
              type="button"
              onClick={restartAudio}
              className="hover:scale-110 transition-transform text-black cursor-pointer"
              aria-label="Replay audio introduction from start"
            >
              <RotateCcw className="w-6 h-6" aria-hidden="true" />
            </button>
          )}
          <audio
            ref={audioRef}
            src="/about_me.mp3"
            preload="none"
            onEnded={() => setIsPlaying(false)}
          />
        </div>
      </motion.div>
    </section>
  );
}
